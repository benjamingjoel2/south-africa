"use client";

import { addOns, budgetTiers, contactMethods, plannerRoutes } from "@/data/planner";
import { Price } from "@/components/ui/Price";
import type { PlannerState } from "./usePlannerStore";
import { ChoicePill, Counter, FieldError, FieldLabel, ImageChoice, Legend, TextArea, TextInput, inputClass } from "./fields";

type Errors = Record<string, string>;
type StepProps<K extends keyof Omit<PlannerState, "step">> = {
  value: PlannerState[K];
  update: (patch: Partial<PlannerState[K]>) => void;
  errors: Errors;
};

const err = (errors: Errors, key: string) => errors[key];
const describedBy = (errors: Errors, key: string, id: string) => (errors[key] ? `${id}-error` : undefined);

/* ------------------------------ 1. When ------------------------------ */
export function StepWhen({ value, update, errors }: StepProps<"when">) {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="arrivalDate">Arrival date in South Africa</FieldLabel>
          <TextInput
            id="arrivalDate"
            type="date"
            min={today}
            value={value.arrivalDate}
            onChange={(e) => update({ arrivalDate: e.target.value })}
            aria-invalid={!!err(errors, "arrivalDate")}
            aria-describedby={describedBy(errors, "arrivalDate", "arrivalDate")}
            className="[color-scheme:light]"
          />
          <FieldError id="arrivalDate-error" message={err(errors, "arrivalDate")} />
        </div>
        <div>
          <FieldLabel htmlFor="nights">
            Length of stay: <span className="font-medium text-charcoal-800">{value.nights} {value.nights === 1 ? "night" : "nights"}</span>
          </FieldLabel>
          <div className="flex h-14 items-center gap-4 rounded-none border border-ivory-200 bg-ivory-50 px-5">
            <input
              id="nights"
              type="range"
              min={1}
              max={30}
              value={value.nights}
              onChange={(e) => update({ nights: Number(e.target.value) })}
              className="w-full accent-[var(--color-forest-700)]"
              aria-valuetext={`${value.nights} nights`}
            />
            <input
              type="number"
              min={1}
              max={30}
              value={value.nights}
              onChange={(e) => update({ nights: Math.max(1, Math.min(30, Number(e.target.value) || 1)) })}
              aria-label="Number of nights"
              className="w-14 rounded-none bg-ivory-100 py-1 text-center"
            />
          </div>
          <FieldError id="nights-error" message={err(errors, "nights")} />
        </div>
      </div>

      <fieldset aria-describedby={describedBy(errors, "dateType", "dateType")}>
        <Legend>How fixed are your dates?</Legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <ChoicePill name="dateType" checked={value.dateType === "exact"} onChange={() => update({ dateType: "exact" })} description="Flights booked or dates set">
            Exact dates
          </ChoicePill>
          <ChoicePill name="dateType" checked={value.dateType === "approximate"} onChange={() => update({ dateType: "approximate" })} description="Flexible by a few days or weeks">
            Approximate
          </ChoicePill>
        </div>
        <FieldError id="dateType-error" message={err(errors, "dateType")} />
      </fieldset>

      <fieldset aria-describedby={describedBy(errors, "experience", "experience")}>
        <Legend>Have you been to South Africa before?</Legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <ChoicePill name="experience" checked={value.experience === "first"} onChange={() => update({ experience: "first" })} description="Show me the highlights">
            First time
          </ChoicePill>
          <ChoicePill name="experience" checked={value.experience === "experienced"} onChange={() => update({ experience: "experienced" })} description="I'd like to go deeper">
            I&apos;ve been before
          </ChoicePill>
        </div>
        <FieldError id="experience-error" message={err(errors, "experience")} />
      </fieldset>
    </div>
  );
}

/* ------------------------------ 2. Where ----------------------------- */
export function StepWhere({ value, update, errors }: StepProps<"where">) {
  return (
    <div className="space-y-6">
      <fieldset aria-describedby={describedBy(errors, "route", "route")}>
        <Legend>Which kind of trip appeals most?</Legend>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {plannerRoutes.map((r) => (
            <ImageChoice
              key={r.id}
              name="route"
              checked={value.route === r.id}
              onChange={() => update({ route: r.id })}
              title={r.title}
              text={r.text}
              image={r.image}
            />
          ))}
        </div>
        <FieldError id="route-error" message={err(errors, "route")} />
      </fieldset>
      <div>
        <FieldLabel htmlFor="routeNotes" optional={value.route !== "not-sure"}>
          {value.route === "not-sure" ? "Tell us what you'd love to see or do" : "Anything specific you'd like to include?"}
        </FieldLabel>
        <TextArea
          id="routeNotes"
          rows={3}
          value={value.routeNotes}
          onChange={(e) => update({ routeNotes: e.target.value })}
          placeholder="e.g. We'd love to see leopards, do a wine-tasting day and end on a beach…"
          aria-invalid={!!err(errors, "routeNotes")}
          aria-describedby={describedBy(errors, "routeNotes", "routeNotes")}
        />
        <FieldError id="routeNotes-error" message={err(errors, "routeNotes")} />
      </div>
    </div>
  );
}

