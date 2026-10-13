"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const PLANNER_STORAGE_KEY = "cc-planner-v1";

export type PlannerState = {
  step: number;
  when: { arrivalDate: string; nights: number; dateType: "" | "exact" | "approximate"; experience: "" | "first" | "experienced" };
  where: { route: string; routeNotes: string };
  budget: { tier: string };
  who: { adults: number; children: number; childAges: (number | null)[]; addOns: string[] };
  contact: { name: string; email: string; phoneCode: string; phone: string; methods: string[]; notes: string; consent: boolean };
};

export const initialPlannerState: PlannerState = {
  step: 0,
  when: { arrivalDate: "", nights: 12, dateType: "", experience: "" },
  where: { route: "", routeNotes: "" },
  budget: { tier: "" },
  who: { adults: 2, children: 0, childAges: [], addOns: [] },
  contact: { name: "", email: "", phoneCode: "+1", phone: "", methods: ["Email"], notes: "", consent: false },
};

type Section = Exclude<keyof PlannerState, "step">;

/** Planner state persisted to localStorage so progress survives reloads and modal ↔ page switches. */
export function usePlannerStore() {
  const [state, setState] = useState<PlannerState>(initialPlannerState);
  const [hydrated, setHydrated] = useState(false);
  const skipSave = useRef(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PLANNER_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<PlannerState>;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- restore persisted progress after mount
        setState((s) => ({
          ...s,
          ...saved,
          when: { ...s.when, ...saved.when },
          where: { ...s.where, ...saved.where },
          budget: { ...s.budget, ...saved.budget },
          who: { ...s.who, ...saved.who },
          contact: { ...s.contact, ...saved.contact },
        }));
      }
    } catch {
      /* ignore corrupt or unavailable storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    try {
      window.localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, hydrated]);

  const update = useCallback(<K extends Section>(section: K, patch: Partial<PlannerState[K]>) => {
    setState((s) => ({ ...s, [section]: { ...s[section], ...patch } }));
  }, []);

  const setStep = useCallback((step: number) => setState((s) => ({ ...s, step })), []);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(PLANNER_STORAGE_KEY);
    } catch {}
    skipSave.current = true;
    setState(initialPlannerState);
  }, []);

  return { state, update, setStep, reset, hydrated };
}
