import { object, string, InferType } from "yup";
let phoneRegex = /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
export const AddVisitorSchema = object({
  GroupName: string().required("InputFieldIsRequried"),
  UserId: string().required("InputFieldIsRequried"),
  VisitorNId: string()
    .required("InputFieldIsRequried")
    .matches(/^\d{10}$/, {
      message: "InvalidNationalID",
    }),
  Phone: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
      "InvalidPhone"
    ),
  Whatsapp: string()
    .notRequired()
    .nullable()
    .test({
      name: "Whatsapp",
      message: "InvalidPhone",
      test: function (value: any) {
        if (value) {
          return phoneRegex.test(value);
        } else {
          return true;
        }
      },
    }),
  Email: string()
    .required("InputFieldIsRequried")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "InvalidEmail"
    ),
});

export type AddVisitorProps = InferType<typeof AddVisitorSchema>;
