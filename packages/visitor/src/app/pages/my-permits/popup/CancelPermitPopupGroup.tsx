import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { getViolationsByVisitorID } from "../../../redux/violation-slice";
import {
  CancelPermitForGroupProps,
  CancelPermitForGroupSchema,
} from "../../../validation/cancel-permit-for-group-validation";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

import { addCancelRequestForGroup } from "../../../redux/permissions-list-slice";
type PopupProps = {
  show?: any;
  handleClose?: any;
};
const CancelPermitPopupGroup: React.FC<PopupProps> = ({
  show,
  handleClose,
}) => {
  const [showViolation, setShowViolation] = useState(true);
  const [showOtherReason, setShowOtherReason] = useState(false);
  const intl = useIntl();
  const handleRadioChange = (e: { target: { value: string } }) => {
    if (e.target.value === "violation") {
      setShowViolation(true);
      setShowOtherReason(false);
      setValue("cancelReason", true);
      setValue("cancelReasonText", "");
      clearErrors("cancelReasonText");
    } else if (e.target.value === "otherReason") {
      setShowViolation(false);
      setShowOtherReason(true);
      setValue("cancelReason", false);
      setValue("violationId", "");
      clearErrors("violationId");
    }
  };
  let dispatch = useDispatch();
  let language: string = intl.locale;
  let violationsByVisitorId = useSelector((state: RootState) => {
    return state?.violation?.violationsByVisitorId;
  });
  let visitorsForGroup = useSelector((state: RootState) => {
    return state?.permission?.groupPermission?.visitor;
  })?.map((visitor) => {
    return { name: visitor?.vistorName, id: visitor?.vistorId };
  });
  let { groupId } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<CancelPermitForGroupProps>({
    resolver: yupResolver(CancelPermitForGroupSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let formValues = watch();
  useEffect(() => {
    if (formValues.visitorId) {
      dispatch(
        getViolationsByVisitorID({
          id: formValues.visitorId,
        }) as any
      )?.then((res: any) => {
        setValue(
          "violations",
          res?.payload?.result?.map((item: any) => {
            return item?.id;
          })
        );
        trigger("violations");
      });
    }
  }, [formValues.visitorId]);
  useEffect(() => {
    setValue("cancelReason", true);
  }, []);
  let handleClosePermit = async (formValues: CancelPermitForGroupProps) => {
    let formData = new FormData();
    if (formValues?.violationId) {
      formData.append("ViolationId", formValues?.violationId as string);
    }
    formData.append("GroupId", groupId as string);
    formData.append(
      "cancelReason",
      formValues?.cancelReason == true ? "0" : "1"
    );
    if (formValues?.cancelReasonText) {
      formData.append("Reason", formValues?.cancelReasonText as string);
    }
    try {
      await dispatch(addCancelRequestForGroup(formData) as any).then(
        (res: any) => {
          if (res?.payload?.statusEnum == 2) {
            handleClose();
            showSuccessAlert(true, "AddedSuccessfully", intl, () => {});
          } else if (res?.payload?.message) {
            handleClose();
            showSuccessAlert(false, res?.payload?.message, intl, () => {});
          }
        }
      );
    } catch (error) {}
  };
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <div className="card-header w-100 px-1 d-flex justify-content-center pb-2 border-0  mt-10">
            <Modal.Title>
              <h3 className="card-title flex-column align-items-center">
                <span className="card-label fw-bolder fs-3 mb-2 ">
                  {intl.formatMessage({ id: "CancelPermit" })}
                </span>
              </h3>
            </Modal.Title>
          </div>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleClosePermit)}>
          <Modal.Body>
            <div className="mb-4">
              <label className="mb-2 required">
                <span>{intl.formatMessage({ id: "SelectTheVisitor" })}</span>
              </label>
              <select
                id="ConfidentialityType"
                className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                data-placeholder="اختر"
                tabIndex={-1}
                aria-hidden="true"
                {...register("visitorId")}
              >
                <option disabled selected value={""}>
                  {intl.formatMessage({ id: "SelectTheVisitor" })}
                </option>
                {visitorsForGroup?.map((visitor) => {
                  return <option value={visitor?.id}>{visitor?.name}</option>;
                })}
              </select>
              {DisplayErrorMessage(errors?.visitorId?.message, intl, language)}
            </div>
            <div className="mb-4">
              <label className="mb-2">
                <span>{intl.formatMessage({ id: "CancelReason" })}</span>
              </label>
              <div className="card bg-light py-4">
                <div className="d-flex">
                  <div>
                    <input
                      type="radio"
                      name="cancelReason"
                      id="violation"
                      className="form-check-input mx-2"
                      value="violation"
                      onChange={handleRadioChange}
                      checked={showViolation}
                    />
                    <label htmlFor="BarcodeRadio">
                      {intl.formatMessage({ id: "Violation" })}
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="cancelReason"
                      id="otherReason"
                      className="form-check-input mx-2"
                      value="otherReason"
                      onChange={handleRadioChange}
                      checked={showOtherReason}
                    />
                    <label htmlFor="SerialRadio">
                      {intl.formatMessage({ id: "OtherReason" })}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {showViolation && (
                <div>
                  <label className="mb-2">
                    <span>
                      {intl.formatMessage({ id: "RecordedViolation" })}
                    </span>
                  </label>
                  <select
                    id="ConfidentialityType"
                    className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                    data-placeholder="اختر"
                    tabIndex={-1}
                    aria-hidden="true"
                    {...register("violationId")}
                  >
                    <option disabled defaultValue={""}>
                      {intl.formatMessage({ id: "Choose" })}
                    </option>
                    {violationsByVisitorId?.map((violation) => {
                      return (
                        <option
                          value={violation?.violationId}
                          key={violation?.violationId}
                        >
                          {violation?.violationtype}
                        </option>
                      );
                    })}
                  </select>
                  {DisplayErrorMessage(
                    errors?.violationId?.message,
                    intl,
                    language
                  )}
                </div>
              )}
              {showOtherReason && (
                <div>
                  <label className="mb-2">
                    <span>{intl.formatMessage({ id: "CancelReason" })}</span>
                  </label>
                  <textarea
                    className="form-control bg-light "
                    rows={5}
                    placeholder={intl.formatMessage({ id: "EnterTheReason" })}
                    {...register("cancelReasonText")}
                  ></textarea>
                  {DisplayErrorMessage(
                    errors?.cancelReasonText?.message,
                    intl,
                    language
                  )}
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center py-2">
            <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
              <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                <div className="d-flex justify-content-center align-items-center w-50">
                  <div
                    onClick={handleClose}
                    className="btn btn-secondary mx-1 text-center w-100"
                  >
                    {intl.formatMessage({ id: "Reject" })}
                  </div>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-danger mx-1 text-center w-100"
                    style={{ border: "none" }}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default CancelPermitPopupGroup;
