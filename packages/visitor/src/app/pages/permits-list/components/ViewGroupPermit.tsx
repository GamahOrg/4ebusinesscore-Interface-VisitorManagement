import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import GroupData from "./GroupData";
import VisitorsData from "./VisiorsData";
import CancelPermitPopupGroup from "../popup/CancelPermitPopupGroup";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { GetGroupbyID } from "../../../redux/permission-slice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { putFavouriteForGroup } from "../../../redux/permissions-list-slice";
import RenewPermitForGroupPopup from "../popup/RenewPermitForGroupPopup";
import { AddToArchiveForGroupPopup } from "../popup/AddToArchiveForGroupPopup";
import AddExternalVisitorForGroupPopup from "../popup/AddExternalVisitorForGroupPopup";
import AddInternalVisitorForGroupPopup from "../popup/AddInternalVisitorForGroupPopup";

const ViewGroupPermit = () => {
  const intl = useIntl();
  const [showAddInternalVisitor, setShowAddInternalVisitor] = useState(false);
  const [showAddExternalVisitor, setShowAddExternalVisitor] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [showRenew, setShowRenew] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const { groupId } = useParams();
  let [isArchive, setIsArchive] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { groupPermission } = useSelector(
    (state: RootState) => state.permission
  );

  useEffect(() => {
    if (groupId) {
      dispatch(GetGroupbyID({ Gruopid: groupId }) as any);
    }
  }, [groupId]);
  useEffect(() => {
    setIsArchive(
      groupPermission?.visitor?.every((item) => {
        return item?.isArchive == true;
      })
    );
  }, [groupPermission]);

  let handleFavourite = async () => {
    try {
      await dispatch(
        putFavouriteForGroup({
          id: groupId,
          params: { isFouvrite: !groupPermission?.isFavorite },
        }) as any
      ).then((res: any) => {
        if (res?.payload?.statusEnum == 3) {
          showSuccessAlert(
            true,
            !groupPermission?.isFavorite
              ? "AddedSuccessfullyToFavourite"
              : "RemovedSuccessfullyFromFavourite",
            intl,
            () => {
              dispatch(GetGroupbyID({ Gruopid: groupId }) as any);
            }
          );
        } else if (res?.payload?.message) {
          showSuccessAlert(false, res?.payload?.message, intl, () => {});
        }
      });
    } catch (error) {}
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
                <div className="d-flex justify-content-between mt-10 mb-10">
                  <div>
                    <h2 className="text-dark mb-3 fs-2">
                      {intl.formatMessage({ id: "ViewGroup" })}
                    </h2>
                    <span className="text-muted fs-6">
                      {intl.formatMessage({ id: "AllGroupData" })}
                    </span>
                  </div>
                  <div>
                    {groupPermission?.permissionStatus == 3 && (
                      <>
                        <div
                          onClick={() => {
                            handleFavourite();
                          }}
                          className={`btn hover-text-warning fw-bolder mx-1 text-center mw-100 text-hover-warning`}
                        >
                          <i
                            className={
                              groupPermission?.isFavorite
                                ? "fas fa-star"
                                : "far fa-star"
                            }
                            style={{
                              color: groupPermission?.isFavorite
                                ? "yellow"
                                : "transperant",
                            }}
                          ></i>
                          {intl.formatMessage({ id: "AddToFavorite" })}
                        </div>
                        {isArchive == false && (
                          <div
                            className="menu-link p-3 btn fw-bolder text-center"
                            style={{ textAlign: "right" }}
                            onClick={() => setShowArchive(true)}
                          >
                            <i className="fal fa-archive mx-2 fs-6 fa-fw"></i>
                            {intl.formatMessage({ id: "AddToArchive" })}
                          </div>
                        )}
                        <div
                          onClick={() => setShowPrint(true)}
                          className="btn fw-bolder mx-1 text-center mw-100"
                        >
                          <i className="fas fa-print"></i>
                          {intl.formatMessage({ id: "PrintPermit" })}
                        </div>
                      </>
                    )}
                    {groupPermission?.permissionStatus == 1 && (
                      <>
                        <div
                          onClick={() => setShowCancel(true)}
                          className="btn fw-bolder mx-1 text-danger text-center mw-100"
                        >
                          <i className="far fa-times-circle"></i>
                          {intl.formatMessage({ id: "CancelPermit" })}
                        </div>
                        <div
                          onClick={() => {
                            handleFavourite();
                          }}
                          className={`btn hover-text-warning fw-bolder mx-1 text-center mw-100 text-hover-warning`}
                        >
                          <i
                            className={
                              groupPermission?.isFavorite
                                ? "fas fa-star"
                                : "far fa-star"
                            }
                            style={{
                              color: groupPermission?.isFavorite
                                ? "yellow"
                                : "",
                            }}
                          ></i>
                          {intl.formatMessage({ id: "AddToFavorite" })}
                        </div>
                        <div
                          onClick={() => {
                            if (groupPermission?.permissionSource == 0) {
                              setShowAddInternalVisitor(true);
                            } else if (groupPermission?.permissionSource == 1) {
                              setShowAddExternalVisitor(true);
                            }
                          }}
                          className="btn fw-bolder mx-1 text-center mw-100"
                        >
                          <i className="fal fa-plus-circle"></i>
                          {intl.formatMessage({ id: "AddVisitorToThePermit" })}
                        </div>
                        <div
                          onClick={() => setShowPrint(true)}
                          className="btn fw-bolder mx-1 text-center mw-100"
                        >
                          <i className="fas fa-print"></i>
                          {intl.formatMessage({ id: "PrintPermit" })}
                        </div>
                      </>
                    )}
                    {groupPermission?.permissionStatus == 4 && (
                      <>
                        <div
                          onClick={() => setShowRenew(true)}
                          className="menu-link p-3 text-success text-center btn fw-bolder"
                          style={{ textAlign: "right" }}
                        >
                          <i className="fas fa-sync mx-2 fs-4"></i>
                          {intl.formatMessage({ id: "RenewPermit" })}
                        </div>
                        {isArchive == false && (
                          <div
                            className="menu-link p-3 btn fw-bolder text-center"
                            style={{ textAlign: "right" }}
                            onClick={() => setShowArchive(true)}
                          >
                            <i className="fal fa-archive mx-2 fs-6 fa-fw"></i>
                            {intl.formatMessage({ id: "AddToArchive" })}
                          </div>
                        )}
                        <div
                          onClick={() => {
                            if (groupPermission?.permissionSource == 0) {
                              setShowAddInternalVisitor(true);
                            } else if (groupPermission?.permissionSource == 1) {
                              setShowAddExternalVisitor(true);
                            }
                          }}
                          className="btn fw-bolder mx-1 text-center mw-100"
                        >
                          <i className="fal fa-plus-circle"></i>
                          {intl.formatMessage({ id: "AddVisitorToThePermit" })}
                        </div>
                        <div
                          onClick={() => setShowPrint(true)}
                          className="btn fw-bolder mx-1 text-center mw-100"
                        >
                          <i className="fas fa-print"></i>
                          {intl.formatMessage({ id: "PrintPermit" })}
                        </div>
                      </>
                    )}

                    {groupPermission?.permissionStatus == 4 && (
                      <>
                        <div
                          onClick={() => setShowRenew(true)}
                          className="menu-link p-3 text-success text-center btn fw-bolder"
                          style={{ textAlign: "right" }}
                        >
                          <i className="fas fa-sync mx-2 fs-4"></i>
                          {intl.formatMessage({ id: "RenewPermit" })}
                        </div>
                        {isArchive == false && (
                          <div
                            className="menu-link p-3 btn fw-bolder text-center"
                            style={{ textAlign: "right" }}
                            onClick={() => setShowArchive(true)}
                          >
                            <i className="fal fa-archive mx-2 fs-6 fa-fw"></i>
                            {intl.formatMessage({ id: "AddToArchive" })}
                          </div>
                        )}
                        <div
                          onClick={() => {
                            if (groupPermission?.permissionSource == 0) {
                              setShowAddInternalVisitor(true);
                            } else if (groupPermission?.permissionSource == 1) {
                              setShowAddExternalVisitor(true);
                            }
                          }}
                          className="btn fw-bolder mx-1 text-center mw-100"
                        >
                          <i className="fal fa-plus-circle"></i>
                          {intl.formatMessage({ id: "AddVisitorToThePermit" })}
                        </div>
                        <div
                          onClick={() => setShowPrint(true)}
                          className="btn fw-bolder mx-1 text-center mw-100"
                        >
                          <i className="fas fa-print"></i>
                          {intl.formatMessage({ id: "PrintPermit" })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <GroupData groupPermission={groupPermission} />
                <VisitorsData groupPermission={groupPermission} />
              </div>
            </div>
          </div>
        </div>
        {showCancel && (
          <div className="modal fade" aria-hidden="true">
            <CancelPermitPopupGroup
              show={showCancel}
              handleClose={() => setShowCancel(false)}
            />
          </div>
        )}
        {showAddInternalVisitor && (
          <div className="modal fade" aria-hidden="true">
            <AddInternalVisitorForGroupPopup
              show={showAddInternalVisitor}
              handleClose={() => setShowAddInternalVisitor(false)}
            />
          </div>
        )}
        {showAddExternalVisitor && (
          <div className="modal fade" aria-hidden="true">
            <AddExternalVisitorForGroupPopup
              show={showAddExternalVisitor}
              handleClose={() => setShowAddExternalVisitor(false)}
            />
          </div>
        )}
        {showRenew && (
          <div className="modal fade" aria-hidden="true">
            <RenewPermitForGroupPopup
              show={showRenew}
              handleClose={() => setShowRenew(false)}
            />
          </div>
        )}
        {showArchive && (
          <div className="modal fade" aria-hidden="true">
            <AddToArchiveForGroupPopup
              show={showArchive}
              handleClose={() => setShowArchive(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ViewGroupPermit;
