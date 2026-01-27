import { object, string, InferType, number, boolean, array } from "yup";
let phoneRegex = /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

export const EditInternalSinglePermissionSchema = object({
  stepNumber: number(),
  visitorName: string().when(["stepNumber"], {
    is: (stepNumber) => stepNumber === 0,
    then: string().required("InputFieldIsRequried").matches(/^[A-Za-z\u0600-\u06FF\s]+$/, "NameIncludsOnlyLetters"),
  }),
  userId: string().when(["stepNumber"], {
    is: (stepNumber) => stepNumber === 0,
    then: string().required("InputFieldIsRequried"),
  }),
  phone: string().when(["stepNumber"], {
    is: (stepNumber) => stepNumber === 0,
    then: string().required("InputFieldIsRequried"),
  }),
  whatsapp: string().when(["stepNumber"], {
    is: (stepNumber) => stepNumber === 0,
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
  nationalId: string().when(["stepNumber"], {
    is: (stepNumber) => stepNumber === 0,
    then: string()
      .required("InputFieldIsRequried")
      .matches(/^\d{10}$/, {
        message: "InvalidNationalID",
      }),
  }),
  email: string().when(["stepNumber"], {
    is: (stepNumber) => stepNumber === 0,
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
  recivedId: string().when("stepNumber", {
    is: 1,
    then: string().required("InputFieldIsRequried"),
  }),
  note: string().when("stepNumber", {
    is: 1,
    then: string().nullable().notRequired(),
  }),
  permissionReason: string().when("stepNumber", {
    is: 1,
    then: string().required("InputFieldIsRequried"),
  }),
  startDate: string().when("stepNumber", {
    is: 1,
    then: string().required("InputFieldIsRequried"),
  }),
  endDate: string().when("stepNumber", {
    is: 1,
    then: string().required("InputFieldIsRequried"),
  }),
  startTime: string().when("stepNumber", {
    is: 1,
    then: string()
      .required("InputFieldIsRequried")
      // .test({
      //   name: "startTime",
      //   message: "StartTimeMustBeBeforeEndTimeForTheSameDay",
      //   test: function (value: any) {
      //     let startDate = this.parent.startDate;
      //     let endDate = this.parent.endDate;
      //     if (
      //       new Date(startDate).setHours(0, 0, 0, 0) ==
      //         new Date(endDate).setHours(0, 0, 0, 0) &&
      //       this.parent.endTime
      //     ) {
      //       return value < this.parent.endTime;
      //     } else {
      //       return true;
      //     }
      //   },
      // }),
  }),
  endTime: string().when("stepNumber", {
    is: 1,
    then: string()
      .required("InputFieldIsRequried")
      // .test({
      //   name: "endTime",
      //   message: "EndTimeMustBeAfterStartTimeForTheSameDay",
      //   test: function (value: any) {
      //     let startDate = this.parent.startDate;
      //     let endDate = this.parent.endDate;
      //     if (
      //       new Date(startDate).setHours(0, 0, 0, 0) ==
      //         new Date(endDate).setHours(0, 0, 0, 0) &&
      //       this.parent.startTime
      //     ) {
      //       return value > this.parent.startTime;
      //     } else {
      //       return true;
      //     }
      //   },
      // }),
  }),
});

export type EditInternalSinglePermissionProps = InferType<
  typeof EditInternalSinglePermissionSchema
>;
