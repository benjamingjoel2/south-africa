"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/ui/Icons";

export function FieldLabel({ htmlFor, children, optional }: { htmlFor?: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-white/70">
      {children}
      {optional && <span className="ml-1.5 font-normal text-white/40">(optional)</span>}
    </label>
  );
}

export function Legend({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <legend className="mb-3 text-sm font-medium text-white/70">
      {children}
      {optional && <span className="ml-1.5 font-normal text-white/40">(optional)</span>}
    </legend>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-protea">
      <span aria-hidden="true">!</span> {message}
    </p>
  );
}

export const inputClass =
  "h-14 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-5 text-white placeholder:text-white/30 transition-colors hover:border-white/25 focus:border-ochre focus:bg-white/[0.06] focus:outline-none aria-[invalid=true]:border-protea";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClass, "h-auto min-h-28 py-4", props.className)} />;
}

/** Pill-style radio/checkbox option. */
export function ChoicePill({
  type = "radio",
  name,
  checked,
  onChange,
  children,
  description,
}: {
  type?: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ochre-400",
        checked ? "border-ochre bg-ochre/10" : "border-white/12 hover:border-white/30",
      )}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center border transition-colors",
          type === "radio" ? "rounded-full" : "rounded-md",
          checked ? "border-ochre bg-ochre" : "border-white/30",
        )}
      >
        {checked && <CheckIcon className="size-3.5" />}
      </span>
      <span>
        <span className="block font-medium">{children}</span>
        {description && <span className="mt-0.5 block text-sm text-white/55">{description}</span>}
      </span>
    </label>
  );
}

/** Selectable image card (route picker). */
export function ImageChoice({
  name,
  checked,
  onChange,
  title,
  text,
  image,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <label
      className={cn(
        "group relative block cursor-pointer overflow-hidden rounded-2xl border-2 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ochre-400",
        checked ? "border-ochre" : "border-transparent",
      )}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <div className="relative aspect-[4/3]">
        <Image src={image} alt="" fill sizes="(min-width: 768px) 22vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className={cn("absolute inset-0 transition-colors", checked ? "bg-gradient-to-t from-black/85 via-black/30 to-ochre/20" : "bg-gradient-to-t from-black/85 via-black/25 to-transparent")} />
        <span
          aria-hidden="true"
          className={cn(
            "absolute right-3 top-3 flex size-7 items-center justify-center rounded-full border-2 transition-colors",
            checked ? "border-ochre bg-ochre" : "border-white/70 bg-black/20",
          )}
        >
          {checked && <CheckIcon className="size-4" />}
        </span>
        <span className="absolute inset-x-0 bottom-0 p-3.5">
          <span className="block font-semibold leading-tight">{title}</span>
          <span className="mt-0.5 block text-xs text-white/70">{text}</span>
        </span>
      </div>
    </label>
  );
}

export function Counter({
  id,
  label,
  value,
  min,
  max,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  const btn =
    "flex size-11 items-center justify-center rounded-full border border-white/15 text-lg transition-colors hover:border-white/50 disabled:opacity-30 disabled:hover:border-white/15";
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/12 p-4">
      <div>
        <p id={`${id}-label`} className="font-medium">
          {label}
        </p>
        {hint && <p className="text-sm text-white/50">{hint}</p>}
      </div>
      <div className="flex items-center gap-3" role="group" aria-labelledby={`${id}-label`}>
        <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label}`}>
          −
        </button>
        <output aria-live="polite" className="w-6 text-center text-lg font-semibold">
          {value}
        </output>
        <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label}`}>
          +
        </button>
      </div>
    </div>
  );
}
