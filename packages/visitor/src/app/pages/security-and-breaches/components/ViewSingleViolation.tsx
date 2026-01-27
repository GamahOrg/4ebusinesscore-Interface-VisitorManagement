import { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getViolationsByVisitorID } from "../../../redux/violation-slice";
import moment from "moment";
import AttachmentRow from "./AttachmentRow";
import { useLocation } from "react-router-dom";

export const ViewSingleViolation: FC = () => {

  const intl = useIntl();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getViolationsByVisitorID({
        Id: id,
      }) as any
    );
  }, [id]);
  const violationsVisitor = useSelector((state: RootState) => {
    return state?.violation?.violationsByVisitorId;
  });
  let location = useLocation();
  let cardName = location?.state?.cardTitle;
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
                      id: "DetailsViolationsCommittedByVisitor",
                    })}
                  </span>
                </div>
              </div>
              <div className="card-body py-3">
                {violationsVisitor?.length > 0 ? (
                  violationsVisitor.map((violation: any) => {
                    return (
                      <div
                        className="card bg-light p-6 mb-7"
                        key={violation?.violationId}
                      >
                        <div className="px-3 mb-1 d-flex justify-content-between">
                          <p className="fw-bolder fs-4">
                            {intl.formatMessage({ id: "ViolationDetails" })}
                          </p>
                          <Link
                            to={`/security-and-breaches/edit-violation/${violation?.violationId}`}
                            className="mx-3"
                            state={{ visitorId: id ,
                              cardTitle: cardName,
                             }}
                          >
                            <div
                              className="menu-link p-3 text-primary text-left"
                              style={{ textAlign: "right" }}
                            >
                              <i className="fa-solid fa-pen mx-2 fs-4 text-primary"></i>
                              {intl.formatMessage({ id: "EditViolation" })}
                            </div>
                          </Link>
                        </div>
                        <div className="row gy-5 p-3">
                          <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400">
                              {intl.formatMessage({ id: "PermitNumber" })} :
                              <span className="mx-2 text-dark fw-bold">
                                {violation?.permissionCode ||
                                  intl.formatMessage({ id: "NotFound" })}
                              </span>
                            </p>
                          </div>
                          <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400">
                              {intl.formatMessage({ id: "ViolationType" })} :
                              <span className=" mx-2 text-dark fw-bold">
                                {violation?.violationtype ||
                                  intl.formatMessage({ id: "NotFound" })}
                              </span>
                            </p>
                          </div>
                          <div className="col-lg-6 col-sm-12">
                            <p className="text-gray-400">
                              {intl.formatMessage({ id: "QuadrupleName" })} :
                              <span className=" mx-2 text-dark fw-bold">
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
                          <div className="col-lg-12 col-sm-12">
                            <p className="text-gray-400">
                              {intl.formatMessage({ id: "ViolationDate" })} :
                              <span className="mx-2 text-dark fw-bold">
                                {moment(violation?.date).format("YYYY-MM-DD") ||
                                  intl.formatMessage({ id: "NotFound" })}
                              </span>
                            </p>
                          </div>

                          <div className="col-lg-12 col-sm-12">
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

                          {violation?.attachmentDtos?.length > 0 ? (
                            <div className="col-lg-12 col-sm-12 mb-2 pt-2 pb-3">
                              <label className="form-label px-2 fontSz-6 text-gray-400">
                                {intl.formatMessage({ id: "ATTACHMENTS" })}
                              </label>
                              <AttachmentRow
                                attach={violation?.attachmentDtos}
                              />
                            </div>
                          ) : null}

                          <div className="card py-3">
                            <p className="text-gray-400">
                              {intl.formatMessage({ id: "ViolationDetails" })}
                            </p>
                            <p>{violation?.description}</p>
                          </div>
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
