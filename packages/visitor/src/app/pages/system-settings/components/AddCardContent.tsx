import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useNavigate } from "react-router-dom";
import { ManagementHierarchyPopup } from "@4eplatform/shared/src/popups/ManagementHierarchyPopup";

const ViewAllcardsAddCardContent: FC = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);

  const intl = useIntl();
  const navigate = useNavigate();
  return (
    <div
      id="kt_content_container"
      className="d-flex flex-column-fluid align-items-start"
    >
      <div id="kt_content">
        <div className="row">
          <div>
            <div className="card card-xl-stretch card-body">
              <div className="card-header py-5 mb-5">
                <div className="py-2">
                  <h3>{intl.formatMessage({ id: "AddNewCard" })}</h3>
                  <span className="text-gray-600">
                    {intl.formatMessage({ id: "PleaseEnterTheData" })}
                  </span>
                </div>
              </div>
              <form>
                <div className="row gy-5 p-3">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="CardName" className="mb-2 required">
                        {intl.formatMessage({ id: "CardName" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-gear"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="CardName"
                          placeholder={intl.formatMessage({ id: "CardName" })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="ManagementName" className="mb-2 required">
                        {intl.formatMessage({ id: "ManagementName" })}
                      </label>
                      <div className="position-relative">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="special fas fa-user-shield"></i>
                            </span>
                          </div>
                          <input
                            style={{
                              paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                              paddingRight:
                                intl.locale == "en" ? "2.75rem" : "",
                            }}
                            type="text"
                            className="form-control"
                            id="ManagementName"
                            placeholder={intl.formatMessage({
                              id: "ManagementName",
                            })}
                          />
                          <div
                            className="position-absolute translate-middle-y"
                            style={{
                              top: "50%",
                              left: intl.locale == "ar" ? "15px" : "",
                              right: intl.locale == "en" ? "15px" : "",
                            }}
                          >
                            <i
                              className="bi bi-diagram-3 cursor-pointer fs-1 text-muted"
                              onClick={() => setModalHShow(true)}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label
                        htmlFor="CardDescription"
                        className="mb-2 required"
                      >
                        {intl.formatMessage({ id: "CardDescription" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-circle-info"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="CardDescription"
                          placeholder={intl.formatMessage({
                            id: "CardDescription",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="Type" className="mb-2 required">
                        {intl.formatMessage({ id: "Type" })}
                      </label>
                      <select
                        id="Type"
                        className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                        data-placeholder="اختر"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <option disabled selected>
                          {intl.formatMessage({ id: "Type" })}
                        </option>
                        <option value="1">النوع 1</option>
                        <option value="2">النوع 2</option>
                        <option value="3">النوع 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="Icon" className="mb-2 required">
                        {intl.formatMessage({ id: "Icon" })}
                      </label>
                      <div className="position-relative">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="special fa-solid fa-icons"></i>
                            </span>
                          </div>
                          <input
                            style={{
                              paddingLeft: intl.locale == "ar" ? "2.75rem" : "",
                              paddingRight:
                                intl.locale == "en" ? "2.75rem" : "",
                            }}
                            type="text"
                            className="form-control"
                            id="Icon"
                            placeholder={intl.formatMessage({ id: "Icon" })}
                          />
                          <div
                            style={{
                              top: "50%",
                              left: intl.locale == "ar" ? "15px" : "",
                              right: intl.locale == "en" ? "15px" : "",
                            }}
                            className="position-absolute translate-middle-y"
                          >
                            <i className="fa-solid fa-link fs-5 text-muted"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="Color" className="mb-2 required">
                        {intl.formatMessage({ id: "Color" })}
                      </label>
                      <select
                        id="Color"
                        className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                        data-placeholder="اختر"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <option disabled selected>
                          {intl.formatMessage({ id: "Color" })}
                        </option>
                        <option value="1">احمر</option>
                        <option value="2">اخضر</option>
                        <option value="3">اصفر</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="CardLink" className="mb-2 required">
                        {intl.formatMessage({ id: "CardLink" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fa-solid fa-link"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="CardLink"
                          placeholder={intl.formatMessage({ id: "CardLink" })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center my-5">
                    <button
                      onClick={() => navigate(-1)}
                      type="reset"
                      className="btn btn-secondary px-15 me-5"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </button>

                    <button
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault();
                        setModalShow(true);
                      }}
                      className="btn btn-success px-15 ms-5"
                    >
                      {intl.formatMessage({ id: "Add" })}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          aria-hidden="true"
        >
          <ManagementHierarchyPopup
            show={modalHShow}
            handleClose={() => setModalHShow(false)}
          />
        </div>
        <div
          className="modal fade"
          aria-hidden="true"
        >
          <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
        </div>
      </div>
    </div>
  );
};

export { ViewAllcardsAddCardContent };
