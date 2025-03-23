import * as z from "zod";

export const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  dob: z.string(),
  phone_number: z.string(),
  email: z.string(),
  address: z.string(), // must validate it's australian?
  start_date: z.string(),
  end_date: z.string(),
  role: z.string(),
  department: z.string(),
  contract: z.string(),
});

export type UpdateEmployeeFormData = z.infer<typeof schema>;
