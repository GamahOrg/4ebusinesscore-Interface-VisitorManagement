import { FC, useState } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom';
import { handlePermissionStatus, handlePermissionType } from '../utils/permitApplicationUtil';

interface PermitDataProps {
    singlePermission: any;
}

const VisitorData: FC<PermitDataProps> = ({ singlePermission }) => {
    const intl = useIntl();
    const { id } = useParams();

    return (

        <div className="card bg-light  p-6 mb-7">
            <div className="px-3 mb-1">
                <p className="fw-bolder fs-4">
                    {intl.formatMessage({ id: "VisitorData" })}
                </p>
            </div>
            <div className="card p-6">
                <div className="row align-items-start">
                    <div className="col-lg-10 col-12 order-2 order-lg-1">
                        <div className="row">
                            {singlePermission?.visitorNID ? <div className="col-lg-6 col-12 mb-3">
                                <p className="text-gray-400">{intl.formatMessage({ id: "IDNumber" })}/{intl.formatMessage({ id: "Residence" })} :
                                    <span className="px-2 text-dark fw-bold text-break">{singlePermission?.visitorNID}</span>
                                </p>
                            </div> : ""}

                            {singlePermission?.visitorName ? <div className="col-lg-6 col-12 mb-3">
                                <p className="text-gray-400">{intl.formatMessage({ id: "QuadrupleName" })} :
                                    <span className="px-2 text-dark fw-bold text-break">{singlePermission?.visitorName} </span>
                                </p>
                            </div> : ""}

                            {singlePermission?.visitorPhone ? <div className="col-lg-6 col-12 mb-3">
                                <p className="text-gray-400">{intl.formatMessage({ id: "PhoneNumber" })} :
                                    <span className="px-2 text-dark fw-bold text-break"> {singlePermission?.visitorPhone}</span>
                                </p>
                            </div> : ""}

                            {singlePermission?.visitorEmail ? <div className="col-lg-6 col-12 mb-3">
                                <p className="text-gray-400">{intl.formatMessage({ id: "Email" })} :
                                    <span className="px-2 text-dark fw-bold text-break">{singlePermission?.visitorEmail}</span>
                                </p>
                            </div> : ""}

                            {singlePermission?.visitorWhatsApp ? <div className="col-lg-6 col-12 mb-3">
                                <p className="text-gray-400">{intl.formatMessage({ id: "WhatsAppNumber" })} :
                                    <span className="px-2 text-dark fw-bold text-break"> {singlePermission?.visitorWhatsApp}</span>
                                </p>
                            </div> : ""}

                        </div>
                    </div>
                    <div className="col-lg-2 col-12 order-1 order-lg-2 mb-3 mb-lg-0 d-flex justify-content-lg-end justify-content-start">
                        <div className={`badge fw-bolder d-block fs-6 ${handlePermissionStatus(singlePermission?.permissionStatus)?.className}`} style={{minWidth: '100px', textAlign: 'center'}}>
                            {intl.formatMessage({ id: handlePermissionStatus(singlePermission?.permissionStatus)?.value })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VisitorData