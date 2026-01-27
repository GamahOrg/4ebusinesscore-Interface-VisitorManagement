import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import {
  fetchAllPermissionList,
  putFavouriteForVisitor,
} from "../../../redux/permissions-list-slice";
import { VisitorPermissionModel } from "../../../model/visitor-permission-model";
import AddExternalVisitorForMembersTablePopup from "../../permits-list/popup/AddExternalVisitorForMembersTablePopup";
import { AddToArchiveInMembersTablePopup } from "../popup/AddToArchiveInMembersTablePopup";
import AddInternalVisitorForMembersFavouriteTablePopup from "../popup/AddInternalVisitorForMembersFavouriteTablePopup";
import RenewPermitForMembersTablePopup from "../popup/RenewPermitForMembersTablePopup";

type ActionProps = {
  id: string;
  permit: VisitorPermissionModel;
  pageIndexForMember?: number;
  pageSizeForMember?: number;
};

export const ActionsForMemberFavourite: FC<ActionProps> = ({
  id,
  permit,
  pageIndexForMember,
  pageSizeForMember,
}) => {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [showRenew, setShowRenew] = useState(false);
  const { workspaceName } = useParams();
  const [showAddInternalVisitor, setShowAddInternalVisitor] = useState(false);
  const [showAddExternalVisitor, setShowAddExternalVisitor] = useState(false);
  let [selectedId, setSelectedId] = useState("");
  let [showArchive, setShowArchive] = useState(false);
  let arPermitSource = permit.permissionSource;
  const permitSource = arPermitSource === 0 ? "internal" : "entry";
  let dispatch = useDispatch();
    let handleFavourite = async () => {
    if (permit?.isFouvirte) {
      return;
    }
  
    let formData = new FormData();
    formData.append("IsFouvrite", "false");
    formData.append("Visitor_id", permit?.visitorId);
  
    try {
      await dispatch(putFavouriteForVisitor(formData) as any).then(
        (res: any) => {
          if (res?.payload?.statusEnum == 3) {
            showSuccessAlert(
              true,
              "RemovedSuccessfullyFromFavourite",
              intl,
              () => {
                let params = {
                  pageSize: pageSizeForMember,
                  pageNumber: pageIndexForMember,
                };
                dispatch(fetchAllPermissionList(params) as any);
              }
            );
          } else {
            showSuccessAlert(false, res?.payload?.message, intl, () => {});
          }
        }
      );
    } catch (error) {
      console.error("Error during editing basic data:", error);
    }
  };

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className=" p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {permit?.permissionStatus === 0 && (
            <>
              <Link
                to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.visitorId}`}
                state={permit}
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
              </>)}
          {permit?.permissionStatus === 1 && (
            <>
              <Link
                to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.visitorId}`}
                state={permit}
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
                <Link
                  className="menu-link p-3 text-primary text-left"
                  style={{ textAlign: "right", display: "block" }}
                  to={
                    permit?.permissionSource === 0
                      ? `/permits-list/edit-internal-permit/single/${permit?.visitorId}`
                      : `/permits-list/edit-external-permit/single/${permit?.visitorId}`
                  }
                  onClick={() => setSelectedId(permit?.visitorId)}
                >
                    <span className="svg-icon svg-icon-3 mx-2">
                        <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                    </span>
                  {intl.formatMessage({ id: "EditPermit" })}
                </Link>
              </Dropdown.Item>
              </>)}
          {permit?.permissionStatus === 2 && (
            <>
              <Link
                to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.visitorId}`}
                state={permit}
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

              </>)}
          {permit?.permissionStatus === 3 && (
            <>
              <Link
                to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.visitorId}`}
                state={permit}
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
              </>)}
          {permit?.permissionStatus === 4 && (
            <>
              <Link
                to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.visitorId}`}
                state={permit}
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
                    handleFavourite();
                  }}
                >
                  <i className="fal fa-archive mx-1 fs-6 fa-fw"></i>
                  {intl.formatMessage({ id: "RemoveFromFavourites" })}
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
            </>
          )}
          {permit?.permissionStatus == 5 && (
            <>
              <Link
                to={`/permits-list/view-permit/visitor-workspace/${id}/${permit?.visitorId}`}
                state={permit}
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
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
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
          <AddInternalVisitorForMembersFavouriteTablePopup
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
          <AddToArchiveInMembersTablePopup
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