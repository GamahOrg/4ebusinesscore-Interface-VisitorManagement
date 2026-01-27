import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { EmployeeHierarchyPopup } from "@4eplatform/shared/src/popups/EmployeeHierarchyPopup";
import { SystemPagination } from "@4eplatform/shared/src/popups/SystemPagination";
import { FC, useState } from "react";
import { useIntl } from "react-intl";


const GroupVisitorData: FC = () => {
    const intl = useIntl();

    const [modalHShow, setModalHShow] = useState<boolean>(false);
    const [modalAddShow, setModalAddShow] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState(false);
    const tableData = [
        {
            visitorName: "محمد احمد علي",
            idNumber: "11",
            phone: "23265596595",
            whatsappNumber: "0125897624",
            email: "example1@example.com",
        },
        {
            visitorName: "محمد علي",
            idNumber: "15",
            phone: "23265596595",
            whatsappNumber: "025994611264",
            email: "example2@example.com",
        },
        {
            visitorName: "محمد احمد علي",
            idNumber: "23",
            phone: "2326559659",
            whatsappNumber: "23265596595",
            email: "example3@example.com",
        },
    ];
    return (
        <>
            <div className="row my-8">

                <div className="col-sm-4 col-12">
                    <label className="fs-6 fw-bold mb-2" htmlFor="classNameification">
                        {intl.formatMessage({ id: "VisitorName" })}{" "}
                    </label>

                    <div className="input-group ">
                        <input
                            className="form-control"
                            placeholder={intl.formatMessage({
                                id: "VisitorName",
                            })}
                        />
                        <div className="h-110 d-flex" role="button">
                            <span
                                className="input-group-text"
                                onClick={() => setModalHShow(true)}
                            >
                                <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 col-12">
                    <label className="mb-2">
                        <span>{intl.formatMessage({ id: "IDNumber" })}</span>
                    </label>
                    <div className="input-group mt-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="special fas fa-file-signature "></i>
                            </span>
                        </div>
                        <input
                            className="form-control form-control-solid"
                            type="number"
                            name="IDNumber"
                            placeholder={intl.formatMessage({ id: "IDNumber" })}
                        />
                    </div>
                </div>
                <div className="col-sm-4 col-12">
                    <label className="mb-2">
                        <span>{intl.formatMessage({ id: "Phone" })}</span>
                    </label>
                    <div className="input-group mt-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa-solid fa-phone special"></i>
                            </span>
                        </div>
                        <input
                            className="form-control form-control-solid"
                            type="number"
                            name="Phone"
                            placeholder={intl.formatMessage({ id: "Phone" })}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 col-12">
                    <label className="mb-2">
                        <span>{intl.formatMessage({ id: "WhatsAppNumber" })}</span>
                    </label>
                    <div className="input-group mt-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa-brands fa-whatsapp special"></i>
                            </span>
                        </div>
                        <input
                            className="form-control form-control-solid"
                            type="number"
                            name="WhatsAppNumber"
                            placeholder={intl.formatMessage({ id: "WhatsAppNumber" })}
                        />
                    </div>
                </div>
                <div className="col-sm-4 col-12">
                    <label className="mb-2">
                        <span>{intl.formatMessage({ id: "Email" })}</span>
                    </label>
                    <div className="input-group mt-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="far fa-envelope special"></i>
                            </span>
                        </div>
                        <input
                            className="form-control form-control-solid"
                            type="email"
                            name="Email"
                            placeholder={intl.formatMessage({ id: "Email" })}
                        />
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-7  mb-7 mt-10">
                <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
                    <div className="d-flex justify-content-end align-items-center w-50">

                        <div
                            className="btn btn-success mx-1 text-center"
                            onClick={(e) => {
                                e.preventDefault()
                                setModalAddShow(true)
                            }
                            }
                        >
                            {intl.formatMessage({ id: "Add" })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-responsive py-5">
                <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
                    <thead>
                        <tr className="fw-bolder text-muted">
                            <th className="px-2 pb-3 min-w-100px">
                                {intl.formatMessage({
                                    id: "VisitorName",
                                })}
                            </th>
                            <th className="px-2 pb-3 min-w-100px">
                                {" "}
                                {intl.formatMessage({
                                    id: "IDNumber",
                                })}{" "}
                            </th>
                            <th className="px-2 pb-3 min-w-100px">
                                {" "}
                                {intl.formatMessage({
                                    id: "Phone",
                                })}{" "}
                            </th>
                            <th className="px-2 pb-3 min-w-100px">
                                {intl.formatMessage({
                                    id: "WhatsAppNumber",
                                })}{" "}
                            </th>
                            <th className="px-2 pb-3 min-w-100px">
                                {intl.formatMessage({
                                    id: "Email",
                                })}
                            </th>
                            <th className="px-2 pb-3 min-w-100px">
                                {" "}
                                {intl.formatMessage({
                                    id: "TheProcedures",
                                })}{" "}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={index}>
                                <td className="">{item.visitorName}</td>
                                <td className="text-center">{item.idNumber}</td>
                                <td className="text-center">{item.phone}</td>
                                <td className="text-center">{item.whatsappNumber}</td>
                                <td className="text-center">{item.email}</td>
                                <td className="text-center">
                                    <a
                                        onClick={() => setShowDelete(true)}
                                        className="menu-link px-3 text-danger text-muted"
                                    >
                                        <span className="svg-icon svg-icon-3 mx-2">
                                            <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                                        </span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <SystemPagination />
            </div>

            <EmployeeHierarchyPopup
                show={modalHShow}
                handleClose={() => setModalHShow(false)}
            />
            <AddPopup show={modalAddShow} handleClose={() => setModalAddShow(false)} />
            <DeletePopup
                showDelete={showDelete}
                handleCloseDelete={() => setShowDelete(false)}
            />
        </>
    );
};
export { GroupVisitorData };
