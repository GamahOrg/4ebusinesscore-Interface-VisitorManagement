import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addVisitortoPermission } from "../../../redux/visitor-slice";
import { v4 as uuidv4 } from "uuid";
import {
  AddVisitorForGroupProps,
  AddVisitorForGroupSchema,
} from "../../../validation/add-visitor-for-group-validation";
import { GroupModel } from "../../../model/permission-list-model";
import { fetchGroupsWithVisitors } from "../../../redux/permissions-list-slice";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

type PopupProps = {
  show?: any;
  handleClose?: any;
  pageSizeForGroups?: number;
  pageIndexForGroups?: number;
  permit?: GroupModel;
};
const AddExternalVisitorForGroupInGroupsTablePopup: React.FC<PopupProps> = ({
  show,
  handleClose,
  pageSizeForGroups,
  pageIndexForGroups,
  permit,
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  let language: string = intl.locale;
  let newUserId = uuidv4();
  let [employeeName, setEmployeeName] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AddVisitorForGroupProps>({
    resolver: yupResolver(AddVisitorForGroupSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  useEffect(() => {
    if (employeeName) {
      setValue("UserId", newUserId);
      trigger("UserId");
    }
  }, [employeeName]);
  let handleAddVisitor = async (formValues: AddVisitorForGroupProps) => {
    let formData = new FormData();
    formData.append("GroupName", "");
    formData.append("GroupId", permit?.id as string);
    formData.append("UserId", formValues?.UserId as string);
    formData.append("VisitorName", employeeName as string);
    formData.append("VisitorNId", formValues?.VisitorNId as string);
    formData.append("Phone", formValues?.Phone as string);
    formData.append("Whatsapp", formValues?.Whatsapp as string);
    formData.append("Email", formValues?.Email);
    formData.append("PermissionId", permit?.id as any);
    try {
      await dispatch(addVisitortoPermission(formData) as any).then(
        (res: any) => {
          if (res?.payload?.statusEnum == 3) {
            handleClose();
            showSuccessAlert(true, "AddedSuccessfully", intl, () => {
              let params = {
                pageSize: pageSizeForGroups,
                pageNumber: pageIndexForGroups,
              };
              dispatch(fetchGroupsWithVisitors(params) as any);
            });
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
                  {intl.formatMessage({ id: "AddVisitorToThePermit" })}
                </span>
              </h3>
            </Modal.Title>
          </div>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleAddVisitor)}>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-4 col-12 my-2">
                <div className="mb-4">
                  <label htmlFor="VisitorName" className="mb-2 required">
                    {intl.formatMessage({ id: "VisitorName" })}
                  </label>
                  <div className="input-group position-relative">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user fs-2"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="VisitorName"
                      value={employeeName}
                      placeholder={intl.formatMessage({ id: "VisitorName" })}
                      onChange={(e) => {
                        setEmployeeName(e?.target?.value);
                      }}
                    />
                  </div>
                </div>
                {DisplayErrorMessage(errors?.UserId?.message, intl, language)}
              </div>
              <div className="col-sm-4 col-12 my-2">
                <div className="mb-4">
                  <label htmlFor="IDNumber" className="mb-2 required">
                    {intl.formatMessage({ id: "IDNumber" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="far fa-id-card fs-2"></i>
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id="IDNumber"
                      placeholder={intl.formatMessage({ id: "IDNumber" })}
                      {...register("VisitorNId")}
                    />
                    {DisplayErrorMessage(
                      errors?.VisitorNId?.message,
                      intl,
                      language
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-12 my-2">
                <div className="mb-4">
                  <label htmlFor="PhoneNumber" className="mb-2 required">
                    {intl.formatMessage({ id: "PhoneNumber" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-phone fs-2"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="PhoneNumber"
                      placeholder={intl.formatMessage({ id: "PhoneNumber" })}
                      {...register("Phone")}
                    />
                    {DisplayErrorMessage(
                      errors?.Phone?.message,
                      intl,
                      language
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-12 my-2">
                <div className="mb-4">
                  <label htmlFor="WhatsAppNumber" className="mb-2">
                    {intl.formatMessage({ id: "WhatsAppNumber" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fab fa-whatsapp fs-2"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="WhatsAppNumber"
                      placeholder={intl.formatMessage({ id: "WhatsAppNumber" })}
                      {...register("Whatsapp")}
                    />
                    {DisplayErrorMessage(
                      errors?.Whatsapp?.message,
                      intl,
                      language
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-12 my-2">
                <div className="mb-4">
                  <label htmlFor="Email" className="mb-2 required">
                    {intl.formatMessage({ id: "Email" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-envelope fs-2"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="Email"
                      placeholder={intl.formatMessage({ id: "Email" })}
                      {...register("Email")}
                    />
                    {DisplayErrorMessage(
                      errors?.Email?.message,
                      intl,
                      language
                    )}
                  </div>
                </div>
              </div>
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
                    {intl.formatMessage({ id: "Cancel" })}
                  </div>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success mx-1 text-center w-100"
                    style={{ border: "none" }}
                  >
                    {intl.formatMessage({ id: "Add" })}
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

export default AddExternalVisitorForGroupInGroupsTablePopup;
