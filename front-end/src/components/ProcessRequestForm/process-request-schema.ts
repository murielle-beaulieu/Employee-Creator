import * as z from "zod";

export const schema = z.object({
  leaveId: z.string(),
  status: z.string(),
  reason: z.string()
});

export type ProcessRequestFormData = z.infer<typeof schema>;
