import { FC, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import VisitorsData from "./VisiorsData";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { GetGroupbyID } from "../../../redux/permission-slice";
import GroupData from "./GroupData";
import { PrintPermitionPopup } from "../popup/print-permition-popup";
import { ApprovalPermitFromDetails } from "../popup/ApprovalPermitFromDetails";
import { RejectPermitFromDetails } from "../popup/RejectPermitFromDetails";

type GroupPermitProps = {
  id: Number;
  permit: string;
};

const ViewGroupPermit: FC<GroupPermitProps> = ({ permit }) => {
  const intl = useIntl();
  const [showPrint, setShowPrint] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const { groupId, tabName } = useParams();

  const dispatch = useDispatch();
  const { groupPermission } = useSelector(
    (state: RootState) => state.permission
  );

  useEffect(() => {
    dispatch(GetGroupbyID({ Gruopid: groupId }) as any);
  }, [groupId]);

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
                  {groupPermission?.visitor
                    ?.map((user) => {
                      return user?.permissionStatus;
                    })
                    ?.includes(0) ? (
                    <>
                      <div className="d-flex gap-1">
                        <div
                          className="btn p-3 text-success text-left"
                          onClick={() => setShowApproval(true)}
                          style={{ textAlign: "right" }}
                        >
                          <i className="fas fa-check mx-2 fs-4 text-success "></i>

                          {intl.formatMessage({ id: "GroupAcceptance" })}
                        </div>

                        <div
                          className="btn p-3 text-danger text-left"
                          onClick={() => setShowRejection(true)}
                          style={{ textAlign: "right" }}
                        >
                          <i className="fas fa-times mx-2 fs-4 text-danger"></i>

                          {intl.formatMessage({ id: "GroupRejection" })}
                        </div>

                        {/* <div>
                      <div
                        onClick={() => setShowPrint(true)}
                        className="btn fw-bolder mx-1 text-center mw-100"
                      >
                        <i className="fas fa-print"></i>
                        {intl.formatMessage({ id: "PrintPermit" })}
                      </div>
                    </div> */}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <GroupData groupPermission={groupPermission} />
                <VisitorsData groupPermission={groupPermission} />
              </div>
            </div>
          </div>
        </div>

        {/* {showPrint && (
          <div className="modal fade" aria-hidden="true">
            <PrintPermitionPopup
              showAdd={showPrint}
              handleClose={() => setShowPrint(false)}
              permit={groupPermission}
            />
          </div>
        )} */}
      </div>
      {showApproval && (
        <div className="modal fade" aria-hidden="true">
          <ApprovalPermitFromDetails
            show={showApproval}
            handleClose={() => setShowApproval(false)}
            permit={permit}
            type="Group"
          />
        </div>
      )}

      {showRejection && (
        <div className="modal fade" aria-hidden="true">
          <RejectPermitFromDetails
            show={showRejection}
            handleClose={() => setShowRejection(false)}
            permit={permit}
            type="Group"
          />
        </div>
      )}
    </>
  );
};

export default ViewGroupPermit;
