import { FC, useState } from "react";
import { useIntl } from "react-intl";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { PermissionListModel } from "../../../model/permission-list-model";
import RenewPermitForMembersTablePopup from "../popup/RenewPermitForMembersTablePopupV2";
import AddInternalVisitorForMembersTablePopup from "../popup/AddInternalVisitorForMembersTablePopup";
import AddExternalVisitorForMembersTablePopup from "../popup/AddExternalVisitorForMembersTablePopup";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "@4eplatform/shared";
import {
  fetchAllPermissionList,
  putFavouriteForVisitor,
} from "../../../redux/permissions-list-slice";
import { PermissionSource } from "../../../model/permit-enums";
import { AddToAchiveInMembersTablePopup } from "../popup/AddToAchiveInMembersTablePopup";
import { PermissionStatus } from "../../../model/permit-enums";

type ActionProps = {
  id: string;
  permit: PermissionListModel;
  pageIndexForMember?: number;
  pageSizeForMember?: number;
};

export const ActionsForMember: FC<ActionProps> = ({
  id,
  permit,
  pageIndexForMember,
  pageSizeForMember,
}) => {
  const intl = useIntl();
  const [showRenew, setShowRenew] = useState(false);
  const [showAddInternalVisitor, setShowAddInternalVisitor] = useState(false);
  const [showAddExternalVisitor, setShowAddExternalVisitor] = useState(false);
  let [selectedId, setSelectedId] = useState("");
  let [showArchive, setShowArchive] = useState(false);
  let dispatch = useDispatch();
  let handleFavourite = async () => {
    let formData = new FormData();
    formData.append("IsFouvrite", !permit?.isFouvirte ? "true" : "false");
    formData.append("Visitor_id", permit?.vistorId);
    try {
      await dispatch(putFavouriteForVisitor(formData) as any).then(
        (res: any) => {
          if (res?.payload?.statusEnum == 3) {
            showSuccessAlert(
              true,
              !permit?.isFouvirte
                ? "AddedSuccessfullyToFavourite"
                : "RemovedSuccessfullyFromFavourite",
              intl,
              () => {
                let params = {
                  pagesize: pageSizeForMember,
                  pageIndex: pageIndexForMember,
                };
                dispatch(fetchAllPermissionList(params) as any);
              }
            );
          } else if (res?.payload?.message) {
            showSuccessAlert(false, res?.payload?.message, intl, () => {});
          }
        }
      );
    } catch (error) {}
  };
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  return (
    <>
      {permit?.permissionStatus == PermissionStatus?.Rejected ? (
        <>
          {" "}
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              split
              variant="none"
              className=" p-0 text-center"
              id="dropdown-custom-2"
            >
              <i
                className="bi bi-three-dots fs-2"
                style={{ color: "#7e8299" }}
              ></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link
                state={{ cardName, serviceName }}
                to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.visitorId || permit?.vistorId}`}
              >
                <Dropdown.Item as="button">
                  <div
                    className="menu-link p-3 text-muted text-left"
                    style={{ textAlign: "right" }}
                  >
                    <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                    {intl.formatMessage({ id: "ViewPermit" })}
                  </div>
                </Dropdown.Item>
              </Link>
              <Link
                to={`/permits-follow/permits-follow-logs/${permit?.permissionNumber}/${permit?.visitorId || permit?.vistorId}?type=member`}
                state={{ permit, cardName, serviceName }}
              >
                <Dropdown.Item as="button">
                  <div
                    className="menu-link p-3 text-muted text-left"
                    style={{ textAlign: "right" }}
                  >
                    <i className="fas fa-users  mx-2 fs-4   text-muted"></i>
                    {intl.formatMessage({ id: "PermitFollow" })}
                  </div>
                </Dropdown.Item>
              </Link>
              <Dropdown.Item as="button">
                <div
                  className="menu-link p-3 text-muted text-left"
                  style={{ textAlign: "right" }}
                  onClick={() => {
                    setSelectedId(id);
                    setShowArchive(true);
                  }}
                >
                  <i className="fal fa-archive mx-1 fs-6 fa-fw"></i>
                  {intl.formatMessage({ id: "AddToArchive" })}
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              split
              variant="none"
              className=" p-0 text-center"
              id="dropdown-custom-2"
            >
              <i
                className="bi bi-three-dots fs-2"
                style={{ color: "#7e8299" }}
              ></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {permit?.permissionStatus === PermissionStatus?.InProgress && (
                <>
                  <Link
                    state={{ cardName, serviceName }}
                    to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.vistorId}`}
                  >
                    <Dropdown.Item as="button">
                      <div
                        className="menu-link p-3 text-muted text-left"
                        style={{ textAlign: "right" }}
                      >
                        <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                        {intl.formatMessage({ id: "ViewPermit" })}
                      </div>
                    </Dropdown.Item>
                  </Link>
                  <Link
                    to={`/permits-follow/permits-follow-logs/${permit?.permissionNumber}/${permit?.visitorId || permit?.vistorId}?type=member`}
                    state={{ permit, cardName, serviceName }}
                  >
                    <Dropdown.Item as="button">
                      <div
                        className="menu-link p-3 text-muted text-left"
                        style={{ textAlign: "right" }}
                      >
                        <i className="fas fa-users  mx-2 fs-4   text-muted"></i>
                        {intl.formatMessage({ id: "PermitFollow" })}
                      </div>
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Item as="button">
                    <div
                      className="menu-link p-3 text-success text-left"
                      style={{ textAlign: "right" }}
                      onClick={() => {
                        setSelectedId(id);
                        if (
                          permit?.permissionSource == PermissionSource?.Internal
                        ) {
                          setShowAddInternalVisitor(true);
                        } else if (
                          permit?.permissionSource == PermissionSource?.External
                        ) {
                          setShowAddExternalVisitor(true);
                        }
                      }}
                    >
                      <i className="fal fa-plus-circle  mx-2 fs-4"></i>
                      {intl.formatMessage({ id: "AddVisitor" })}
                    </div>
                  </Dropdown.Item>
                  <Link
                    to={
                      permit?.permissionSource == PermissionSource?.Internal
                        ? `/permits-list/edit-internal-permit/single/${permit?.vistorId}`
                        : permit?.permissionSource == PermissionSource?.External
                          ? `/permits-list/edit-external-permit/single/${permit?.vistorId}`
                          : ""
                    }
                    state={{ cardName, serviceName }}
                  >
                    <Dropdown.Item as="button">
                      <div
                        className="menu-link p-3 text-primary text-left"
                        style={{ textAlign: "right" }}
                      >
                        <span className="svg-icon svg-icon-3 me-2">
                          <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                        </span>
                        {intl.formatMessage({ id: "EditPermit" })}
                      </div>
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Item as="button">
                    <div
                      className="menu-link p-3 text-warning text-left"
                      style={{ textAlign: "right" }}
                      onClick={() => {
                        handleFavourite();
                      }}
                    >
                      <i className="fa-regular fa-star mx-1 fs-6 fa-fw"></i>

                      {intl.formatMessage({ id: "AddToFavorite" })}
                    </div>
                  </Dropdown.Item>
                </>
              )}
              {permit?.permissionStatus === PermissionStatus?.Finshed && (
                <>
                  <Link
                    to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.vistorId}`}
                    state={{ permit, cardName, serviceName }}
                  >
                    <Dropdown.Item as="button">
                      <div
                        className="menu-link p-3 text-muted text-left"
                        style={{ textAlign: "right" }}
                      >
                        <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                        {intl.formatMessage({ id: "ViewPermit" })}
                      </div>
                    </Dropdown.Item>
                  </Link>
                  <Link
                    state={{ permit, cardName, serviceName }}
                    to={`/permits-follow/permits-follow-logs/${permit?.permissionNumber}/${permit?.visitorId || permit?.vistorId}?type=member`}
                  >
                    <Dropdown.Item as="button">
                      <div
                        className="menu-link p-3 text-muted text-left"
                        style={{ textAlign: "right" }}
                      >
                        <i className="fas fa-users  mx-2 fs-4   text-muted"></i>
                        {intl.formatMessage({ id: "PermitFollow" })}
                      </div>
                    </Dropdown.Item>
                  </Link>

                  <Dropdown.Item
                    as="button"
                    onClick={() => {
                      setShowRenew(true);
                      setSelectedId(id);
                    }}
                  >
                    <div
                      className="menu-link p-3 text-success text-left"
                      style={{ textAlign: "right" }}
                    >
                      <i className="fas fa-sync mx-2 fs-4"></i>

                      {intl.formatMessage({ id: "RenewPermit" })}
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item as="button">
                    <div
                      className="menu-link p-3 text-muted text-left"
                      style={{ textAlign: "right" }}
                      onClick={() => {
                        setSelectedId(id);
                        setShowArchive(true);
                      }}
                    >
                      <i className="fal fa-archive mx-1 fs-6 fa-fw"></i>
                      {intl.formatMessage({ id: "AddToArchive" })}
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                    <div
                      className="menu-link p-3 text-warning text-left"
                      style={{ textAlign: "right" }}
                      onClick={() => {
                        handleFavourite();
                      }}
                    >
                      <i className="fa-regular fa-star mx-1 fs-6 fa-fw"></i>

                      {intl.formatMessage({ id: "AddToFavorite" })}
                    </div>
                  </Dropdown.Item>
                </>
              )}
              {permit?.permissionStatus == PermissionStatus?.Canceled && (
                <>
                  <Link
                    to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.vistorId}`}
                    state={{ permit, cardName, serviceName }}
                  >
                    <Dropdown.Item as="button">
                      <div
                        className="menu-link p-3 text-muted text-left"
                        style={{ textAlign: "right" }}
                      >
                        <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                        {intl.formatMessage({ id: "ViewPermit" })}
                      </div>
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Item as="button">
                    <div
                      className="menu-link p-3 text-muted text-left"
                      style={{ textAlign: "right" }}
                      onClick={() => {
                        setSelectedId(id);
                        setShowArchive(true);
                      }}
                    >
                      <i className="fal fa-archive mx-1 fs-6 fa-fw"></i>
                      {intl.formatMessage({ id: "AddToArchive" })}
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item as="button">
                    <div
                      className="menu-link p-3 text-warning text-left"
                      style={{ textAlign: "right" }}
                      onClick={() => {
                        handleFavourite();
                      }}
                    >
                      <i className="fa-regular fa-star mx-1 fs-6 fa-fw"></i>

                      {intl.formatMessage({ id: "AddToFavorite" })}
                    </div>
                  </Dropdown.Item>
                </>
              )}

              {permit?.permissionStatus == PermissionStatus?.Approved && (
                <>
                  <Link
                    to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.vistorId}`}
                    state={{ permit, cardName, serviceName }}
                  >
                    <Dropdown.Item as="button">
                      <div
                        className="menu-link p-3 text-muted text-left"
                        style={{ textAlign: "right" }}
                      >
                        <i className="fas fa-eye mx-2 fs-4 text-muted"></i>
                        {intl.formatMessage({ id: "ViewPermit" })}
                      </div>
                    </Dropdown.Item>
                  </Link>
                  <Link
                    state={{ permit, cardName, serviceName }}
                    to={`/permits-follow/permits-follow-logs/${permit?.permissionNumber}/${permit?.visitorId || permit?.vistorId}?type=member`}
                  >
                    <Dropdown.Item as="button">
                      <div
                        className="menu-link p-3 text-muted text-left"
                        style={{ textAlign: "right" }}
                      >
                        <i className="fas fa-users  mx-2 fs-4   text-muted"></i>
                        {intl.formatMessage({ id: "PermitFollow" })}
                      </div>
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Item as="button">
                    <div
                      className="menu-link p-3 text-warning text-left"
                      style={{ textAlign: "right" }}
                      onClick={() => {
                        handleFavourite();
                      }}
                    >
                      <i className="fa-regular fa-star mx-1 fs-6 fa-fw"></i>

                      {intl.formatMessage({ id: "AddToFavorite" })}
                    </div>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
      {showRenew && selectedId == id && (
        <div className="modal fade" aria-hidden="true">
          <RenewPermitForMembersTablePopup
            show={showRenew}
            handleClose={() => setShowRenew(false)}
            permit={permit}
            {...{
              pageSizeForMember,
              pageIndexForMember,
            }}
          />
        </div>
      )}
      {showAddExternalVisitor && selectedId == id && (
        <div className="modal fade" aria-hidden="true">
          <AddExternalVisitorForMembersTablePopup
            show={showAddExternalVisitor}
            handleClose={() => setShowAddExternalVisitor(false)}
            permit={permit}
            {...{
              pageSizeForMember,
              pageIndexForMember,
            }}
          />
        </div>
      )}
      {showAddInternalVisitor && selectedId == id && (
        <div className="modal fade" aria-hidden="true">
          <AddInternalVisitorForMembersTablePopup
            show={showAddInternalVisitor}
            handleClose={() => setShowAddInternalVisitor(false)}
            permit={permit}
            {...{
              pageSizeForMember,
              pageIndexForMember,
            }}
          />
        </div>
      )}
      {showArchive && selectedId == id && (
        <div className="modal fade" aria-hidden="true">
          <AddToAchiveInMembersTablePopup
            show={showArchive}
            handleClose={() => setShowArchive(false)}
            permit={permit}
            {...{
              pageSizeForMember,
              pageIndexForMember,
            }}
          />
        </div>
      )}
    </>
  );
};
