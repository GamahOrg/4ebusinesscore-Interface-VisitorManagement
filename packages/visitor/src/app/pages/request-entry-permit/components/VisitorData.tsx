import { EmployeeHierarchyPopup } from "@4eplatform/shared/src/popups/EmployeeHierarchyPopup";
import { FC, useState } from "react";
import { useIntl } from "react-intl";

const VisitorData: FC = () => {
  const intl = useIntl();

  const [modalHShow, setModalHShow] = useState<boolean>(false);

  return (
    <>
      <div className="row my-8">
        <div className="col-sm-4 col-12">
          <label className="fs-6 fw-bold mb-2" htmlFor="classNameification">
            {intl.formatMessage({ id: "VisitorName" })}{" "}
          </label>

          <div className="input-group ">
            <input
              className="form-control"
              placeholder={intl.formatMessage({
                id: "VisitorName",
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
        <div className="col-sm-4 col-12">
          <label className="mb-2">
            <span>{intl.formatMessage({ id: "IDNumber" })}</span>
          </label>
          <div className="input-group mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="special fas fa-file-signature "></i>
              </span>
            </div>
            <input
              className="form-control form-control-solid"
              type="number"
              name="IDNumber"
              placeholder={intl.formatMessage({ id: "IDNumber" })}
            />
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <label className="mb-2">
            <span>{intl.formatMessage({ id: "Phone" })}</span>
          </label>
          <div className="input-group mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa-solid fa-phone special"></i>
              </span>
            </div>
            <input
              className="form-control form-control-solid"
              type="tel"
              name="Phone"
              placeholder={intl.formatMessage({ id: "Phone" })}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 col-12">
          <label className="mb-2">
            <span>{intl.formatMessage({ id: "WhatsAppNumber" })}</span>
          </label>
          <div className="input-group mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa-brands fa-whatsapp special"></i>
              </span>
            </div>
            <input
              className="form-control form-control-solid"
              type="tel"
              name="WhatsAppNumber"
              placeholder={intl.formatMessage({ id: "WhatsAppNumber" })}
            />
          </div>
        </div>
        <div className="col-sm-4 col-12">
          <label className="mb-2">
            <span>{intl.formatMessage({ id: "Email" })}</span>
          </label>
          <div className="input-group mt-1">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="far fa-envelope special"></i>
              </span>
            </div>
            <input
              className="form-control form-control-solid"
              type="email"
              name="Email"
              placeholder={intl.formatMessage({ id: "Email" })}
            />
          </div>
        </div>
      </div>
      <EmployeeHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
      />
    </>
  );
};
export { VisitorData };
