import { z } from "zod";
import { addOns, budgetTiers, contactMethods, plannerRoutes } from "@/data/planner";

const routeIds = plannerRoutes.map((r) => r.id) as [string, ...string[]];
const tierIds = budgetTiers.map((t) => t.id) as [string, ...string[]];
const addOnIds = addOns.map((a) => a.id) as [string, ...string[]];

export const whenSchema = z.object({
  arrivalDate: z
    .string()
    .min(1, "Please choose an arrival date (approximate is fine).")
    .refine((v) => !Number.isNaN(Date.parse(v)), "Please choose a valid date.")
    .refine((v) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(v) >= today;
    }, "Arrival date can't be in the past."),
  nights: z.number().int().min(1, "Minimum 1 night.").max(30, "For trips over 30 nights, add a note and we'll tailor it."),
  dateType: z.enum(["exact", "approximate"], { error: "Are your dates exact or approximate?" }),
  experience: z.enum(["first", "experienced"], { error: "Let us know if this is your first visit." }),
});

export const whereSchema = z
  .object({
    route: z.enum(routeIds, { error: "Choose a route, or 'Not sure yet'." }),
    routeNotes: z.string().max(1000).default(""),
  })
  .refine((v) => v.route !== "not-sure" || v.routeNotes.trim().length >= 3, {
    path: ["routeNotes"],
    message: "Tell us a little about what you'd love to see or do.",
  });

export const budgetSchema = z.object({
  tier: z.enum(tierIds, { error: "Choose a budget level, or 'Not sure yet'." }),
});

export const whoSchema = z
  .object({
    adults: z.number().int().min(1, "At least one adult must travel.").max(20),
    children: z.number().int().min(0).max(10),
    childAges: z.array(z.number().int().min(0).max(17)),
    addOns: z.array(z.enum(addOnIds)).default([]),
  })
  .refine((v) => v.childAges.length === v.children, {
    path: ["childAges"],
    message: "Please add each child's age.",
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  phoneCode: z.string().regex(/^\+\d{1,4}$/, "Choose a country code."),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s()-]{6,20}$/, "Please enter a valid phone number."),
  methods: z.array(z.enum(contactMethods)).min(1, "Choose at least one way to reach you."),
  notes: z.string().max(3000).default(""),
  consent: z.literal(true, { error: "Please agree so we can contact you about your trip." }),
});

export const plannerSchema = z.object({
  when: whenSchema,
  where: whereSchema,
  budget: budgetSchema,
  who: whoSchema,
  contact: contactSchema,
});

export type PlannerPayload = z.infer<typeof plannerSchema>;

export const stepSchemas = [whenSchema, whereSchema, budgetSchema, whoSchema, contactSchema] as const;
export const stepKeys = ["when", "where", "budget", "who", "contact"] as const;
export type StepKey = (typeof stepKeys)[number];
