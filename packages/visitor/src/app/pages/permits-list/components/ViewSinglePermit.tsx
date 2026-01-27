import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import PermitData from "./PermitData";
import VisitorData from "./VisitorData";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import CancelPermitPopupSingle from "../popup/CancelPermitPopupSingle";
import { Link, useParams } from "react-router-dom";
import { PrintPermitionPopup } from "../popup/print-permition-popup";
import { useDispatch, useSelector } from "react-redux";
import { getGetPermissionByVisitorId } from "../../../redux/permission-slice";
import { RootState } from "../../../redux/store";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { putFavouriteForVisitor } from "../../../redux/permissions-list-slice";
import { useLocation } from "react-router-dom";
import AddInternalVisitorPopup from "../popup/AddInternalVisitorPopup";
import AddExternalVisitorPopup from "../popup/AddExternalVisitorPopup";
import { AddToArchiveForMember } from "../popup/AddToArchiveForMember";
import RenewPermitForMemberPopup from "../popup/RenewPermitForMemberPopup";
import { Dropdown } from 'react-bootstrap';


export const ViewSinglePermit = () => {
  const intl = useIntl();
  const [showCancel, setShowCancel] = useState(false);
  const [showAddInternalVisitor, setShowAddInternalVisitor] = useState(false);
  const [showAddExternalVisitor, setShowAddExternalVisitor] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const { visitorId } = useParams();
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const [showRenew, setShowRenew] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const dispatch = useDispatch();
  const { singlePermission } = useSelector(
    (state: RootState) => state.permission
  );
  useEffect(() => {
    if (visitorId) {
      dispatch(
        getGetPermissionByVisitorId({
          Visitor_id: visitorId,
        }) as any
      );
    }
  }, [visitorId]);
  let handleFavourite = async () => {
    let formData = new FormData();
    formData.append(
      "IsFouvrite",
      !singlePermission?.isFavorite ? "true" : "false"
    );
    formData.append("Visitor_id", visitorId as any);
    try {
      await dispatch(putFavouriteForVisitor(formData) as any).then(
        (res: any) => {
          if (res?.payload?.statusEnum == 3) {
            showSuccessAlert(
              true,
              !singlePermission?.isFavorite
                ? "AddedSuccessfullyToFavourite"
                : "RemovedSuccessfullyFromFavourite",
              intl,
              () => {
                dispatch(
                  getGetPermissionByVisitorId({
                    Visitor_id: visitorId,
                  }) as any
                );
              }
            );
          } else if (res?.payload?.message) {
            showSuccessAlert(false, res?.payload?.message, intl, () => { });
          }
        }
      );
    } catch (error) { }
  };
  return (
    <>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <div className="card mb-5 mb-xl-8">
              <div className="card-body py-3">
                <div className="d-flex justify-content-between mt-10 mb-5">
                  <div>
                    <h2 className="text-dark mb-3 fs-2">
                      {intl.formatMessage({ id: "ViewPermit" })}
                    </h2>
                    <span className="text-muted fs-6">
                      {intl.formatMessage({ id: "AllInternalPermitsData" })}
                    </span>
                  </div>
                  {/* <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      <div className="d-flex align-items-center gap-2">                      <i className="fas fa-cog fs-4"></i>
                        <span> {intl.formatMessage({ id: "Settings" })}</span></div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {singlePermission?.permissionStatus === 2 && (
                        <>
                          <Dropdown.Item
                            onClick={handleFavourite}
                            className="hover-text-warning"
                          >
                            <i
                              className={singlePermission?.isFavorite ? "fas fa-star" : "far fa-star"}
                              style={{ color: singlePermission?.isFavorite ? "yellow" : "" }}
                            ></i>
                            <span className="ms-2">{intl.formatMessage({ id: "AddToFavorite" })}</span>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => setShowPrint(true)}>
                            <i className="fas fa-print"></i>
                            <span className="ms-2">{intl.formatMessage({ id: "PrintPermit" })}</span>
                          </Dropdown.Item>
                        </>
                      )}

                      {singlePermission?.permissionStatus === 1 && (
                        <>
                          {singlePermission?.isCanceled === false && (
                            <Dropdown.Item
                              onClick={() => setShowCancel(true)}
                              className="text-danger"
                            >
                              <i className="far fa-times-circle"></i>
                              <span className="ms-2">{intl.formatMessage({ id: "CancelPermit" })}</span>
                            </Dropdown.Item>
                          )}
                          <Dropdown.Item
                            onClick={handleFavourite}
                            className="hover-text-warning"
                          >
                            <i
                              className={singlePermission?.isFavorite ? "fas fa-star" : "far fa-star"}
                              style={{ color: singlePermission?.isFavorite ? "yellow" : "" }}
                            ></i>
                            <span className="ms-2">{intl.formatMessage({ id: "AddToFavorite" })}</span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              if (singlePermission?.permissionSource === 0) {
                                setShowAddInternalVisitor(true);
                              } else if (singlePermission?.permissionSource === 1) {
                                setShowAddExternalVisitor(true);
                              }
                            }}
                          >
                            <i className="fal fa-plus-circle"></i>
                            <span className="ms-2">{intl.formatMessage({ id: "AddVisitorToThePermit" })}</span>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => setShowPrint(true)}>
                            <i className="fas fa-print"></i>
                            <span className="ms-2">{intl.formatMessage({ id: "PrintPermit" })}</span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to={
                              singlePermission?.permissionSource === 0
                                ? `/permits-list/edit-internal-permit/single/${singlePermission?.visitorId}`
                                : `/permits-list/edit-external-permit/single/${singlePermission?.visitorId}`
                            }
                            state={{ cardName, serviceName }}
                            className="btn-primary"
                          >
                            <span className="svg-icon svg-icon-3 me-2">
                              <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                            </span>
                            {intl.formatMessage({ id: "EditPermit" })}
                          </Dropdown.Item>
                        </>
                      )}

                      {singlePermission?.permissionStatus === 4 && (
                        <>
                          <Dropdown.Item
                            onClick={() => setShowRenew(true)}
                            className="text-success"
                          >
                            <i className="fas fa-sync"></i>
                            <span className="ms-2">{intl.formatMessage({ id: "RenewPermit" })}</span>
                          </Dropdown.Item>
                          {singlePermission?.isArchive === false && (
                            <Dropdown.Item onClick={() => setShowArchive(true)}>
                              <i className="fal fa-archive"></i>
                              <span className="ms-2">{intl.formatMessage({ id: "AddToArchive" })}</span>
                            </Dropdown.Item>
                          )}
                          <Dropdown.Item
                            onClick={() => {
                              if (singlePermission?.permissionSource === 0) {
                                setShowAddInternalVisitor(true);
                              } else if (singlePermission?.permissionSource === 1) {
                                setShowAddExternalVisitor(true);
                              }
                            }}
                          >
                            <i className="fal fa-plus-circle"></i>
                            <span className="ms-2">{intl.formatMessage({ id: "AddVisitorToThePermit" })}</span>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => setShowPrint(true)}>
                            <i className="fas fa-print"></i>
                            <span className="ms-2">{intl.formatMessage({ id: "PrintPermit" })}</span>
                          </Dropdown.Item>
                        </>
                      )}

                      {singlePermission?.permissionStatus === 3 && (
                        <>
                          <Dropdown.Item
                            onClick={handleFavourite}
                            className="hover-text-warning"
                          >
                            <i
                              className={singlePermission?.isFavorite ? "fas fa-star" : "far fa-star"}
                              style={{ color: singlePermission?.isFavorite ? "yellow" : "" }}
                            ></i>
                            <span className="ms-2">{intl.formatMessage({ id: "AddToFavorite" })}</span>
                          </Dropdown.Item>
                          {singlePermission?.isArchive === false && (
                            <Dropdown.Item onClick={() => setShowArchive(true)}>
                              <i className="fal fa-archive"></i>
                              <span className="ms-2">{intl.formatMessage({ id: "AddToArchive" })}</span>
                            </Dropdown.Item>
                          )}
                          <Dropdown.Item onClick={() => setShowPrint(true)}>
                            <i className="fas fa-print"></i>
                            <span className="ms-2">{intl.formatMessage({ id: "PrintPermit" })}</span>
                          </Dropdown.Item>
                        </>
                      )}

                      {singlePermission?.permissionStatus === 5 && singlePermission?.isArchive === false && (
                        <Dropdown.Item onClick={() => setShowArchive(true)}>
                          <i className="fal fa-archive"></i>
                          <span className="ms-2">{intl.formatMessage({ id: "AddToArchive" })}</span>
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>
                <PermitData singlePermission={singlePermission} />
                <VisitorData singlePermission={singlePermission} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPrint && (
        <div className="modal fade" aria-hidden="true">
          <PrintPermitionPopup
            showAdd={showPrint}
            handleClose={() => setShowPrint(false)}
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
      {showAddInternalVisitor && (
        <div className="modal fade" aria-hidden="true">
          <AddInternalVisitorPopup
            show={showAddInternalVisitor}
            handleClose={() => setShowAddInternalVisitor(false)}
          />
        </div>
      )}
      {showAddExternalVisitor && (
        <div className="modal fade" aria-hidden="true">
          <AddExternalVisitorPopup
            show={showAddExternalVisitor}
            handleClose={() => setShowAddExternalVisitor(false)}
          />
        </div>
      )}
      {showRenew && (
        <div className="modal fade" aria-hidden="true">
          <RenewPermitForMemberPopup
            show={showRenew}
            handleClose={() => setShowRenew(false)}
          />
        </div>
      )}
      {showArchive && (
        <div className="modal fade" aria-hidden="true">
          <AddToArchiveForMember
            show={showArchive}
            handleClose={() => setShowArchive(false)}
          />
        </div>
      )}
    </>
  );
};
