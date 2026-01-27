import { object, string, InferType, number, boolean } from "yup";

export const AddViolationSchema = object({
  Violationtype: string().required("InputFieldIsRequried"),
  Date: string().required("InputFieldIsRequried"),
  Description: string().required("InputFieldIsRequried"),
  Attachments:string().notRequired(),
  Location:string().notRequired().nullable(),
});

export type AddViolationProps = InferType<typeof AddViolationSchema>;
