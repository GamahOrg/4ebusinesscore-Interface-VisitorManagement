import { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import moment from "moment";
import { getGroupMembersViolationByGroupID } from "../../../redux/violation-slice";
import { getGroupById } from "../../../redux/violation-slice";
import { MembersViolationsGroupModel } from "../../../model/members-violations-group-model";

export const ViewGroupViolationHome: FC = () => {
  const intl = useIntl();
  const { groupId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getGroupMembersViolationByGroupID({
        Id: groupId,
      }) as any
    );
    dispatch(getGroupById({ Gruopid: groupId }) as any);

  }, [groupId]);
  const groupNumber:number =  useSelector((state: RootState) => {
    return state?.violation?.groupDetails?.groupNumber;
  })
  const violationsVisitorsByGroupId : MembersViolationsGroupModel[] = useSelector((state: RootState) => {
    return state?.violation?.groupMembersViolation;
  });
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
              <div className="card-header my-4">
                <div>
                  <h2 className="text-dark my-4 fs-2">
                    {intl.formatMessage({ id: "violationsView" })}
                  </h2>
                  <span className="text-muted fs-6">
                    {intl.formatMessage({
                      id: "DetailsViolationsCommittedByGroup",
                    })}
                  </span>
                </div>
              </div>

              <div className="card-body py-3">
                {violationsVisitorsByGroupId?.length > 0 ? (
                  violationsVisitorsByGroupId.map((violation: MembersViolationsGroupModel) => {
                    return (
                        <div
                          className="card bg-light p-6 mb-7"
                          key={violation?.violationId}
                        >
                          <div className="px-3 mb-1 d-flex justify-content-between">
                            <p className="fw-bolder fs-4">
                              {intl.formatMessage({ id: "ViolationDetails" })}
                            </p>
                          </div>
                          <div className="row gy-5 p-3">
                            <div className="col-lg-6 col-sm-12">
                              <p className="text-gray-400">
                                {intl.formatMessage({ id: "GroupNumber" })} :
                                <span className="mx-2 text-dark fw-bold">
                                  {groupNumber ||
                                    intl.formatMessage({ id: "NotFound" })}
                                </span>
                              </p>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                              <p className="text-gray-400">
                                {intl.formatMessage({ id: "PermitNumber" })} :
                                <span className=" mx-2 text-dark fw-bold">
                                  {violation?.permissionCode ||
                                    intl.formatMessage({ id: "NotFound" })}
                                </span>
                              </p>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                              <p className="text-gray-400">
                                {intl.formatMessage({ id: "QuadrupleName" })} :
                                <span className="mx-2 text-dark fw-bold">
                                  {violation?.fullName ||
                                    intl.formatMessage({ id: "NotFound" })}
                                </span>
                              </p>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                              <p className="text-gray-400">
                                {intl.formatMessage({ id: "Destination" })} :
                                <span className="mx-2 text-dark fw-bold">
                                  {violation?.permissionOrg ||
                                    intl.formatMessage({ id: "NotFound" })}
                                </span>
                              </p>
                            </div>
                         
                            <div className="col-lg-6 col-sm-12">
                              <p className="text-gray-400">
                                {intl.formatMessage({ id: "ViolationType" })} :
                                <span className=" mx-2 text-dark fw-bold">
                                  {violation?.violationType ||
                                    intl.formatMessage({ id: "NotFound" })}
                                </span>
                              </p>
                            </div>
                   
                            <div className="col-lg-6 col-sm-12">
                              <p className="text-gray-400">
                                {intl.formatMessage({ id: "ViolationDate" })} :
                                <span className="mx-2 text-dark fw-bold">
                                  {moment(violation?.date).format(
                                    "YYYY-MM-DD"
                                  ) || intl.formatMessage({ id: "NotFound" })}
                                </span>
                              </p>
                            </div>

                            <div className="col-lg-6 col-sm-12">
                              <p className="text-gray-400">
                                {intl.formatMessage({
                                  id: "LocationOfTheViolation",
                                })}{" "}
                                :
                                <span className="mx-2 text-dark fw-bold">
                                  {violation?.location ||
                                    intl.formatMessage({ id: "NotFound" })}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="card p-4">
                            <p className="text-gray-400">
                              {intl.formatMessage({
                                id: "ViolationDetails",
                              })}
                            </p>
                            <p>{violation?.description}</p>
                          </div>
                        </div>
                    );
                  })
                ) : (
                  <div className="text-center text-gray-400">
                    {intl.formatMessage({ id: "NoViolationsFound" })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
