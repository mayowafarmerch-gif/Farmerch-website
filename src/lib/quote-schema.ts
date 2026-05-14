import { z } from "zod";

/*
  Canonical quote-form schema — imported by both the client component
  (QuoteForm.tsx, for react-hook-form/zodResolver) and the API route
  (api/quote/route.ts, for server-side re-validation).

  Keeping one schema in one place guarantees the two validation layers
  are always in sync. Never duplicate or diverge from this file.
*/

export const quoteSchema = z.object({
  organizationType:  z.string().min(1,  "Please select an organization type"),
  organizationName:  z.string().min(2,  "Organization name is required"),
  contactName:       z.string().min(2,  "Contact name is required"),
  email:             z.string().email(  "Enter a valid email address"),
  /*
    Nigerian mobile — local (0xxxxxxxxxx, 11 digits)
    or international (+234xxxxxxxxx, 14 chars).
  */
  phone:             z.string().regex(
    /^(\+234|0)[789]\d{9}$/,
    "Enter a valid Nigerian phone number (+234… or 0…)"
  ),
  serviceRequired:   z.string().min(1,  "Please select a service type"),
  farmSize:          z.string().min(1,  "Farm size is required"),
  location:          z.string().min(2,  "Location is required"),
  preferredTimeline: z.string().min(1,  "Please select a preferred timeline"),
  additionalInfo:    z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
