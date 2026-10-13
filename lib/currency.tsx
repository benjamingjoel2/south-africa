"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { currencies, defaultCurrency, type CurrencyCode } from "@/config/site";

const STORAGE_KEY = "cc-currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** Convert a USD amount and format it in the active currency. */
  format: (usd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function convert(usd: number, code: CurrencyCode) {
  const raw = usd * currencies[code].rate;
  // Round to a "marketing-friendly" step so converted prices don't look odd.
  const step = raw >= 10000 ? 100 : raw >= 1000 ? 10 : 5;
  return Math.round(raw / step) * step;
}

export function formatMoney(usd: number, code: CurrencyCode) {
  const c = currencies[code];
  const value = convert(usd, code);
  return `${c.symbol}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)}`;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(defaultCurrency);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate persisted preference after mount
      if (saved && saved in currencies) setCurrencyState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(
    () => ({ currency, setCurrency, format: (usd: number) => formatMoney(usd, currency) }),
    [currency, setCurrency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}
