import * as z from "zod";

export const schema = z.object({
  first_name: z.string().min(2, {message: "Please enter your full first name"}),
  last_name: z.string().min(2, {message: "Please enter your last first name"}),
  dob: z.string(),
  phone_number: z.string().regex(/^(?:\+61|0)[2-478]{1}[0-9]{8}$/, {
    message: 'Invalid Australian phone number format',
  }),
  email: z.string().email(),
  address: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  role: z.string().min(5),
  department: z.string(),
  contract: z.string(),
});

export type EmployeeFormData = z.infer<typeof schema>;
