import { object, string, InferType } from "yup";

export const EditViolationSchema = object({
  Violationtype: string().required("InputFieldIsRequried"),
  Date: string().required("InputFieldIsRequried"),
  Description: string().required("InputFieldIsRequried"),
  Attachments:string().notRequired(),
  Location:string().notRequired().nullable(),
});

export type EditViolationProps = InferType<typeof EditViolationSchema>;
