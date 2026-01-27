import { FC, useState } from 'react'
import { useIntl } from 'react-intl'
import PermitData from './PermitData'
import GroupData from './GroupData'
import VisitorsData from './VisiorsData'
import EditGroupDataPopup from '../popup/EditGroupDataPopup'
import CancelPermitPopup from '../popup/CancelPermitPopupSingle'
import AddPermitVisitorPopup from '../popup/AddVisitorPopupA'
import { KTSVG } from '@4eplatform/gateway/src/app/helpers'
import CancelPermitPopupGroup from '../popup/CancelPermitPopupGroup'


const ViewGroupPermit: FC = () => {
    const intl = useIntl();
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
                                <div className='d-flex justify-content-between mt-10 mb-10'>
                                    <div>
                                        <h2 className="text-dark mb-3 fs-2">{intl.formatMessage({ id: 'ViewGroup' })}</h2>
                                        <span className="text-muted fs-6">{intl.formatMessage({ id: 'AllGroupData' })}</span>
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
                                        <div onClick={() => setShowEdit(true)} className="btn btn-primary fw-bolder mx-1 text-center mw-100">
                                            <span className="svg-icon svg-icon-3 me-2">
                                                <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                                            </span>
                                            {intl.formatMessage({ id: "EditGroupData" })}
                                        </div>
                                    </div>
                                </div>
                                <GroupData />
                                <VisitorsData />
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
                    <CancelPermitPopupGroup
                        show={showCancel}
                        handleClose={() => setShowCancel(false)}
                    />
                </div>
            )}
            {showAdd && (
                <div className="modal fade" aria-hidden="true">
                    <AddPermitVisitorPopup
                        show={showAdd}
                        handleClose={() => setShowAdd(false)}
                    />
                </div>
            )}
        </>
    )
}

export default ViewGroupPermit