/* ------------------------------ 3. Budget ---------------------------- */
export function StepBudget({ value, update, errors }: StepProps<"budget">) {
  return (
    <fieldset aria-describedby={describedBy(errors, "tier", "tier")}>
      <Legend>What level of comfort are you looking for?</Legend>
      <p className="-mt-1 mb-5 text-sm text-charcoal-700">Approximate land cost per person, per day, sharing. Excludes international flights.</p>
      <div className="grid gap-3 md:grid-cols-2">
        {budgetTiers.map((t) => (
          <label
            key={t.id}
            className={`relative flex cursor-pointer flex-col rounded-none border p-5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brass-500 ${
              value.tier === t.id ? "border-forest-700 bg-bone" : "border-ivory-200 hover:border-stone-300"
            }`}
          >
            <input type="radio" name="tier" className="sr-only" checked={value.tier === t.id} onChange={() => update({ tier: t.id })} />
            <span className="flex items-center justify-between">
              <span className="font-display text-h4">{t.title}</span>
              <span
                aria-hidden="true"
                className={`size-5 rounded-full border-2 ${value.tier === t.id ? "border-forest-700 bg-forest-700 shadow-[inset_0_0_0_3px_var(--color-ivory-50)]" : "border-stone-300"}`}
              />
            </span>
            <span className="mt-3 text-charcoal-700">{t.text}</span>
            <span className="mt-4 text-sm">
              {t.priceUsd > 0 ? (
                <>
                  From <Price usd={t.priceUsd} className="font-medium text-charcoal-800" />
                  <span className="text-charcoal-700"> pp / day</span>
                </>
              ) : (
                <span className="text-charcoal-700">We&apos;ll show you options</span>
              )}
            </span>
          </label>
        ))}
      </div>
      <FieldError id="tier-error" message={err(errors, "tier")} />
    </fieldset>
  );
}

