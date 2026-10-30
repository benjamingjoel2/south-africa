"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import type { z } from "zod";
import { plannerRoutes, budgetTiers } from "@/data/planner";
import { stepSchemas } from "@/lib/planner-schema";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { usePlannerStore, type PlannerState } from "./usePlannerStore";
import { StepBudget, StepContact, StepWhen, StepWhere, StepWho } from "./steps";

const steps = [
  { key: "when", label: "When", title: "When would you like to travel?", intro: "Approximate is perfectly fine. Seasons shape the best route." },
  { key: "where", label: "Where", title: "Where would you like to go?", intro: "Pick the closest fit. We tailor every detail later." },
  { key: "budget", label: "Budget", title: "What level of comfort suits you?", intro: "This helps us suggest the right stays from the start." },
  { key: "who", label: "Who", title: "Who is coming along?", intro: "Tell us about your party and any extras you'd like help with." },
  { key: "contact", label: "Contact", title: "How can we reach you?", intro: "Your specialist replies within one working day." },
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
  if (key === "who") return { ...state.who, childAges: state.who.childAges.filter((a): a is number => a !== null) };
  return state[key];
}

const reduceMq = () => window.matchMedia("(prefers-reduced-motion: reduce)");
function useReducedMotionPref() {
  return useSyncExternalStore(
    (cb) => {
      const mq = reduceMq();
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => reduceMq().matches,
    () => false,
  );
}

export function Planner({ variant = "page", onClose }: { variant?: "page" | "modal"; onClose?: () => void }) {
  const { state, update, setStep, reset, hydrated } = usePlannerStore();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionPref();
  const step = Math.min(state.step, steps.length - 1);
  const current = steps[step];

  function validate(i: number) {
    const result = stepSchemas[i].safeParse(sectionForValidation(state, i));
    if (!result.success) {
      setErrors(toErrors(result.error));
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

  async function submit() {
    for (let i = 0; i < steps.length; i++) {
      if (!validate(i)) {
        if (i !== step) goTo(i);
        return;
      }
    }
    setStatus("submitting");
    try {
      const payload = { when: state.when, where: state.where, budget: state.budget, who: sectionForValidation(state, 3), contact: state.contact };
      const res = await fetch("/api/plan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted({ name: state.contact.name.split(" ")[0], email: state.contact.email });
      setStatus("done");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done" && submitted) return <Confirmation name={submitted.name} email={submitted.email} variant={variant} onClose={onClose} />;

  const routeTitle = plannerRoutes.find((r) => r.id === state.where.route)?.title;
  const tierTitle = budgetTiers.find((t) => t.id === state.budget.tier)?.title;

  return (
    <div ref={topRef} className="scroll-mt-28">
      <nav aria-label="Planner progress">
        <p className="eyebrow">
          Step {step + 1} of {steps.length} · {current.label}
        </p>
        <ol className="mt-3 grid grid-cols-5 gap-1.5">
          {steps.map((s, i) => (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => (i < step ? goTo(i) : undefined)}
                disabled={i > step}
                aria-current={i === step ? "step" : undefined}
                aria-label={`${s.label}${i < step ? " (completed, go back)" : ""}`}
                className="block h-[3px] w-full bg-ivory-200 disabled:cursor-default"
              >
                <span className="block h-full bg-brass-500 transition-[width] duration-400" style={{ width: i <= step ? "100%" : "0%" }} />
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10">
        <div key={current.key} className="anim-step" data-dir={direction > 0 ? "next" : "back"}>
            <h2 className={cn(variant === "modal" ? "text-h3" : "text-h2")}>{current.title}</h2>
            <p className="mt-2 text-charcoal-700">{current.intro}</p>

            <form
              className="mt-8"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (step < steps.length - 1) {
                  if (validate(step)) goTo(step + 1);
                } else submit();
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
                <div className="h-64 animate-pulse bg-ivory-100" aria-hidden="true" />
              )}

              {status === "error" && (
                <p role="alert" className="mt-6 border-l-2 border-brass-500 bg-ivory-100 px-4 py-3 text-sm">
                  Sorry, something went wrong sending your request. Please try again, or{" "}
                  <a href={`mailto:${site.contact.email}`} className="underline">email us at {site.contact.email}</a>.
                </p>
              )}

              <div className="mt-10 flex items-center justify-between gap-4 border-t border-ivory-200 pt-6">
                {step > 0 ? (
                  <Button variant="link" onClick={() => goTo(step - 1)}>← Back</Button>
                ) : (
                  <span className="text-sm text-stone-400">Progress saves automatically</span>
                )}
                <Button type="submit" size="lg" arrow disabled={status === "submitting"}>
                  {step < steps.length - 1 ? "Next" : status === "submitting" ? "Sending…" : "Send my request"}
                </Button>
              </div>
            </form>
        </div>
      </div>
      <p className="mt-8 text-sm text-charcoal-700">
        Prefer email? Write to{" "}
        <a href={`mailto:${site.contact.email}`} className="text-charcoal-800 underline underline-offset-2">{site.contact.email}</a> instead.
      </p>
    </div>
  );
}

function Summary({ items }: { items: (string | false | undefined)[] }) {
  const list = items.filter(Boolean) as string[];
  if (!list.length) return null;
  return (
    <div className="mb-8 border border-ivory-200 bg-bone p-4">
      <p className="eyebrow">Your trip so far</p>
      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-charcoal-700">
        {list.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function Confirmation({ name, email, variant, onClose }: { name: string; email: string; variant: "page" | "modal"; onClose?: () => void }) {
  return (
    <div className="anim-fade-up py-4" role="status">
      <span className="flex size-12 items-center justify-center rounded-full bg-forest-700 text-white">
        <CheckIcon className="size-5" />
      </span>
      <p className="eyebrow mt-6 text-brass-600">Request received</p>
      <h2 className="mt-2 text-h2">Thank you{name ? `, ${name}` : ""}.</h2>
      <p className="mt-4 max-w-lg text-lead text-charcoal-700">
        Your trip request is with us. A dedicated Cape Compass specialist will be in touch within one working day. We&rsquo;ll reply to <span className="text-charcoal-800">{email}</span> and your preferred contact methods.
      </p>
      <ol className="mt-8 grid max-w-2xl gap-px border border-ivory-200 bg-ivory-200 sm:grid-cols-3">
        {["We review your answers", "Your specialist gets in touch", "You receive a tailored proposal"].map((s, i) => (
          <li key={s} className="bg-ivory-50 p-4">
            <span className="eyebrow">0{i + 1}</span>
            <p className="mt-1.5 text-sm">{s}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {variant === "modal" && onClose ? (
          <Button onClick={onClose} variant="outline-dark">Continue browsing</Button>
        ) : (
          <Link href="/tours" className="inline-flex h-11 items-center justify-center border border-charcoal-800 px-6 text-eyebrow font-medium uppercase tracking-eyebrow hover:bg-charcoal-800 hover:text-white">
            Browse sample tours
          </Link>
        )}
      </div>
    </div>
  );
}
