import * as z from "zod";

export const schema = z.object({
  employeeId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  requestType: z.string(),
  requestComment: z.string()
});

export type NewRequestFormData = z.infer<typeof schema>;
