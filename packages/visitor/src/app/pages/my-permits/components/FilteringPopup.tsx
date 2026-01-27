import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import CheckBoxDropDown from "@4eplatform/shared/src/popups/CheckBoxDropDown";
import { ManagementHierarchyPopup } from "@4eplatform/shared/src/popups/ManagementHierarchyPopup";

type PopupProps = {
  showAdd: boolean;
  handleClose: () => void;
};

export const FilteringPopup: FC<PopupProps> = ({ showAdd, handleClose }) => {
  const intl = useIntl();


  const [StatementType, setStatementType] = useState([]);
  const StatementTypeOptions = [
    {
      id: 1,
      name: "داخلي",
    },
    {
      id: 2,
      name: "دخول",
    },
  ];
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [VisitorsNumber, setVisitorsNumber] =
    useState([]);
  const VisitorsNumberOptions = [
    {
      id: 1,
      name: "10",
    },
    {
      id: 2,
      name: "20",
    },
    {
      id: 3,
      name: "30",
    },
  ];

  const [PermitStatus, setPermitStatus] = useState([]);
  const PermitStatusOptions = [
    {
      id: 1,
      name: "موافقة",
    },
    {
      id: 2,
      name: "سارية",
    },
    {
      id: 3,
      name: "منتهية",
    },
    {
      id: 4,
      name: "ملغية",
    },
    {
      id: 5,
      name: "مرفوضة",
    },
  ];

  const [visitReceiver, setvisitReceiver] = useState(
    []
  );
  const visitReceiverOptions = [
    {
      id: 1,
      name: "جمال محمد علام",
    }
  ];
  const [Preferencess, setPreferencess] = useState([]);
  const PreferencessOptions = [
    {
      id: 1,
      name: "مفضل",
    },
    {
      id: 2,
      name: "غير مفضل",
    },
  ];

  return (
    <>
      <Modal centered show={showAdd} onHide={handleClose} size="xl">
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title className="w-100 d-flex align-items-center justify-content-center">
            <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
              <span className="card-label fs-4 my-5">
                {" "}
                {intl.formatMessage({ id: "DataFiltering" })}
              </span>
              <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                {intl.formatMessage({ id: "PleaseEnterTheFollowingData" })}{" "}
              </span>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-5 mx-4">
          <div className="row ">
            <div className=" col-md-6 col-lg-4 col-12 mb-3 mb-lg-0">
              <label className="mb-2">
                <span>
                  {intl.formatMessage({ id: "StatementType" })}
                </span>
              </label>
              <CheckBoxDropDown
                placeholder={intl.formatMessage({ id: "StatementType" })}
                selectedOptions={StatementType}
                setSelectedOptions={setStatementType}
                options={StatementTypeOptions}
              />
            </div>
            <div className=" col-md-6 col-lg-4 col-12 mb-3 mb-lg-0">
              <label className="fs-6 fw-bold mb-2" htmlFor="classNameification">
                {intl.formatMessage({ id: "AuthorizingAuthority" })}{" "}
              </label>

              <div className="input-group ">
                <input
                  className="form-control"
                  placeholder={intl.formatMessage({
                    id: "ChooseAuthorizingAuthority",
                  })}
                />
                <div className="h-110 d-flex" role="button">
                  <span
                    className="input-group-text"
                    onClick={() => setModalHShow(true)}
                  >
                    <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-lg-4 col-12 mb-3 mb-lg-0">
              <label className="mb-2">
                <span>
                  {intl.formatMessage({ id: "VisitorsNumber" })}
                </span>
              </label>
              <CheckBoxDropDown
                placeholder={intl.formatMessage({ id: "VisitorsNumber" })}
                selectedOptions={VisitorsNumber}
                setSelectedOptions={setVisitorsNumber}
                options={VisitorsNumberOptions}
              />
            </div>
          </div>
          <div className="row my-8 mb-3 mb-lg-0">
            <div className=" col-md-6 col-lg-4 col-12 mb-3 mb-lg-0">
              <label className="mb-2">
                <span>
                  {intl.formatMessage({ id: "PermitStatus" })}
                </span>
              </label>
              <CheckBoxDropDown
                placeholder={intl.formatMessage({ id: "PermitStatus" })}
                selectedOptions={PermitStatus}
                setSelectedOptions={setPermitStatus}
                options={PermitStatusOptions}
              />
            </div>
            <div className=" col-md-6 col-lg-4 col-12 mb-3 mb-lg-0">
              <label className="mb-2">
                {intl.formatMessage({
                  id: "PermitStartDate",
                })}
              </label>
              <input
                className="form-control form-control-solid"
                type="date"
                name="PermitStartDate"
                placeholder={intl.formatMessage({ id: "PermitStartDate" })}
              />
            </div>
            <div className=" col-md-6 col-lg-4 col-12 mb-3 mb-lg-0">
              <label className="mb-2">
                {intl.formatMessage({
                  id: "PermitEndDate",
                })}
              </label>
              <input
                className="form-control form-control-solid"
                type="date"
                name="PermitEndDate"
                placeholder={intl.formatMessage({ id: "PermitEndDate" })}
              />
            </div>
          </div>
          <div className="row my-8 ">
            <div className=" col-md-6 col-lg-4 col-12 mb-3 mb-lg-0">
              <label className="mb-2">
                <span>
                  {intl.formatMessage({ id: "Preferencess" })}
                </span>
              </label>
              <CheckBoxDropDown
                placeholder={intl.formatMessage({
                  id: "Preferencess",
                })}
                selectedOptions={Preferencess}
                setSelectedOptions={setPreferencess}
                options={PreferencessOptions}
              />
            </div>
            <div className=" col-md-6 col-lg-4 col-12 mb-3 mb-lg-0">
              <label className="mb-2">
                <span>
                  {intl.formatMessage({ id: "VisitReceiver" })}
                </span>
              </label>
              <CheckBoxDropDown
                placeholder={intl.formatMessage({
                  id: "VisitReceiver",
                })}
                selectedOptions={visitReceiver}
                setSelectedOptions={setvisitReceiver}
                options={visitReceiverOptions}
              />
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
              className="btn btn-success"
              onClick={(event) => {
                event.preventDefault();
                handleClose();
              }}
            >
              <span className="indicator-label">
                {" "}
                {intl.formatMessage({ id: "Agree" })}
              </span>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <div
        className="modal fade"
        id="Rega_modal_viewEmployee_hierarchy"
        aria-hidden="true"
      >
        <ManagementHierarchyPopup
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      </div>
    </>
  );
};
