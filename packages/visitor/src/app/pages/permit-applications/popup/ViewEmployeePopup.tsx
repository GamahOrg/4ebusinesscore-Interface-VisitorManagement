import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { DisplayNameFourProps } from "@4eplatform/shared/functions/displayName";
import { DisplayNameOneProps } from "@4eplatform/shared/functions/displayName";
import { fetchDelegationUser } from "../../../redux/delegationUserSlice";
import { RootState } from "../../../redux/store";

type PopupProps = {
  show?: any;
  handleClose?: any;
  id?: any;
};
const ViewEmployee: React.FC<PopupProps> = ({ show, handleClose, id }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDelegationUser(id as string) as any);
  }, [id, dispatch]);

  let user = useSelector((state: RootState) => {
    return state?.delegationUser?.data;
  });
  const fullName = DisplayNameFourProps(
    user?.firstName,
    user?.secondName,
    user?.thirdName,
    user?.forthName
  );
  const fullNameManger = DisplayNameOneProps(user?.managerName);
  return (
    <>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale === "ar" ? "flex-start" : "center",
              flexDirection: intl.locale === "en" ? "column-reverse" : "row",
            }}
          >
            <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
              <Modal.Title>
                <h1 className="mb-3">
                  {intl.formatMessage({ id: "PermitUserData" })}
                </h1>
                <h6 className="mb-2 text-center text-muted">
                  {intl.formatMessage({
                    id: "ViewDetails",
                  })}
                </h6>
              </Modal.Title>
            </div>
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <div className="col-6 mx-3 py-5">
              <p className="fs-4 fw-bolder mb-1">
                {intl.formatMessage({ id: "FullName" })}
              </p>
              <div className="input-group py-3 mb-2">
                <div className="input-group-prepend">
                  <span className="input-group-text h-100">
                    <i className="special bi bi-person-circle"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control text-primary fs-4"
                  readOnly
                  value={fullName}
                />
              </div>
              <p className="fs-4 fw-bolder mb-1">
                {intl.formatMessage({ id: "CreatorEmail" })}
              </p>
              <div className="input-group py-3 mb-2">
                <div className="input-group-prepend">
                  <span className="input-group-text h-100">
                    <i className=" fa-solid fa-envelope"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control text-primary fs-4"
                  readOnly
                  value={user?.email}
                />
              </div>
              <p className="fs-4 fw-bolder mb-1">
                {intl.formatMessage({ id: "CreatorManger" })}
              </p>
              <div className="input-group py-3 mb-2">
                <div className="input-group-prepend">
                  <span className="input-group-text h-100">
                    <i className="fa-solid fa-id-card special"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control text-primary fs-4"
                  readOnly
                  value={fullNameManger}
                />
              </div>
              <div className="d-lg-none d-inline">
                <p className="fs-4 fw-bolder mb-1">
                  {intl.formatMessage({ id: "TransferNo" })}
                </p>
                <div className="input-group py-3 mb-2">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control text-primary fs-4"
                    readOnly
                    value={user?.transactionNumber}
                  />
                </div>
              </div>
            </div>
            <div className="col-6 px-3 py-5">
              <p className="fs-4 fw-bolder mb-1">
                {intl.formatMessage({ id: "CreatorAdminstration" })}
              </p>
              <div className="input-group py-3 mb-2">
                <div className="input-group-prepend">
                  <i className="bi bi-diagram-3 fs-1 input-group-text border-radius-0"></i>
                </div>
                <input
                  type="text"
                  className="form-control text-primary fs-4"
                  readOnly
                  value={
                    intl?.locale === "ar" ? user?.orgNameAr : user?.orgNameEn
                  }
                />
              </div>
              <p className="fs-4 fw-bolder mb-1">
                {intl.formatMessage({ id: "JobDegree" })}
              </p>
              <div className="input-group py-3 mb-2">
                <div className="input-group-prepend">
                  <span className="input-group-text h-100">
                    <i className="bi bi-layers-fill special"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control text-primary fs-4"
                  readOnly
                  value={
                    intl?.locale === "ar" ? user?.jobNameAr : user?.jobNameEn
                  }
                />
              </div>
              <div className="d-flex gap-4 ">
                <div>
                  <p className="fs-4 fw-bolder mb-1">
                    {intl.formatMessage({ id: "CreatorPhone" })}
                  </p>
                  <div className="input-group py-3 mb-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text h-100">
                        <i className="bi bi-layers-fill special"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control text-primary fs-4"
                      readOnly
                      value={user?.phoneNumber}
                    />
                  </div>
                </div>
                <div className="d-lg-inline d-none">
                  <p className="fs-4 fw-bolder mb-1">
                    {intl.formatMessage({ id: "TransferNo" })}
                  </p>
                  <div className="input-group py-3 mb-2">
                    <div className="input-group-prepend">
                      <span className="input-group-text h-100">
                        <i className="fa-solid fa-phone"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control text-primary fs-4"
                      readOnly
                      value={user?.transactionNumber}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewEmployee;
