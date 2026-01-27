import { object, string, InferType, number, boolean, array } from "yup";
let phoneRegex = /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

export const AddInternalGroupPermissionSchema = object({
  stepNumber: number(),
  isAddForTable: boolean(),
  groupName: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber, isAddForTable) => stepNumber === 0 && isAddForTable,
    then: string().required("InputFieldIsRequried"),
  }),
  visitorName: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber, isAddForTable) => stepNumber === 0 && isAddForTable,
    then: string().required("InputFieldIsRequried"),
  }),
  userId: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber, isAddForTable) => stepNumber === 0 && isAddForTable,
    then: string().required("InputFieldIsRequried"),
  }),
  phone: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber, isAddForTable) => stepNumber === 0 && isAddForTable,
    then: string().required("InputFieldIsRequried"),
    // .matches(
    //   /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
    //   "InvalidPhone"
    // ),
  }),
  whatsapp: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber, isAddForTable) => stepNumber === 0 && isAddForTable,
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
    NationalID: string()
    .required("InputFieldIsRequried")
    .matches(/^\d{10}$/, {
      message: "InvalidNationalID",
    }),
  email: string().when(["stepNumber", "isAddForTable"], {
    is: (stepNumber, isAddForTable) => stepNumber === 0 && isAddForTable,
    then: string().required("InputFieldIsRequried"),
  }),
  orgId: string().when("stepNumber", {
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
  startTime: string().required("InputFieldIsRequried").when("stepNumber", {
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
  endTime: string().required("InputFieldIsRequried")
    .when("stepNumber", {
      is: 1,
      then: string().required("InputFieldIsRequried"),
    })
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
});

export type AddInternalGroupPermissionProps = InferType<
  typeof AddInternalGroupPermissionSchema
>;
