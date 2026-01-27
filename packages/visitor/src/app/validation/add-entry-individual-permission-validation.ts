import { object, string, InferType } from "yup";
let phoneRegex = /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

export const AddEntryIndividualPermissionSchema = object({
  VisitorName: string().required("InputFieldIsRequried"),
  NationalID: string()
    .required("InputFieldIsRequried")
    .matches(/^\d{10}$/, {
      message: "InvalidNationalID",
    }),
  PhoneNumber: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
      "InvalidPhone"
    ),
  PermitTypeId: string().required("InputFieldIsRequried"),
  WhatsAppNumber: string()
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
  OrgId: string().required("InputFieldIsRequried"),
  // RecivedId: string().required("InputFieldIsRequried"),
  // Note: string().required("InputFieldIsRequried"),
  PermissionReason: string().required("InputFieldIsRequried"),
  StartDate: string().required("InputFieldIsRequried"),
  EndDate: string().required("InputFieldIsRequried"),
  StartTime: string().required("InputFieldIsRequried"),
  EndTime: string()
    .required("InputFieldIsRequried")
    .test({
      name: "EndWithin24HoursFromStart",
      message: "EndDateTimeMustBeWithin24HoursFromStartDateTime",
      test: function (value: any) {
        const { StartDate, EndDate, StartTime } = this.parent;
        if (!StartDate || !EndDate || !StartTime || !value) return true;

        const start = new Date(`${StartDate}T${StartTime}`);
        const end = new Date(`${EndDate}T${value}`);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          return this.createError({
            message: "EndDateTimeMustBeAfterStartDateTime",
          });
        }

        if (end <= start) {
          return this.createError({
            message: "EndDateTimeMustBeAfterStartDateTime",
          });
        }

        const diffInMs = end.getTime() - start.getTime();
        const hoursDiff = diffInMs / (1000 * 60 * 60);
        if (hoursDiff > 24) {
          return this.createError({
            message: "EndDateTimeMustBeWithin24HoursFromStartDateTime",
          });
        }

        return true;
      },
    }),
});

export type AddEntryIndividualPermissionProps = InferType<
  typeof AddEntryIndividualPermissionSchema
>;
