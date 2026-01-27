import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Fragment, useState } from "react";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { RiFilter2Fill } from "react-icons/ri";
import { FilteringPopup } from "./FilteringPopup";
import VisitorsTable from './VisitorsTable';

const VisitorsData: FC = () => {
    const intl = useIntl();
    const [showFilter, setShowFilter] = useState(false);
    const handleCloseFilter = () => setShowFilter(false);
    let [permitData, setPermitData] = useState([
        {
            id: 1,
            GroupNumber: "______",
            PermitNumber: "#7534769",
            VisitorName: "محمود عبد الظاهر",
            WhatsAppNumber: "#966 874 3673 289",
            Number: "( 1 )",
            PermitReason: "زيارة شخصية",
            AuthorizingAuthority: "ادارة المعرفة",
            PermitSource: "داخلي",
            visitReceiver: "جمال محمد علام",
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
            VisitorName: "محمد عبداللة خالد",
            WhatsAppNumber: "+966 874 3673 289",
            Number: "( 1 )",
            PermitReason: "تصريح عمل",
            AuthorizingAuthority: "ادارة المنشات العمرانية",
            PermitSource: "دخول",
            visitReceiver: "جمال محمد علام",
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
            VisitorName: "جمال شحاتة علام",
            WhatsAppNumber: "+966 874 3673 289",
            Number: "( 4 )",
            PermitReason: "تصريح عمل",
            AuthorizingAuthority: "الأدارة المالية",
            PermitSource: "خارجي",
            visitReceiver: "جمال محمد علام",
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
                    VisitorName: "محمد عبداللة خالد",
                    WhatsAppNumber: "+966 874 3673 289",
                    Number: "( 1 )",
                    PermitReason: "تصريح عمل",
                    AuthorizingAuthority: "ادارة المعرفة",
                    PermitSource: "داخلي",
                    visitReceiver: "جمال محمد علام",
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
                    VisitorName: "فهد جميل التهامي",
                    WhatsAppNumber: "+966 874 3673 289",
                    Number: "( 1 )",
                    PermitReason: "تصريح عمل",
                    AuthorizingAuthority: "ادارة المرافق",
                    PermitSource: "خارجي",
                    visitReceiver: "جمال محمد علام",
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
                    VisitorName: "حسن عبداللة",
                    WhatsAppNumber: "+966 874 3673 289",
                    Number: "( 1 )",
                    PermitReason: "زيارة شخصية",
                    AuthorizingAuthority: "إدارة التدريب",
                    PermitSource: "داخلي",
                    visitReceiver: "جمال محمد علام",
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
            VisitorName: "جمال الدين مرجان",
            WhatsAppNumber: "+966 874 3673 289",
            Number: "( 1 )",
            PermitReason: "زيارة شخصية",
            AuthorizingAuthority: "الأمن السيبراني",
            PermitSource: "خارجي",
            visitReceiver: "جمال محمد علام",
            PermitDateStart: "08-02-2024",
            PermitDateEnd: "012-02-2024",
            PermitTimeStart: "08-02-2024",
            PermitTimeEnd: "012-02-2024",
            PermitStatus: "منتهية",
            Options: "Person",
        },
        {
            id: 3,
            GroupNumber: "#7534769",
            PermitNumber: "#7534769",
            VisitorName: "محمد صلاح",
            WhatsAppNumber: "+966 874 3673 289",
            Number: "( 3 )",
            PermitReason: "تصريح عمل",
            AuthorizingAuthority: "إدارة تقنية المعلومات",
            PermitSource: "داخلي",
            visitReceiver: "جمال محمد علام",
            PermitDateStart: "08-02-2024",
            PermitDateEnd: "012-02-2024",
            PermitTimeStart: "08-02-2024",
            PermitTimeEnd: "012-02-2024",
            PermitStatus: "مرفوضة",
            Options: "Group",
            clicked: false,
            Persons: [
                {
                    id: 5.1,
                    GroupNumber: "______",
                    PermitNumber: "#7534769",
                    VisitorName: "محمود حسن",
                    WhatsAppNumber: "+966 874 3673 289",
                    Number: "( 1 )",
                    PermitReason: "تصريح عمل",
                    AuthorizingAuthority: "ادارة المشتريات والعقود",
                    PermitSource: "خارجي",
                    visitReceiver: "جمال محمد علام",
                    PermitDateStart: "08-02-2024",
                    PermitDateEnd: "012-02-2024",
                    PermitTimeStart: "08-02-2024",
                    PermitTimeEnd: "012-02-2024",
                    PermitStatus: "مرفوضة",
                    Options: "Person",
                },
                {
                    id: 5.2,
                    GroupNumber: "______",
                    PermitNumber: "#7534769",
                    VisitorName: "فهد العتيبي",
                    WhatsAppNumber: "+966 874 3673 289",
                    Number: "( 1 )",
                    PermitReason: "تصريح عمل",
                    AuthorizingAuthority: "ادارة الشؤون المالية",
                    PermitSource: "دخول",
                    visitReceiver: "جمال محمد علام",
                    PermitDateStart: "08-02-2024",
                    PermitDateEnd: "012-02-2024",
                    PermitTimeStart: "08-02-2024",
                    PermitTimeEnd: "012-02-2024",
                    PermitStatus: "مرفوضة",
                    Options: "Person",
                },

            ],
        },
    ]);
    return (
        <>
            <div className="card  p-6 mb-7">
                <div className="px-3 mb-1">
                    <p className="fw-bolder fs-4">
                        {intl.formatMessage({ id: "VisitorsData" })}
                    </p>
                </div>
                <Fragment>
                    <div className="detailsCard my-5">
                        <div className="card-xl-stretch mb-xl-8">
                            <div className="card-title">
                                <div className="d-flex justify-content-between  align-content-center flex-wrap  ">
                                    <div className="d-flex align-items-center position-relative my-1">
                                        <span
                                            className={`svg-icon svg-icon-1 position-absolute ${getCurrentSystemLanguage() == "ar" ? "me-6" : "ms-6"
                                                }`}
                                        >
                                            <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                                        </span>
                                        <input
                                            type="text"
                                            data-kt-filemanager-table-filter="search"
                                            className={`form-control form-control-solid w-250px ${getCurrentSystemLanguage() === "ar" ? "pe-15" : "ps-15"
                                                }`}
                                            placeholder={intl.formatMessage({
                                                id: "SearchInThePermits",
                                            })}
                                        />
                                    </div>
                                    <div
                                        className="btn w-auto btn-custom text-white btn-flex   fw-bolder"
                                        style={{ backgroundColor: "#A1A5B7" }}
                                        onClick={() => setShowFilter(true)}

                                    >
                                        <RiFilter2Fill size={17} className="me-3 text-white" />{" "}
                                        {intl.formatMessage({ id: "Filtering" })}
                                    </div>
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
                                                            <VisitorsTable
                                                                permit={permit}
                                                                setPermitData={setPermitData}
                                                            />
                                                        </tr>
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
                    >
                        <FilteringPopup showAdd={showFilter} handleClose={handleCloseFilter} />
                    </div>
                </Fragment>

            </div>
        </>


    )
}

export default VisitorsData