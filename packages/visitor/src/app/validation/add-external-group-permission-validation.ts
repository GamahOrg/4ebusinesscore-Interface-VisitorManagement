import { object, string, InferType, number, boolean } from "yup";
let phoneRegex = /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

export const AddExternalGroupPermissionSchema = object({
  stepNumber: number(),
  isAddForTable: boolean(),
  visitorName: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber: any, isAddForTable: any) => stepNumber === 0 && isAddForTable,
    then: string().required("InputFieldIsRequried"),
  }),
  BuildingType: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber: any, isAddForTable: any) => stepNumber === 0 && isAddForTable,
    then: string().required("InputFieldIsRequried"),
  }),
  userId: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber: any, isAddForTable: any) => stepNumber === 0 && isAddForTable,
    then: string().required("InputFieldIsRequried"),
  }),
  phone: string().when("stepNumber", {
    is: 0,
    then: string()
      .transform((val) => (val === null || val === undefined ? "" : val))
      .typeError("InputFieldIsRequried")
      .required("InputFieldIsRequried")
      .matches(/^5(5|0|3|6|4|9|1|8|7)[0-9]{7}$/, "InvalidPhone"),
  }),
  whatsapp: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber: any, isAddForTable: any) => stepNumber === 0 && isAddForTable,
    then: string()
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
    }),
  nationalId: string().when("stepNumber",{
    is:0,
    then : string()
  
    .required("InputFieldIsRequried")
    .matches(/^\d{10}$/, 
      "TheNationalIdMustConsistOf10Digits",
      
    ),
  }
),

  email: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber: any, isAddForTable: any) => stepNumber === 0 && isAddForTable,
    then: string()
      .required("InputFieldIsRequried")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "InvalidEmail"
      ),
  }),
  orgId: string().when("stepNumber", {
    is: 1,
    then: string().required("InputFieldIsRequried"),
  }),
  permitTypeId: string().when("stepNumber", {
    is: 1,
    then: string().required("InputFieldIsRequried"),
  }),
  recivedId: string().when("stepNumber", {
    is: 1,
    then: string().notRequired().nullable(),
  }),
  note: string().when("stepNumber", {
    is: 1,
    then: string().notRequired().nullable(),
  }),
  permissionReason: string().nullable().notRequired(),
  startDate: string().required("InputFieldIsRequried"),
  endDate: string().required("InputFieldIsRequried"),
  startTime: string().required("InputFieldIsRequried"),
  endTime: string().required("InputFieldIsRequried"),
  StartDateTime: string()
    .required("InputFieldIsRequried")
    .test({
      name: "StartDateTimeWindowGroup",
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
      name: "EndDateTimeWindowGroup",
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
  groupName: string().when("stepNumber", {
    is: 1,
    then: string().required("InputFieldIsRequried"),
  }),
});

export type AddExternalGroupPermissionProps = InferType<
  typeof AddExternalGroupPermissionSchema
>;