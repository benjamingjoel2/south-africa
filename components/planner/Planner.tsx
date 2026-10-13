"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import type { z } from "zod";
import { plannerRoutes, budgetTiers } from "@/data/planner";
import { stepSchemas } from "@/lib/planner-schema";
import { whatsappHref } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { usePlannerStore, type PlannerState } from "./usePlannerStore";
import { StepBudget, StepContact, StepWhen, StepWhere, StepWho } from "./steps";

const steps = [
  { key: "when", label: "When", title: "When are you travelling?", intro: "Approximate is perfectly fine. Seasons shape the best route." },
  { key: "where", label: "Where", title: "Where would you like to go?", intro: "Pick the closest fit. We'll tailor every detail later." },
  { key: "budget", label: "Budget", title: "What's your budget?", intro: "This helps us suggest the right stays from the start." },
  { key: "who", label: "Who", title: "Who's coming along?", intro: "Tell us about your group and any extras you'd like." },
  { key: "contact", label: "Contact", title: "How can we reach you?", intro: "Your specialist will reply within one working day." },
] as const;

type Errors = Record<string, string>;

function toErrors(error: z.ZodError): Errors {
  const out: Errors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function sectionForValidation(state: PlannerState, i: number) {
  const key = steps[i].key;
  if (key === "who") {
    const who = state.who;
    return { ...who, childAges: who.childAges.filter((a): a is number => a !== null) };
  }
  return state[key];
}

export function Planner({ variant = "page", onClose }: { variant?: "page" | "modal"; onClose?: () => void }) {
  const { state, update, setStep, reset, hydrated } = usePlannerStore();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const step = Math.min(state.step, steps.length - 1);
  const current = steps[step];

  function validate(i: number) {
    const result = stepSchemas[i].safeParse(sectionForValidation(state, i));
    if (!result.success) {
      setErrors(toErrors(result.error));
      // Move focus to the first invalid field for keyboard/screen-reader users.
      requestAnimationFrame(() => {
        const el = topRef.current?.querySelector<HTMLElement>("[aria-invalid='true'], [role='alert']");
        el?.focus?.();
        el?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
      });
      return false;
    }
    setErrors({});
    return true;
  }

  function goTo(i: number) {
    setDirection(i > step ? 1 : -1);
    setStep(i);
    setErrors({});
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" }));
  }

  function next() {
    if (validate(step)) goTo(step + 1);
  }

  async function submit() {
    // Re-validate every step in case stored data was edited.
    for (let i = 0; i < steps.length; i++) {
      if (!validate(i)) {
        if (i !== step) goTo(i);
        return;
      }
    }
    setStatus("submitting");
    try {
      const payload = {
        when: state.when,
        where: state.where,
        budget: state.budget,
        who: sectionForValidation(state, 3),
        contact: state.contact,
      };
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted({ name: state.contact.name.split(" ")[0], email: state.contact.email });
      setStatus("done");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done" && submitted) {
    return <Confirmation name={submitted.name} email={submitted.email} variant={variant} onClose={onClose} />;
  }

  const routeTitle = plannerRoutes.find((r) => r.id === state.where.route)?.title;
  const tierTitle = budgetTiers.find((t) => t.id === state.budget.tier)?.title;

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Progress indicator */}
      <nav aria-label="Planner progress">
        <ol className="grid grid-cols-5 gap-2">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => (i < step ? goTo(i) : undefined)}
                  disabled={i > step}
                  aria-current={active ? "step" : undefined}
                  className="group w-full text-left disabled:cursor-default"
                >
                  <span className="block h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.span
                      className={cn("block h-full rounded-full", active ? "bg-protea" : "bg-ochre")}
                      initial={false}
                      animate={{ width: done || active ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                  <span className={cn("mt-2.5 flex items-center gap-1.5 text-xs font-medium sm:text-sm", active ? "text-white" : done ? "text-white/70 group-hover:text-white" : "text-white/55")}>
                    {done ? <CheckIcon className="size-3.5 text-ochre-400" /> : <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>}
                    <span className="hidden sm:inline">{s.label}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {steps.length}: {current.label}
      </p>

      <div className="mt-10 min-h-[22rem]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={current.key}
            custom={direction}
            initial={reduce ? false : { opacity: 0, x: 24 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 * direction }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label text-ochre-400">
              Step {step + 1} of {steps.length}
            </p>
            <h2 className={cn("mt-3 font-semibold", variant === "modal" ? "text-h3" : "text-h3 md:text-[2rem] md:leading-[1.1] md:tracking-[-0.03em]")}>
              {current.title}
            </h2>
            <p className="mt-2 text-white/60">{current.intro}</p>

            <form
              className="mt-8"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (step < steps.length - 1) next();
                else submit();
              }}
            >
              {hydrated ? (
                <>
                  {current.key === "when" && <StepWhen value={state.when} update={(p) => update("when", p)} errors={errors} />}
                  {current.key === "where" && <StepWhere value={state.where} update={(p) => update("where", p)} errors={errors} />}
                  {current.key === "budget" && <StepBudget value={state.budget} update={(p) => update("budget", p)} errors={errors} />}
                  {current.key === "who" && <StepWho value={state.who} update={(p) => update("who", p)} errors={errors} />}
                  {current.key === "contact" && (
                    <>
                      <Summary
                        items={[
                          state.when.arrivalDate && `${new Date(state.when.arrivalDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })} · ${state.when.nights} nights`,
                          routeTitle,
                          tierTitle,
                          `${state.who.adults} adult${state.who.adults > 1 ? "s" : ""}${state.who.children ? `, ${state.who.children} child${state.who.children > 1 ? "ren" : ""}` : ""}`,
                        ]}
                      />
                      <StepContact value={state.contact} update={(p) => update("contact", p)} errors={errors} />
                    </>
                  )}
                </>
              ) : (
                <div className="h-64 animate-pulse rounded-2xl bg-white/5" aria-hidden="true" />
              )}

              {status === "error" && (
                <p role="alert" className="mt-6 rounded-2xl border border-protea/40 bg-protea/10 p-4 text-sm">
                  Sorry, something went wrong sending your request. Please try again, or{" "}
                  <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="underline">
                    message us on WhatsApp
                  </a>
                  .
                </p>
              )}

              <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                {step > 0 ? (
                  <Button variant="ghost" onClick={() => goTo(step - 1)}>
                    ← Back
                  </Button>
                ) : (
                  <span className="text-sm text-white/55">Progress saves automatically</span>
                )}
                <Button type="submit" size="lg" icon disabled={status === "submitting"}>
                  {step < steps.length - 1 ? "Continue" : status === "submitting" ? "Sending…" : "Send my trip request"}
                </Button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Summary({ items }: { items: (string | false | undefined)[] }) {
  const list = items.filter(Boolean) as string[];
  if (!list.length) return null;
  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="label text-white/55">Your trip so far</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {list.map((t) => (
          <li key={t} className="rounded-full bg-white/[0.06] px-3 py-1.5 text-sm">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Confirmation({ name, email, variant, onClose }: { name: string; email: string; variant: "page" | "modal"; onClose?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center" role="status">
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="mx-auto flex size-20 items-center justify-center rounded-full bg-ochre"
      >
        <CheckIcon className="size-9" />
      </motion.span>
      <h2 className="mt-8 text-h2 font-semibold">Thank you{name ? `, ${name}` : ""}!</h2>
      <p className="mx-auto mt-4 max-w-lg text-body-lg text-white/70">
        Your trip request is with us. A dedicated Cape Compass specialist will be in touch within one working day. We&apos;ll reply to{" "}
        <span className="text-white">{email}</span> and your preferred contact methods.
      </p>
      <ol className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
        {["We review your answers", "Your specialist gets in touch", "You receive a tailored proposal"].map((s, i) => (
          <li key={s} className="rounded-2xl border border-white/10 p-4">
            <span className="text-sm font-semibold text-ochre-400">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 text-sm text-white/80">{s}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        {variant === "modal" && onClose ? (
          <Button onClick={onClose} variant="secondary">
            Continue browsing
          </Button>
        ) : (
          <Link
            href="/tours"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 font-medium transition-colors hover:bg-white hover:text-slate"
          >
            Browse sample tours
          </Link>
        )}
        <a
          href={whatsappHref("Hi Cape Compass, I've just sent a trip request via your website.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#25D366] px-6 font-medium text-white"
        >
          Chat on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
