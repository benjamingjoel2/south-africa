"use client";

import Link from "next/link";
import { useState } from "react";
import { FieldError, FieldLabel, TextArea, TextInput } from "@/components/planner/fields";
import { Button } from "@/components/ui/Button";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "Please tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="border border-ivory-200 bg-bone p-8">
        <p className="eyebrow text-brass-600">Message received</p>
        <h2 className="mt-2 text-h3">Thank you.</h2>
        <p className="mt-3 text-charcoal-700">
          A specialist will reply within one working day. In the meantime, you might enjoy our{" "}
          <Link href="/blog" className="underline underline-offset-2">journal</Link>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor="c-name">Name</FieldLabel>
          <TextInput id="c-name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-error" : undefined} />
          <FieldError id="c-name-error" message={errors.name} />
        </div>
        <div>
          <FieldLabel htmlFor="c-email">Email</FieldLabel>
          <TextInput id="c-email" type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-error" : undefined} />
          <FieldError id="c-email-error" message={errors.email} />
        </div>
        <div>
          <FieldLabel htmlFor="c-phone" optional>Phone</FieldLabel>
          <TextInput id="c-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} />
        </div>
        <div>
          <FieldLabel htmlFor="c-subject" optional>Subject</FieldLabel>
          <TextInput id="c-subject" value={values.subject} onChange={set("subject")} placeholder="e.g. Honeymoon in March" />
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="c-message">Message</FieldLabel>
        <TextArea id="c-message" rows={6} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-error" : undefined} />
        <FieldError id="c-message-error" message={errors.message} />
      </div>
      {status === "error" && (
        <p role="alert" className="border-l-2 border-brass-500 bg-ivory-100 px-4 py-3 text-sm">Something went wrong while sending. Please try again.</p>
      )}
      <Button type="submit" arrow disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
