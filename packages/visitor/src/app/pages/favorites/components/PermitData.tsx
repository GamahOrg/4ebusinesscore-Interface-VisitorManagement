import { FC, useState } from "react"
import { useIntl } from 'react-intl'
import { Link } from "react-router-dom"
import { useLocation, useParams } from 'react-router-dom';


const PermitData: FC = () => {
    const intl = useIntl();
    const { id } = useParams();
    let [permitData, setPermitData] = useState([
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
            PermitSource: "خارجي",
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
                    PermitSource: "خارجي",
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
            PermitSource: "خارجي",
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
                    PermitSource: "خارجي",
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
    let permit = undefined;
    if (id !== undefined) {
        permit = permitData.find(permit => permit.id === +id)
    }

    return (
        <div className="card bg-light  p-6 mb-7">
            <div className="px-3 mb-1">
                <p className="fw-bolder fs-4">
                    {intl.formatMessage({ id: "PermitData" })}
                </p>
            </div>
            <div className="row gy-5 p-3">
                <div className="col-lg-6 col-sm-12">
                    <p className="text-gray-400">{intl.formatMessage({ id: "PermitNumber" })} :
                        <span className="mx-1 text-dark fw-bold">{permit?.PermitNumber}</span>
                    </p>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <p className="text-gray-400"> {intl.formatMessage({ id: "VisitReceiver" })} :
                        <span className="mx-2 text-dark fw-bold">{permit?.visitReceiver}</span>
                    </p>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <p className="text-gray-400"> {intl.formatMessage({ id: "AuthorizingAuthority" })} :
                        <span className="mx-2 text-dark fw-bold">{permit?.AuthorizingAuthority}</span>
                    </p>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <p className="text-gray-400"> {intl.formatMessage({ id: "PermitType" })} :
                        <span className=" mx-2 text-dark fw-bold">{permit?.PermitSource}</span>
                    </p>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <p className="text-gray-400"> {intl.formatMessage({ id: "PermitDateStart" })} :
                        <span className="mx-2 text-dark fw-bold">{permit?.PermitDateStart} </span>
                    </p>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <p className="text-gray-400"> {intl.formatMessage({ id: "PermitDateEnd" })} :
                        <span className="mx-2 text-dark fw-bold">{permit?.PermitDateEnd}</span>
                    </p>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <p className="text-gray-400"> {intl.formatMessage({ id: "PermitTimeStart" })} :
                        <span className="mx-2 text-dark fw-bold">{permit?.PermitTimeStart}</span>
                    </p>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <p className="text-gray-400"> {intl.formatMessage({ id: "PermitTimeEnd" })} :
                        <span className="mx-2 text-dark fw-bold">{permit?.PermitTimeEnd}</span>
                    </p>
                </div>
                <div className="card py-3">
                    <div className="row ">
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "PermitRequestDate" })} :
                                <span className="mx-2 text-dark fw-bold">{permit?.PermitRequestDate}</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "PermitCreator" })} :
                                <span className="mx-2 text-dark fw-bold">{permit?.PermitCreator}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card py-3">
                    <p className="text-gray-400"> {intl.formatMessage({ id: "PermitReason" })} </p>
                    <p>{intl.formatMessage({ id: "Description2" })}</p>
                </div>
                <div className="card py-3">
                    <p className="text-gray-400"> {intl.formatMessage({ id: "Attachments" })} : <Link to={"#"}>Documents</Link> </p>

                </div>
                <div className="card py-3">
                    <p className="text-gray-400"> {intl.formatMessage({ id: "Notes" })} </p>
                    <p>{intl.formatMessage({ id: "Description2" })}</p>
                </div>


            </div>
        </div>
    )
}

export default PermitData