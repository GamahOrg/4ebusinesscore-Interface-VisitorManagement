import { FC, useState, } from 'react'
import { useIntl } from 'react-intl'
import PermitData from './PermitData'
import VisitorData from './VisitorData'
import EditGroupDataPopup from '../popup/EditGroupDataPopup'
import { KTSVG } from '@4eplatform/gateway/src/app/helpers'
import AddVisitorPopup from '../popup/AddVisitorPopupA'
import CancelPermitPopupSingle from '../popup/CancelPermitPopupSingle'


export const ViewSinglePermit: FC = () => {
    const intl = useIntl()
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [showAdd, setShowAdd] = useState(false);


    return (
        <>
            <div id="kt_content_container" className="d-flex flex-column-fluid align-items-start container-xxl p-0">
                <div className="content flex-row-fluid" id="kt_content">
                    <div className="flex-lg-row-fluid" data-select2-id="select2-data-129-tmo1">
                        <div className="card mb-5 mb-xl-8">
                            <div className="card-body py-3">
                                <div className='d-flex justify-content-between mt-10 mb-5'>
                                    <div>
                                        <h2 className="text-dark mb-3 fs-2">{intl.formatMessage({ id: 'ViewPermit' })}</h2>
                                        <span className="text-muted fs-6">{intl.formatMessage({ id: 'AllInternalPermitsData' })}</span>
                                    </div>
                                    <div>
                                        <div onClick={() => setShowCancel(true)} className="btn fw-bolder mx-1 text-danger text-center mw-100">
                                            <i className="far fa-times-circle"></i>
                                            {intl.formatMessage({ id: "CancelPermit" })}
                                        </div>
                                        <div className={`btn hover-text-warning fw-bolder mx-1 text-center mw-100 text-hover-warning`}>
                                            <i className="fal fa-star"></i>
                                            {intl.formatMessage({ id: "AddToFavorite" })}
                                        </div>
                                        <div onClick={() => setShowAdd(true)} className="btn fw-bolder mx-1 text-center mw-100">
                                            <i className="fal fa-plus-circle"></i>
                                            {intl.formatMessage({ id: "AddVisitorToThePermit" })}
                                        </div>
                                        <div className="btn btn-primary w-auto fw-bolder mx-1 text-center mw-100">
                                            <span className="svg-icon svg-icon-3 me-2">
                                                <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                                            </span>
                                            {intl.formatMessage({ id: "EditPermit" })}
                                        </div>
                                    </div>
                                </div>
                                <PermitData />
                                <VisitorData />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showEdit && (
                <div className="modal fade" aria-hidden="true">
                    <EditGroupDataPopup
                        show={showEdit}
                        handleClose={() => setShowEdit(false)}

                    />
                </div>
            )}
            {showCancel && (
                <div className="modal fade" aria-hidden="true">
                    <CancelPermitPopupSingle
                        show={showCancel}
                        handleClose={() => setShowCancel(false)}
                    />
                </div>
            )}
            {showAdd && (
                <div className="modal fade" aria-hidden="true">
                    <AddVisitorPopup
                        show={showAdd}
                        handleClose={() => setShowAdd(false)}
                    />
                </div>
            )}
        </>
    )

}