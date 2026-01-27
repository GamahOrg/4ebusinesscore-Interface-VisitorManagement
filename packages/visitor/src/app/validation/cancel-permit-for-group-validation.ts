import { object, string, InferType, number, boolean,array } from "yup";

export const CancelPermitForGroupSchema = object({
  cancelReason: boolean(),
  visitorId: string().required("InputFieldIsRequried"),
  violations: array().of(
    object({
      id: string(),
    })
  ),
  violationId: string().when(["cancelReason", "violations"], {
    is: (cancelReason: boolean, violations: any[]) => cancelReason,
    then: string().required("InputFieldIsRequried"),
  }),
  cancelReasonText: string().when("cancelReason", {
    is: false,
    then: string().required("InputFieldIsRequried"),
  }),
});

export type CancelPermitForGroupProps = InferType<
  typeof CancelPermitForGroupSchema
>;
