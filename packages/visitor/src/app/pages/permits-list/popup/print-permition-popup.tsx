import { FC, useRef } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import moment from "moment";
import { VisitorAggRootUrl } from "@4eplatform/shared/apis/visitor_agg";
import { useReactToPrint } from "react-to-print";

type PopupProps = {
  showAdd: boolean;
  handleClose: () => void;
};

export const PrintPermitionPopup: FC<PopupProps> = ({
  showAdd,
  handleClose,
}) => {
  const singlePermission = useSelector(
    (state: RootState) => state.permission?.singlePermission
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });
  const intl = useIntl();
  return (
    <>
      <Modal centered show={showAdd} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title className="w-100 d-flex align-items-center justify-content-center">
            <div className="mb-9 text-center">
              <h1 className="mb-3 w-100 d-flex align-items-center justify-content-center">
                {intl.formatMessage({ id: "PrintPermit" })}
              </h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body ref={contentRef}>
          <div className="row">
            <div className="col-12 col-md-5">
              <div className="mb-1 border-bottom">
                <p className="fw-bolder fs-4">
                  {intl.formatMessage({ id: "PermitData" })}
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "PermitNumber" })} :
                  <span className="mx-1 text-dark fw-bold">
                    {singlePermission?.permissionNumber}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  {" "}
                  {intl.formatMessage({ id: "VisitReceiver" })} :
                  <span className="mx-2 text-dark fw-bold">
                    {singlePermission?.receivedVisiting}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  {" "}
                  {intl.formatMessage({ id: "AuthorizingAuthority" })} :
                  <span className="mx-2 text-dark fw-bold">
                    {singlePermission?.orgName}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  {" "}
                  {intl.formatMessage({ id: "PermitType" })} :
                  <span className=" mx-2 text-dark fw-bold">
                    {intl.locale == "ar" ? singlePermission?.permissionTypeAr ? singlePermission?.permissionTypeAr : intl.formatMessage({ id: "NotFound" }) : singlePermission?.permissionTypeEn ? singlePermission?.permissionTypeEn : intl.formatMessage({ id: "NotFound" })}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  {" "}
                  {intl.formatMessage({ id: "PermitDateStart" })} :
                  <span className="mx-2 text-dark fw-bold">
                    {moment(singlePermission?.startDate).format("YYYY-MM-DD")}
                  </span>
                </p>
              </div>
              <div className="mb-1 border-bottom mt-10">
                <p className="fw-bolder fs-4">
                  {intl.formatMessage({ id: "VisitorData" })}
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "IDNumber" })}/
                  {intl.formatMessage({ id: "Residence" })} :
                  <span className="px-2 text-dark fw-bold">
                    {singlePermission?.visitorNID}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "QuadrupleName" })} :
                  <span className="px-2 text-dark fw-bold">
                    {singlePermission?.visitorName}{" "}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "PhoneNumber" })} :
                  <span className="px-2 text-dark fw-bold">
                    {" "}
                    {singlePermission?.visitorPhone}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">
                  {intl.formatMessage({ id: "Email" })} :
                  <span className="px-2 text-dark fw-bold">
                    {singlePermission?.visitorEmail}
                  </span>
                </p>
              </div>
            </div>

            <div className="col-12 col-md-7">
              <div className="w-100 p-3">
                <img
                  alt="Pic"
                  className="w-100"
                  src={`${VisitorAggRootUrl}${singlePermission?.qrCodeUrl}`}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex pt-12">
            <button
              type="reset"
              className="btn btn-light me-3"
              onClick={() => {
                handleClose();
              }}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(event) => {
                event.preventDefault();
                handlePrint();
                handleClose();
              }}
            >
              <span className="indicator-label">
                {" "}
                {intl.formatMessage({ id: "Print" })}
              </span>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
