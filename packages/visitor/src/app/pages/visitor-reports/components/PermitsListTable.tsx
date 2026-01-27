import { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import PermitsListTableRowGenrator from "./PermitsListTableRowGenrator";
import { ExportDropDown } from "@4eplatform/shared/src/popups/ExportDropDown";
export function PermitsListTable() {
  const intl = useIntl();

  const [permitData, setPermitData] = useState([
    {
      id: 1,
      GroupNumber: "______",
      PermitNumber: "#7534769",
      IDNumber: "840509-7890-1",
      VisitorName: "محمود عبد الظاهر",
      WhatsAppNumber: "#966 874 3673 289",
      Email: "mahmoud2564@gmail.com",
      Number: "( 1 )",
      PermitReason: "زيارة شخصية",
      AuthorizingAuthority: "ادارة المعرفة",
      PermitSource: "داخلي",
      visitReceiver: "جمال محمد علام",
      PermitCreator: "محمد عبداللة خالد",
      PermitRequestDate: "08-01-2024",
      PermitDateStart: "08-02-2024",
      PermitDateEnd: "012-02-2024",
      PermitTimeStart: "08-02-2024",
      PermitTimeEnd: "012-02-2024",
      PermitStatus: "موافقة",
      Options: "Person",
    },
    {
      id: 2,
      GroupNumber: "______",
      PermitNumber: "#7534769",
      IDNumber: "840509-7890-1",
      VisitorName: "محمد عبداللة خالد",
      WhatsAppNumber: "+966 874 3673 289",
      Email: "khaled256@gmail.com",
      Number: "( 1 )",
      PermitReason: "تصريح عمل",
      AuthorizingAuthority: "ادارة المنشات العمرانية",
      PermitSource: "دخول",
      visitReceiver: "جمال محمد علام",
      PermitCreator: "محمد عبداللة خالد",
      PermitRequestDate: "08-01-2024",
      PermitDateStart: "08-02-2024",
      PermitDateEnd: "012-02-2024",
      PermitTimeStart: "08-02-2024",
      PermitTimeEnd: "012-02-2024",
      PermitStatus: "سارية",
      Options: "Person",
    },
    {
      id: 3,
      GroupNumber: "#7534769",
      PermitNumber: "#7534769",
      IDNumber: "840509-7890-1",
      VisitorName: "جمال شحاتة علام",
      WhatsAppNumber: "+966 874 3673 289",
      Email: "allam7845@gmail.com",
      Number: "( 4 )",
      PermitReason: "تصريح عمل",
      AuthorizingAuthority: "الأدارة المالية",
      PermitSource: "دخول",
      visitReceiver: "جمال محمد علام",
      PermitCreator: "محمد عبداللة خالد",
      PermitRequestDate: "08-01-2024",
      PermitDateStart: "08-02-2024",
      PermitDateEnd: "012-02-2024",
      PermitTimeStart: "08-02-2024",
      PermitTimeEnd: "012-02-2024",
      PermitStatus: "منتهية",
      Options: "Group",
      clicked: false,
      Persons: [
        {
          id: 3.1,
          GroupNumber: "______",
          PermitNumber: "#7534769",
          IDNumber: "840509-7890-1",
          VisitorName: "محمد عبداللة خالد",
          WhatsAppNumber: "+966 874 3673 289",
          Email: "khaled007@gmail.com",
          Number: "( 1 )",
          PermitReason: "تصريح عمل",
          AuthorizingAuthority: "ادارة المعرفة",
          PermitSource: "داخلي",
          visitReceiver: "جمال محمد علام",
          PermitCreator: "محمد عبداللة خالد",
          PermitRequestDate: "08-01-2024",
          PermitDateStart: "08-02-2024",
          PermitDateEnd: "012-02-2024",
          PermitTimeStart: "08-02-2024",
          PermitTimeEnd: "012-02-2024",
          PermitStatus: "منتهية",
          Options: "Person",
        },
        {
          id: 3.2,
          GroupNumber: "______",
          PermitNumber: "#7534769",
          IDNumber: "840509-7890-1",
          VisitorName: "فهد جميل التهامي",
          WhatsAppNumber: "+966 874 3673 289",
          Email: "fahd268@gmail.com",
          Number: "( 1 )",
          PermitReason: "تصريح عمل",
          AuthorizingAuthority: "ادارة المرافق",
          PermitSource: "دخول",
          visitReceiver: "جمال محمد علام",
          PermitCreator: "محمد عبداللة خالد",
          PermitRequestDate: "08-01-2024",
          PermitDateStart: "08-02-2024",
          PermitDateEnd: "012-02-2024",
          PermitTimeStart: "08-02-2024",
          PermitTimeEnd: "012-02-2024",
          PermitStatus: "منتهية",
          Options: "Person",
        },
        {
          id: 3.3,
          GroupNumber: "______",
          PermitNumber: "#7534769",
          IDNumber: "840509-7890-1",
          VisitorName: "حسن عبدالله",
          WhatsAppNumber: "+966 874 3673 289",
          Email: "abdullah50@gmail.com",
          Number: "( 1 )",
          PermitReason: "زيارة شخصية",
          AuthorizingAuthority: "إدارة التدريب",
          PermitSource: "داخلي",
          visitReceiver: "جمال محمد علام",
          PermitCreator: "محمد عبداللة خالد",
          PermitRequestDate: "08-01-2024",
          PermitDateStart: "08-02-2024",
          PermitDateEnd: "012-02-2024",
          PermitTimeStart: "08-02-2024",
          PermitTimeEnd: "012-02-2024",
          PermitStatus: "منتهية",
          Options: "Person",
        },
      ],
    },
    {
      id: 4,
      GroupNumber: "______",
      PermitNumber: "#7534769",
      IDNumber: "840509-7890-1",
      VisitorName: "جمال الدين مرجان",
      WhatsAppNumber: "+966 874 3673 289",
      Email: "mourgan465@gmail.com",
      Number: "( 1 )",
      PermitReason: "زيارة شخصية",
      AuthorizingAuthority: "الأمن السيبراني",
      PermitSource: "دخول",
      visitReceiver: "جمال محمد علام",
      PermitCreator: "محمد عبداللة خالد",
      PermitRequestDate: "08-01-2024",
      PermitDateStart: "08-02-2024",
      PermitDateEnd: "012-02-2024",
      PermitTimeStart: "08-02-2024",
      PermitTimeEnd: "012-02-2024",
      PermitStatus: "منتهية",
      Options: "Person",
    },
    {
      id: 5,
      GroupNumber: "#7534769",
      PermitNumber: "#7534769",
      IDNumber: "840509-7890-1",
      VisitorName: "محمد صلاح",
      WhatsAppNumber: "+966 874 3673 289",
      Email: "mosalah22@gmail.com",
      Number: "( 2 )",
      PermitReason: "تصريح عمل",
      AuthorizingAuthority: "إدارة تقنية المعلومات",
      PermitSource: "داخلي",
      visitReceiver: "جمال محمد علام",
      PermitCreator: "محمد عبداللة خالد",
      PermitRequestDate: "08-01-2024",
      PermitDateStart: "08-02-2024",
      PermitDateEnd: "012-02-2024",
      PermitTimeStart: "08-02-2024",
      PermitTimeEnd: "012-02-2024",
      PermitStatus: "ملغية",
      Options: "Group",
      clicked: false,
      Persons: [
        {
          id: 5.1,
          GroupNumber: "______",
          PermitNumber: "#7534769",
          IDNumber: "840509-7890-1",
          VisitorName: "محمود حسن",
          WhatsAppNumber: "+966 874 3673 289",
          Email: "mahmodhasan@gmail.com",
          Number: "( 1 )",
          PermitReason: "تصريح عمل",
          AuthorizingAuthority: "ادارة المشتريات والعقود",
          PermitSource: "دخول",
          visitReceiver: "جمال محمد علام",
          PermitCreator: "محمد عبداللة خالد",
          PermitRequestDate: "08-01-2024",
          PermitDateStart: "08-02-2024",
          PermitDateEnd: "012-02-2024",
          PermitTimeStart: "08-02-2024",
          PermitTimeEnd: "012-02-2024",
          PermitStatus: "ملغية",
          Options: "Person",
        },
        {
          id: 5.2,
          GroupNumber: "______",
          PermitNumber: "#7534769",
          IDNumber: "840509-7890-1",
          VisitorName: "فهد العتيبي",
          WhatsAppNumber: "+966 874 3673 289",
          Email: "fahd47@gmail.com",
          Number: "( 1 )",
          PermitReason: "تصريح عمل",
          AuthorizingAuthority: "ادارة الشؤون المالية",
          PermitSource: "دخول",
          visitReceiver: "جمال محمد علام",
          PermitCreator: "محمد عبداللة خالد",
          PermitRequestDate: "08-01-2024",
          PermitDateStart: "08-02-2024",
          PermitDateEnd: "012-02-2024",
          PermitTimeStart: "08-02-2024",
          PermitTimeEnd: "012-02-2024",
          PermitStatus: "ملغية",
          Options: "Person",
        },
      ],
    },
  ]);
  return (
    <Fragment>
      <div className="detailsCard my-5">
        <div className="card-xl-stretch mb-xl-8">
          <div className="card-title">
            <div className="d-flex justify-content-between flex-wrap align-items-center ">
              <div className="d-flex justify-content-between w-50">
                <div className="">
                  <label className="form-label fs-6 fw-bold">
                    {intl.formatMessage({ id: "TypeOfReport" })}
                  </label>
                  <select
                    className="form-select form-select-solid fw-bolder min-w-200px"
                    data-kt-select2="true"
                    data-placeholder="Select option"
                    data-allow-clear="true"
                    data-kt-user-table-filter="role"
                    data-hide-search="true"
                  >
                    <option value="">
                      {intl.formatMessage({ id: "TypeOfReport" })}
                    </option>
                    <option value="">نوع 1</option>
                    <option value="">نوع 2</option>
                    <option value="">نوع 3</option>
                  </select>
                </div>
                <div className="mx-3 ">
                  <label
                    htmlFor="outputDate"
                    className="form-label px-2  fontSz-6"
                  >
                    {intl.formatMessage({ id: "From" })}
                  </label>
                  <input
                    id="outputDate"
                    type="date"
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 min-w-200px"
                    placeholder={intl.formatMessage({ id: "From" })}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="outputDate"
                    className="form-label px-2  fontSz-6"
                  >
                    {intl.formatMessage({ id: "To" })}
                  </label>
                  <input
                    id="outputDate"
                    type="date"
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 min-w-200px"
                    placeholder={intl.formatMessage({ id: "To" })}
                  />
                </div>
              </div>
              <ExportDropDown />
            </div>
          </div>
          <div className="card-body py-3">
            <div className={`tab-pane fade show`} id="kt_tab_project_tasks">
              <div className="table-responsive mb-3">
                <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
                  <thead>
                    <tr className="fw-bolder projectSecColor">
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted"></th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "GroupNumber" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitNumber" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "VisitorName" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                        {intl.formatMessage({ id: "Number" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitReason" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "AuthorizingAuthority" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitSource" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "VisitReceiver" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitStatus" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                        {intl.formatMessage({ id: "Options" })}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {permitData.map((permit) => (
                      <>
                        <tr key={permit.id}>
                          <PermitsListTableRowGenrator
                            permit={permit}
                            setPermitData={setPermitData}
                          />
                        </tr>
                        {permit.Options === "Group" && permit?.clicked ? (
                          <>
                            {permit.Options === "Group" &&
                            Array.isArray(permit.Persons) ? (
                              <>
                                {permit.Persons.map((person: any) => (
                                  <tr key={person.id}>
                                    <PermitsListTableRowGenrator
                                      permit={person}
                                    />
                                  </tr>
                                ))}
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="Rega_modal_Create_New_Classification"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
      ></div>
    </Fragment>
  );
}
