import { useState } from "react";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import { SavePopup } from "@4eplatform/shared/src/popups/SavePopup";

const TableSideTab = () => {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const showSuccessAlert = () => {
    Swal.fire({
      text: intl.formatMessage({ id: "AddedSuccessfully" }),
      icon: "success",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: { confirmButton: "btn btn-primary" },
    });
  };
  const [inputValue, setInputValue] = useState("");
  const [optionsOne, setOptionsOne] = useState([]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleAddValue = () => {
    if (inputValue.trim() !== "") {
      const newOption = { id: optionsOne.length + 1, name: inputValue };
      setOptionsOne([...optionsOne, newOption]);
      setInputValue("");
    }
  };

  const handleDeleteOption = (id: any) => {
    setOptionsOne(optionsOne.filter((option) => option.id !== id));
  };
  const [isOpen2, setIsOpen2] = useState(false);

  const [inputValue2, setInputValue2] = useState("");
  const [optionsTwo, setOptionsTwo] = useState([]);
  const handleInputChange2 = (e: any) => {
    setInputValue2(e.target.value);
  };

  const handleAddValue2 = () => {
    if (inputValue2.trim() !== "") {
      const newOption = { id: optionsTwo.length + 1, name: inputValue2 };
      setOptionsTwo([...optionsTwo, newOption]);
      setInputValue2("");
      //   showSuccessAlert();
    }
  };

  const handleDeleteOption2 = (id: any) => {
    setOptionsTwo(optionsTwo.filter((option) => option.id !== id));
  };
  //   ====================================3
  const [isOpen3, setIsOpen3] = useState(false);

  const [inputValue3, setInputValue3] = useState("");
  const [optionsThree, setOptionsThree] = useState([]);
  const handleInputChange3 = (e: any) => {
    setInputValue3(e.target.value);
  };

  const handleAddValue3 = () => {
    if (inputValue3.trim() !== "") {
      const newOption = { id: optionsThree.length + 1, name: inputValue3 };
      setOptionsThree([...optionsThree, newOption]);
      setInputValue3("");
      //   showSuccessAlert();
    }
  };

  const handleDeleteOption3 = (id: any) => {
    setOptionsThree(optionsThree.filter((option) => option.id !== id));
  };

  return (
    <div className={`flex-column  mb-5 mb-lg-0 `}>
      {/* <div className={`flex-column flex-lg-row-auto col-sm-6 mb-5 mb-lg-0 `}> */}
      <div className="card card-xl-stretch mb-xl-3">
        <div className="card-header border-1 pt-3 pb-2">
          <h3 className="card-title align-items-start flex-column w-100 ">
            <h2 className="text-dark mb-2 fs-4 mt-3">
              {intl.formatMessage({ id: "AddOrEditLookupsForThisScreen" })}
            </h2>
          </h3>
          <div className="d-flex justify-content-between align-items-center w-100 mb-3">
            <p className="fw-bolder fs-4 text-primary">
              محتويات هذة الصفحه : Lookups 2
            </p>
            <button className="btn btn-success mx-1 text-center ">
              <i className="fas fa-plus"></i>
              {intl.formatMessage({
                id: "ADD",
              })}
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row d-flex justify-content-center mx-5 align-items-end ">
            <div className="col-lg-5 mb-2 pt-2 pb-3">
              <div className="d-flex flex-column mb-5 fv-row">
                <label className="form-label px-2 fontSz-6">
                  <span>{intl.formatMessage({ id: "ChoiceName" })}</span>
                </label>
                <div className="input-group">
                  <div className="input-group-prepend"></div>
                  <input
                    id="outputName"
                    type="text"
                    className="form-control"
                    value={inputValue}
                    placeholder={intl.formatMessage({
                      id: "EnterChooseName",
                    })}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-2 mb-2 pt-2 pb-3">
              <div className="d-flex flex-column mb-5 fv-row">
                <button className="btn" onClick={handleAddValue}>
                  <i className="fas fa-angle-double-left text-primary fs-2x adminPanelArrow"></i>
                </button>
              </div>
            </div>

            <div className="col-lg-5 mb-2 pt-2 pb-3">
              <div className="d-flex flex-column mb-5 fv-row">
                <label
                  htmlFor="outputName"
                  className="form-label px-2 fontSz-6"
                >
                  {intl.formatMessage({ id: "PurchaseStageRequired" })}
                </label>
                <div className="select-wrapper">
                  <div className="position-relative">
                    <button
                      className="btn btn-light w-200px d-flex justify-content-start flex-wrap btn-dropdwon"
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {optionsOne?.length > 0
                        ? optionsOne[optionsOne?.length - 1].name
                        : intl.formatMessage({ id: "TheChoices" })}
                    </button>
                    {isOpen && (
                      <ul
                        className="list-unstyled border border-1px p-0 border-radius position-absolute w-200px bg-white"
                        style={{ zIndex: 9999 }}
                      >
                        {optionsOne?.map((option: any) => (
                          <li key={option?.id}>
                            <div className="d-flex justify-content-between align-items-center bg-light">
                              <span className=" p-2 ">{option.name}</span>
                              <button
                                className="btn-danger-delete m-2 "
                                onClick={() => handleDeleteOption(option.id)}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mx-5 align-items-end ">
            <div className="col-lg-5 mb-2 pt-2 pb-3">
              <div className="d-flex flex-column mb-5 fv-row">
                <label className="form-label px-2 fontSz-6">
                  <span>{intl.formatMessage({ id: "ChoiceName" })}</span>
                </label>
                <div className="input-group">
                  <div className="input-group-prepend"></div>
                  <input
                    id="outputName"
                    type="text"
                    className="form-control"
                    value={inputValue2}
                    placeholder={intl.formatMessage({
                      id: "EnterChooseName",
                    })}
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-2 mb-2 pt-2 pb-3">
              <div className="d-flex flex-column mb-5 fv-row">
                <button className="btn" onClick={handleAddValue2}>
                  <i className="fas fa-angle-double-left text-primary fs-2x adminPanelArrow"></i>
                </button>
              </div>
            </div>

            <div className="col-lg-5 mb-2 pt-2 pb-3">
              <div className="d-flex flex-column mb-5 fv-row">
                <label
                  htmlFor="outputName"
                  className="form-label px-2 fontSz-6"
                >
                  {intl.formatMessage({ id: "LinkToTheStrategicPillars" })}
                </label>
                <div className="select-wrapper">
                  <div className="position-relative">
                    <button
                      className="btn btn-light w-200px d-flex justify-content-start flex-wrap btn-dropdwon"
                      type="button"
                      onClick={() => setIsOpen2(!isOpen2)}
                    >
                      {optionsTwo?.length > 0
                        ? optionsTwo[optionsTwo?.length - 1].name
                        : intl.formatMessage({ id: "TheChoices" })}
                    </button>
                    {isOpen2 && (
                      <ul
                        className="list-unstyled border border-1px p-0 border-radius position-absolute w-200px bg-white"
                        style={{ zIndex: 9999 }}
                      >
                        {optionsTwo?.map((option: any) => (
                          <li key={option?.id}>
                            <div className="d-flex justify-content-between align-items-center bg-light">
                              <span className=" p-2 ">{option.name}</span>
                              <button
                                className="btn-danger-delete m-2 "
                                onClick={() => handleDeleteOption2(option.id)}
                              >
                                <i className="fas fa-times "></i>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mx-5 align-items-end ">
            <div className="col-lg-5 mb-2 pt-2 pb-3">
              <div className="d-flex flex-column mb-5 fv-row">
                <label className="form-label px-2 fontSz-6">
                  <span>{intl.formatMessage({ id: "ChoiceName" })}</span>
                </label>
                <div className="input-group">
                  <div className="input-group-prepend"></div>
                  <input
                    id="outputName"
                    type="text"
                    className="form-control"
                    value={inputValue3}
                    placeholder={intl.formatMessage({
                      id: "EnterChooseName",
                    })}
                    onChange={handleInputChange3}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-2 mb-2 pt-2 pb-3">
              <div className="d-flex flex-column mb-5 fv-row">
                <button className="btn" onClick={handleAddValue3}>
                  <i className="fas fa-angle-double-left text-primary fs-2x adminPanelArrow"></i>
                </button>
              </div>
            </div>

            <div className="col-lg-5 mb-2 pt-2 pb-3">
              <div className="d-flex flex-column mb-5 fv-row">
                <label
                  htmlFor="outputName"
                  className="form-label px-2 fontSz-6"
                >
                  {intl.formatMessage({ id: "WorkArea" })}
                </label>
                <div className="select-wrapper">
                  <div className="position-relative">
                    <button
                      className="btn btn-light w-200px d-flex justify-content-start flex-wrap btn-dropdwon"
                      type="button"
                      onClick={() => setIsOpen3(!isOpen3)}
                    >
                      {optionsThree?.length > 0
                        ? optionsThree[optionsThree?.length - 1].name
                        : intl.formatMessage({ id: "TheChoices" })}
                    </button>
                    {isOpen3 && (
                      <ul
                        className="list-unstyled border border-1px p-0 border-radius position-absolute w-200px bg-white"
                        style={{ zIndex: 9999 }}
                      >
                        {optionsThree?.map((option: any) => (
                          <li key={option?.id}>
                            <div className="d-flex justify-content-between align-items-center bg-light">
                              <span className=" p-2 ">{option.name}</span>
                              <button
                                className="btn-danger-delete m-2 "
                                onClick={() => handleDeleteOption3(option.id)}
                              >
                                <i className="fas fa-times "></i>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7 mx-auto my-10">
            <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
              <div className="d-flex justify-content-center align-items-center w-50">
                <div
                  onClick={() => setModalShow(true)}
                  className="btn btn-success mx-1 text-center w-100"
                >
                  {intl.formatMessage({ id: "Save" })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="Rega_modal_add" aria-hidden="true">
        <SavePopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export default TableSideTab;
