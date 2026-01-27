import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import PermitData from "./PermitData";
import VisitorData from "./VisitorData";
import { useParams } from "react-router-dom";
import { PrintPermitionPopup } from "../popup/print-permition-popup";
import { useDispatch, useSelector } from "react-redux";
import { getGetPermissionByVisitorId } from "../../../redux/permission-slice";
import { RootState } from "../../../redux/store";
import { useLocation } from "react-router-dom";
import { ApprovalPermitFromDetails } from "../popup/ApprovalPermitFromDetails";
import { RejectPermitFromDetails } from "../popup/RejectPermitFromDetails";
import { PermissionStatus } from "../../../model/permit-enums";
type SinglePermitProps = {
  id: Number;
  permit: any;
};

export const ViewSinglePermit: FC<SinglePermitProps> = ({ permit }) => {
  const intl = useIntl();
  const [show, setShow] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showPrint, setShowPrint] = useState(false);
  const { id, tabName } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { singlePermission } = useSelector(
    (state: RootState) => state.permission
  );
  useEffect(() => {
    dispatch(
      getGetPermissionByVisitorId({
        Visitor_id: id,
      }) as any
    );
  }, [id]);

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

                  {singlePermission?.permissionStatus == 0 && (
                    <div className="d-flex gap-1">
                      <div
                        className="btn p-3 text-success text-left"
                        onClick={() => setShowApproval(true)}
                        style={{ textAlign: "right" }}
                      >
                        <i className="fas fa-check mx-2 fs-4 text-success "></i>

                        {intl.formatMessage({ id: "AcceptRequest" })}
                      </div>

                      <div
                        className="btn p-3 text-danger text-left"
                        onClick={() => setShowRejection(true)}
                        style={{ textAlign: "right" }}
                      >
                        <i className="fas fa-times mx-2 fs-4 text-danger"></i>

                        {intl.formatMessage({ id: "RequestRejection" })}
                      </div>
                    </div>
                  )

                  }
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
            permit={singlePermission}
          />
        </div>
      )}
      {showApproval && (
        <div className="modal fade" aria-hidden="true">
          <ApprovalPermitFromDetails
            show={showApproval}
            handleClose={() => setShowApproval(false)}
            permit={permit}
            type={"Person"}
          />
        </div>
      )}
      {showRejection && (
        <div className="modal fade" aria-hidden="true">
          <RejectPermitFromDetails
            show={showRejection}
            handleClose={() => setShowRejection(false)}
            permit={permit}
            type={"Person"}
          />
        </div>
      )}
    </>
  );
};