/* ------------------------------ 4. Who ------------------------------- */
export function StepWho({ value, update, errors }: StepProps<"who">) {
  const setChildren = (n: number) => {
    const ages = [...value.childAges].slice(0, n);
    while (ages.length < n) ages.push(null);
    update({ children: n, childAges: ages });
  };
  const toggleAddOn = (id: string) =>
    update({ addOns: value.addOns.includes(id) ? value.addOns.filter((a) => a !== id) : [...value.addOns, id] });

  return (
    <div className="space-y-8">
      <div className="grid gap-3 md:grid-cols-2">
        <Counter id="adults" label="Adults" hint="18+" value={value.adults} min={1} max={20} onChange={(v) => update({ adults: v })} />
        <Counter id="children" label="Children" hint="0–17" value={value.children} min={0} max={10} onChange={setChildren} />
      </div>
      <FieldError id="adults-error" message={err(errors, "adults")} />

      {value.children > 0 && (
        <fieldset aria-describedby={describedBy(errors, "childAges", "childAges")}>
          <Legend>Children&apos;s ages on arrival</Legend>
          <p className="-mt-1 mb-4 text-sm text-charcoal-700">Many safari lodges set minimum ages for game drives, so this helps us choose the right ones.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {value.childAges.map((age, i) => (
              <div key={i}>
                <label htmlFor={`child-${i}`} className="mb-1.5 block text-xs text-charcoal-700">
                  Child {i + 1}
                </label>
                <select
                  id={`child-${i}`}
                  value={age ?? ""}
                  onChange={(e) => {
                    const ages = [...value.childAges];
                    ages[i] = e.target.value === "" ? null : Number(e.target.value);
                    update({ childAges: ages });
                  }}
                  className={`${inputClass} [color-scheme:light]`}
                  aria-invalid={age === null && !!err(errors, "childAges")}
                >
                  <option value="">Age</option>
                  {Array.from({ length: 18 }).map((_, a) => (
                    <option key={a} value={a}>
                      {a === 0 ? "Under 1" : a}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <FieldError id="childAges-error" message={err(errors, "childAges")} />
        </fieldset>
      )}

      <fieldset>
        <Legend optional>Would you like help with any of these?</Legend>
        <div className="grid gap-3 md:grid-cols-2">
          {addOns.map((a) => (
            <ChoicePill key={a.id} type="checkbox" name="addOns" checked={value.addOns.includes(a.id)} onChange={() => toggleAddOn(a.id)} description={a.text}>
              {a.title}
            </ChoicePill>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

/* ------------------------------ 5. Contact --------------------------- */
const phoneCodes = [
  ["+1", "US/CA +1"], ["+44", "UK +44"], ["+353", "IE +353"], ["+49", "DE +49"], ["+33", "FR +33"],
  ["+31", "NL +31"], ["+32", "BE +32"], ["+41", "CH +41"], ["+43", "AT +43"], ["+39", "IT +39"],
  ["+34", "ES +34"], ["+46", "SE +46"], ["+47", "NO +47"], ["+45", "DK +45"], ["+61", "AU +61"],
  ["+64", "NZ +64"], ["+27", "ZA +27"], ["+971", "AE +971"], ["+65", "SG +65"], ["+91", "IN +91"],
  ["+86", "CN +86"], ["+81", "JP +81"], ["+55", "BR +55"], ["+52", "MX +52"],
] as const;

export function StepContact({ value, update, errors }: StepProps<"contact">) {
  const toggleMethod = (m: string) =>
    update({ methods: value.methods.includes(m) ? value.methods.filter((x) => x !== m) : [...value.methods, m] });
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <TextInput
            id="name"
            autoComplete="name"
            value={value.name}
            onChange={(e) => update({ name: e.target.value })}
            aria-invalid={!!err(errors, "name")}
            aria-describedby={describedBy(errors, "name", "name")}
          />
          <FieldError id="name-error" message={err(errors, "name")} />
        </div>
        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <TextInput
            id="email"
            type="email"
            autoComplete="email"
            value={value.email}
            onChange={(e) => update({ email: e.target.value })}
            aria-invalid={!!err(errors, "email")}
            aria-describedby={describedBy(errors, "email", "email")}
          />
          <FieldError id="email-error" message={err(errors, "email")} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="phone">Phone (with country code)</FieldLabel>
        <div className="flex gap-3">
          <select
            aria-label="Country code"
            value={value.phoneCode}
            onChange={(e) => update({ phoneCode: e.target.value })}
            className={`${inputClass} w-36 shrink-0 [color-scheme:light]`}
          >
            {phoneCodes.map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
          <TextInput
            id="phone"
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
            value={value.phone}
            onChange={(e) => update({ phone: e.target.value })}
            aria-invalid={!!err(errors, "phone")}
            aria-describedby={describedBy(errors, "phone", "phone")}
          />
        </div>
        <FieldError id="phone-error" message={err(errors, "phone") ?? err(errors, "phoneCode")} />
      </div>

      <fieldset aria-describedby={describedBy(errors, "methods", "methods")}>
        <Legend>How would you like us to contact you?</Legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {contactMethods.map((m) => (
            <ChoicePill key={m} type="checkbox" name="methods" checked={value.methods.includes(m)} onChange={() => toggleMethod(m)}>
              {m}
            </ChoicePill>
          ))}
        </div>
        <FieldError id="methods-error" message={err(errors, "methods")} />
      </fieldset>

      <div>
        <FieldLabel htmlFor="notes" optional>
          Anything else we should know?
        </FieldLabel>
        <TextArea
          id="notes"
          rows={4}
          value={value.notes}
          onChange={(e) => update({ notes: e.target.value })}
          placeholder="Special occasions, dietary needs, mobility, must-dos…"
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal-700">
          <input
            type="checkbox"
            checked={value.consent}
            onChange={(e) => update({ consent: e.target.checked })}
            className="mt-0.5 size-5 shrink-0 accent-[var(--color-forest-700)]"
            aria-invalid={!!err(errors, "consent")}
            aria-describedby={describedBy(errors, "consent", "consent")}
          />
          <span>
            I agree that Cape Compass may contact me about this trip and store my details in line with the{" "}
            <a href="/privacy" className="text-charcoal-800 underline underline-offset-2" target="_blank">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        <FieldError id="consent-error" message={err(errors, "consent")} />
      </div>
    </div>
  );
}
