"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/ui/Icons";

export function FieldLabel({ htmlFor, children, optional }: { htmlFor?: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow mb-2 block text-charcoal-700">
      {children}
      {optional && <span className="ml-1.5 normal-case tracking-normal text-stone-400">(optional)</span>}
    </label>
  );
}

export function Legend({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <legend className="eyebrow mb-3 text-charcoal-700">
      {children}
      {optional && <span className="ml-1.5 normal-case tracking-normal text-stone-400">(optional)</span>}
    </legend>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-brass-600">
      {message}
    </p>
  );
}

export const inputClass =
  "h-12 w-full border border-ivory-200 bg-ivory-50 px-4 text-[0.9375rem] text-charcoal-800 placeholder:text-stone-400 transition-colors hover:border-stone-300 focus:border-charcoal-800 focus:outline-none aria-[invalid=true]:border-brass-600";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClass, "h-auto min-h-28 py-3", props.className)} />;
}

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
        "flex cursor-pointer items-start gap-3 border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brass-500",
        checked ? "border-forest-700 bg-bone" : "border-ivory-200 bg-ivory-50 hover:border-stone-300",
      )}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center border transition-colors",
          type === "radio" ? "rounded-full" : "rounded-none",
          checked ? "border-forest-700 bg-forest-700 text-white" : "border-stone-300",
        )}
      >
        {checked && <CheckIcon className="size-3" />}
      </span>
      <span>
        <span className="block text-[0.9375rem] font-medium text-charcoal-800">{children}</span>
        {description && <span className="mt-0.5 block text-sm text-charcoal-700">{description}</span>}
      </span>
    </label>
  );
}

export function ImageChoice({ name, checked, onChange, title, text, image }: { name: string; checked: boolean; onChange: () => void; title: string; text: string; image: string }) {
  return (
    <label
      className={cn(
        "group relative block cursor-pointer border-2 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brass-500",
        checked ? "border-forest-700" : "border-transparent",
      )}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <div className="relative aspect-[4/3] bg-ivory-200">
        <Image src={image} alt={title} fill sizes="(min-width: 768px) 22vw, 45vw" className="object-cover" />
        <span aria-hidden="true" className={cn("absolute right-2 top-2 flex size-6 items-center justify-center border bg-ivory-50 text-forest-700", checked ? "border-forest-700" : "border-ivory-200")}>
          {checked && <CheckIcon className="size-3.5" />}
        </span>
      </div>
      <span className="block bg-bone px-3 py-2.5">
        <span className="block text-sm font-medium leading-tight text-charcoal-800">{title}</span>
        <span className="mt-0.5 block text-xs text-charcoal-700">{text}</span>
      </span>
    </label>
  );
}

export function Counter({ id, label, value, min, max, onChange, hint }: { id: string; label: string; value: number; min: number; max: number; onChange: (v: number) => void; hint?: string }) {
  const btn = "flex size-10 items-center justify-center border border-ivory-200 text-lg text-charcoal-800 transition-colors hover:border-charcoal-800 disabled:opacity-30 disabled:hover:border-ivory-200";
  return (
    <div className="flex items-center justify-between gap-4 border border-ivory-200 bg-ivory-50 p-4">
      <div>
        <p id={`${id}-label`} className="text-[0.9375rem] font-medium">{label}</p>
        {hint && <p className="text-sm text-charcoal-700">{hint}</p>}
      </div>
      <div className="flex items-center gap-3" role="group" aria-labelledby={`${id}-label`}>
        <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label}`}>−</button>
        <output aria-live="polite" className="w-6 text-center text-lg font-medium">{value}</output>
        <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label}`}>+</button>
      </div>
    </div>
  );
}
