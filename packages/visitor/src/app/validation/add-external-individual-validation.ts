import { object, string, InferType, number } from "yup";
let phoneRegex = /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

export const AddExternalIndividualPermissionSchema = object({
  stepNumber: number(),
  VisitorName: string().required("InputFieldIsRequried"),
  Email: string()
    .required("InputFieldIsRequried")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "InvalidEmail"
    ),
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
  PermitTypeId: string().required("InputFieldIsRequried"),
  OrgId: string().required("InputFieldIsRequried"),
  // RecivedId: string().required("InputFieldIsRequried"),
  // Note: string().required("InputFieldIsRequried"),
  PermissionReason: string().nullable().notRequired(),
  // StartDate: string().required("InputFieldIsRequried"),
  // EndDate: string().required("InputFieldIsRequried"),
  // StartTime: string()
  //   .required("InputFieldIsRequried")
  //   .test({
  //     name: "StartTime",
  //     message: "StartTimeMustBeBeforeEndTimeForTheSameDay",
  //     test: function (value: any) {
  //       let startDate = this.parent.StartDate;
  //       let endDate = this.parent.EndDate;
  //       if (
  //         new Date(startDate).setHours(0, 0, 0, 0) ==
  //           new Date(endDate).setHours(0, 0, 0, 0) &&
  //         this.parent.EndTime
  //       ) {
  //         return value < this.parent.EndTime;
  //       } else {
  //         return true;
  //       }
  //     },
  //   }),
  // EndTime: string()
  //   .required("InputFieldIsRequried")
  //   .test({
  //     name: "EndTime",
  //     message: "EndTimeMustBeAfterStartTimeForTheSameDay",
  //     test: function (value: any) {
  //       let startDate = this.parent.StartDate;
  //       let endDate = this.parent.EndDate;
  //       if (
  //         new Date(startDate).setHours(0, 0, 0, 0) ==
  //           new Date(endDate).setHours(0, 0, 0, 0) &&
  //         this.parent.StartTime
  //       ) {
  //         return value > this.parent.StartTime;
  //       } else {
  //         return true;
  //       }
  //     },
  //   }),
    StartDateTime: string()
      .required("InputFieldIsRequried")
      .test({
        name: "StartDateTimeSameDay",
        message: "StartTimeMustBeBeforeEndTimeForTheSameDay",
        test: function (value: any) {
          const endDateTime = this.parent.EndDateTime;
          if (!value || !endDateTime) return true;
          const [startDate, startTime] = value.split("T");
          const [endDate, endTime] = endDateTime.split("T");
          if (
            new Date(startDate).setHours(0, 0, 0, 0) ===
            new Date(endDate).setHours(0, 0, 0, 0)
          ) {
            return startTime < endTime;
          }
          return true;
        },
      })
      .test({
        name: "StartDateTimeWithin24Hours",
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
      message: "TheNationalIdMustConsistOf10Digits",
    }),
  // PhoneNumber: string()
  //   .required("InputFieldIsRequried")
  //   .matches(
  //     /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
  //     "InvalidPhone"
  //   ),
  PhoneNumber: string()
  .required("InputFieldIsRequried")
  .matches(
    /^5(5|0|3|6|4|9|1|8|7)[0-9]{7}$/,
    "InvalidPhone"
  ),
    CarType: string().when("stepNumber", {
      is: 2, 
      then: string().required("InputFieldIsRequried"),   
    }),
    CarPlateData: string().when("stepNumber", {
      is: 2,
      then: string().required("InputFieldIsRequried"),
    }),
    CarColor: string().when("stepNumber", {
      is: 2,
      then:string().required("InputFieldIsRequried"),
    }),
    CarModel:string().nullable().notRequired(),
    Duration:string().nullable().notRequired(),





});

export type AddExternalIndividualPermissionProps = InferType<
  typeof AddExternalIndividualPermissionSchema
>;
