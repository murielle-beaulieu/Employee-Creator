import * as z from "zod";

// private Long leaveId;
// private LocalDate startDate;
// private LocalDate endDate;
// private RequestType requestType;
// private RequestStatus status;
// private String reason;

export const schema = z.object({
  leaveId: z.string(),
  status: z.string(),
  reason: z.string()
});

export type ProcessRequestFormData = z.infer<typeof schema>;
