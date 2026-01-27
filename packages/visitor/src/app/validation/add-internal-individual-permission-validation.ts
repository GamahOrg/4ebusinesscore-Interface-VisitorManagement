import { object, string, InferType } from "yup";
let phoneRegex = /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

export const AddInternalIndividualPermissionSchema = object({
  VisitorName: string().required("InputFieldIsRequried"),
  Email: string().required("InputFieldIsRequried"),
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
  OrgId: string().required("InputFieldIsRequried"),
  // RecivedId: string().required("InputFieldIsRequried"),
  // Note: string().required("InputFieldIsRequried"),
  PermissionReason: string().notRequired().nullable(),
  StartDateTime: string()
    .required("InputFieldIsRequried")
    .test({
      name: "StartDateTimeWindow",
      message: "EndDateTimeMustBeWithin24HoursFromStartDateTime",
      test: function (value: any) {
        const end = this.parent.EndDateTime;
        if (!value || !end) return true;

        const startDate = new Date(value);
        const endDate = new Date(end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          return this.createError({
            path: "EndDateTime",
            message: "EndDateTimeMustBeAfterStartDateTime",
          });
        }

        if (endDate <= startDate) {
          return this.createError({
            path: "EndDateTime",
            message: "EndDateTimeMustBeAfterStartDateTime",
          });
        }

        const diffInMs = endDate.getTime() - startDate.getTime();
        const hoursDiff = diffInMs / (1000 * 60 * 60);

        if (hoursDiff > 24) {
          return this.createError({
            path: "EndDateTime",
            message: "EndDateTimeMustBeWithin24HoursFromStartDateTime",
          });
        }

          return true;
      },
    }),
  EndDateTime: string()
    .required("InputFieldIsRequried")
    .test({
      name: "EndDateTimeWindow",
      message: "EndDateTimeMustBeWithin24HoursFromStartDateTime",
      test: function (value: any) {
        const start = this.parent.StartDateTime;
        if (!value || !start) return true;

        const startDate = new Date(start);
        const endDate = new Date(value);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          return this.createError({
            message: "EndDateTimeMustBeAfterStartDateTime",
          });
        }

        if (endDate <= startDate) {
          return this.createError({
            message: "EndDateTimeMustBeAfterStartDateTime",
          });
        }

        const diffInMs = endDate.getTime() - startDate.getTime();
        const hoursDiff = diffInMs / (1000 * 60 * 60);

        if (hoursDiff > 24) {
          return this.createError({
            message: "EndDateTimeMustBeWithin24HoursFromStartDateTime",
          });
        }

        return true;
      },
    }),
  NationalID: string()
    .required("InputFieldIsRequried")
    .matches(/^\d{10}$/, {
      message: "InvalidNationalID",
    }),
  PhoneNumber: string().required("InputFieldIsRequried"),
  BuildingType: string()
    .transform((val) => (val === null || val === undefined ? "" : val))
    .required("InputFieldIsRequried")
    .oneOf(["1", "2"], "InvalidOption"),
});

export type AddInternalIndividualPermissionProps = InferType<
  typeof AddInternalIndividualPermissionSchema
>;
