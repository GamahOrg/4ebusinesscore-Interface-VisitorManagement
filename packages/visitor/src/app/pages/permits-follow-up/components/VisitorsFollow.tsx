import { useState } from "react";
import { FC } from 'react'
import { useIntl } from "react-intl";

const VisitorsFollow: FC<{ tabName: string }> = ({}) => {
    const intl = useIntl();

    const [StatementType, setStatementType] = useState([]);
    const StatementTypeOptions = [
        {
            id: 1,
            name: "محمد عماد الدين عبد الظاهر",
        },
        {
            id: 2,
            name: "خالد عبد الله",
        }
    ];
    return (
        <>
            <div className="position-relative mb-6">
                <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className='rounded-circle bg-primary p-2'><i className="fal fa-user d-block text-white text-center"></i></div>
                </div>
                <div className="row">
                    <div className="w-25 pt-2 me-10">
                        <select
                            id="ChooseTransactions"
                            className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                            data-placeholder="اختر"
                            tabIndex={-1}
                            aria-hidden="true"
                            value={StatementType}

                        >
                            {StatementTypeOptions.map((option) => (
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>

            <div className="position-relative">
                <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className='rounded-circle  bg-light-primary p-2'><i className="fal fa-calendar-day d-block text-primary text-center"></i></div>
                    <div className="h-100 border-primary mx-auto mt-3" style={{
                        border: '1px dashed #000',
                        width: '1px',
                    }}></div>
                </div>
                <div className="card   p-6 mb-7 me-10 ">
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="text-dark-400 fw-bold  fs-5"> {intl.formatMessage({ id: "EntryData" })} :
                                <span className="px-2 text-primary fw-bold">(الثلاثاء| 28 يناير 2022 )</span>
                            </p>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualEntryTime" })} :
                                <span className="mx-2 text-dark fw-bold">09:00 AM</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualExitTime" })} :
                                <span className="mx-2 text-dark fw-bold">10:50 AM</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-relative">
                <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className='rounded-circle  bg-light-primary p-2'><i className="fal fa-calendar-day d-block text-primary text-center"></i></div>
                    <div className="h-100 border-primary mx-auto mt-3" style={{
                        border: '1px dashed #000',
                        width: '1px',
                    }}></div>
                </div>
                <div className="card   p-6 mb-7 me-10 ">
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="text-dark-400 fw-bold  fs-5"> {intl.formatMessage({ id: "EntryData" })} :
                                <span className="px-2 text-primary fw-bold">(الثلاثاء| 28 يناير 2022 )</span>
                            </p>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualEntryTime" })} :
                                <span className="mx-2 text-dark fw-bold">09:00 AM</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualExitTime" })} :
                                <span className="mx-2 text-dark fw-bold">10:50 AM</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-relative">
                <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className='rounded-circle  bg-light-primary p-2'><i className="fal fa-calendar-day d-block text-primary text-center"></i></div>
                    <div className="h-100 border-primary mx-auto mt-3" style={{
                        border: '1px dashed #000',
                        width: '1px',
                    }}></div>
                </div>
                <div className="card   p-6 mb-7 me-10 ">
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="text-dark-400 fw-bold  fs-5"> {intl.formatMessage({ id: "EntryData" })} :
                                <span className="px-2 text-primary fw-bold">(الثلاثاء| 28 يناير 2022 )</span>
                            </p>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualEntryTime" })} :
                                <span className="mx-2 text-dark fw-bold">09:00 AM</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualExitTime" })} :
                                <span className="mx-2 text-dark fw-bold">10:50 AM</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-relative">
                <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className='rounded-circle  bg-light-primary p-2'><i className="fal fa-calendar-day d-block text-primary text-center"></i></div>
                    <div className="h-100 border-primary mx-auto mt-3" style={{
                        border: '1px dashed #000',
                        width: '1px',
                    }}></div>
                </div>
                <div className="card   p-6 mb-7 me-10 ">
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="text-dark-400 fw-bold  fs-5"> {intl.formatMessage({ id: "EntryData" })} :
                                <span className="px-2 text-primary fw-bold">(الثلاثاء| 28 يناير 2022 )</span>
                            </p>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualEntryTime" })} :
                                <span className="mx-2 text-dark fw-bold">09:00 AM</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualExitTime" })} :
                                <span className="mx-2 text-dark fw-bold">10:50 AM</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-relative">
                <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className='rounded-circle  bg-light-primary p-2'><i className="fal fa-calendar-day d-block text-primary text-center"></i></div>
                    <div className="h-100 border-primary mx-auto mt-3" style={{
                        border: '1px dashed #000',
                        width: '1px',
                    }}></div>
                </div>
                <div className="card   p-6 mb-7 me-10 ">
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="text-dark-400 fw-bold  fs-5"> {intl.formatMessage({ id: "EntryData" })} :
                                <span className="px-2 text-primary fw-bold">(الثلاثاء| 28 يناير 2022 )</span>
                            </p>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualEntryTime" })} :
                                <span className="mx-2 text-dark fw-bold">09:00 AM</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualExitTime" })} :
                                <span className="mx-2 text-dark fw-bold">10:50 AM</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-relative">
                <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className='rounded-circle  bg-light-primary p-2'><i className="fal fa-calendar-day d-block text-primary text-center"></i></div>
                    <div className="h-100 border-primary mx-auto mt-3" style={{
                        border: '1px dashed #000',
                        width: '1px',
                    }}></div>
                </div>
                <div className="card   p-6 mb-7 me-10 ">
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="text-dark-400 fw-bold  fs-5"> {intl.formatMessage({ id: "EntryData" })} :
                                <span className="px-2 text-primary fw-bold">(الثلاثاء| 28 يناير 2022 )</span>
                            </p>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualEntryTime" })} :
                                <span className="mx-2 text-dark fw-bold">09:00 AM</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "ActualExitTime" })} :
                                <span className="mx-2 text-dark fw-bold">10:50 AM</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="position-relative">
                <div className="d-flex flex-column justify-content-center position-absolute h-100 top-0 start-10">
                    <div className='rounded-circle  bg-light-primary p-2'><i className="fal fa-pen-alt d-block text-primary text-center"></i></div>
                    <div className="opacity-0 h-100 border-primary mx-auto mt-3" style={{
                        border: '1px dashed #000',
                        width: '1px',
                    }}></div>
                </div>
                <div className="card bg-light  p-6 mb-7 me-10 ">
                    <div className="row">
                        <div className="col-sm-12">
                            <p className="text-dark-400 fw-bold  fs-5"> {intl.formatMessage({ id: "PermitCreated" })} :
                                <span className="px-2 text-gray-400 fw-bold">(داخلي)</span>
                            </p>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "PermitCreator" })} :
                                <span className="mx-2 text-dark fw-bold">محمد جمال عرابي</span>
                            </p>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400"> {intl.formatMessage({ id: "Date" })} :
                                <span className="mx-2 text-dark fw-bold">الاثنين | 10:30 | 25 يناير</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VisitorsFollow