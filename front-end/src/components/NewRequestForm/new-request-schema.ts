import * as z from "zod";

export const schema = z.object({
  employeeId: z.string(),
  startDate: z.string().date().refine(),
  endDate: z.string().date(),
  requestType: z.string(),
  requestComment: z.string().min(5, {message: "Please specify the reson for your request"})
});

export type NewRequestFormData = z.infer<typeof schema>;
