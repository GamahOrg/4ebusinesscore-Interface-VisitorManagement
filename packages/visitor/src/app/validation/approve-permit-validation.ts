import { string, object } from "yup";

export const approvePermitValidations = object().shape({
  note: string().optional()
});

export const rejectPermitValidations = object().shape({
  note: string().required("ThisFelidIsRequired")
});

