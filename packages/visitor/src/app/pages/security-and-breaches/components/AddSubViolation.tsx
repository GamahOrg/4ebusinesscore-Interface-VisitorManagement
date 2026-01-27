import { FC, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ManagementHierarchyPopup } from "@4eplatform/shared/src/popups/ManagementHierarchyPopup";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useParams } from "react-router";
import {
  AddViolationProps,
  AddViolationSchema,
} from "../../../validation/add-violation-validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addViolation } from "../../../redux/violation-slice";
import { getPermissionbyVistorid } from "../../../redux/violation-slice";
import { useNavigate } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

const AddSubViolation: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [modalMShow, setModalMShow] = useState<boolean>(false);
  const [modalAddShow, setModalAddShow] = useState<boolean>(false);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddViolationProps>({
    resolver: yupResolver(AddViolationSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  let language: string = intl.locale;
  let dispatch = useDispatch();
  const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
    useState<File[]>([]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      setSelectedFilesForAttachments((prevFiles) => [
        ...prevFiles,
        ...Array.from(files),
      ]);
    }
  };
  const handleFileDelete = (indexToRemove: any) => {
    const updatedFiles = selectedFilesForAttachments.filter(
      (file: any, index: any) => index !== indexToRemove
    );
    setSelectedFilesForAttachments(updatedFiles);
  };
  const getIconSrc = (fileName: string, file: any) => {
    if (
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".jpeg") ||
      fileName?.endsWith(".jfif") ||
      fileName?.endsWith(".webp")
    ) {
      return URL.createObjectURL(file);
    } else if (fileName?.endsWith(".pdf")) {
      return "/media/pmo/pdfIcon.png";
    } else if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx")) {
      return "/media/pmo/wordIcon2.jpg";
    } else if (fileName?.endsWith(".xls") || fileName?.endsWith(".xlsx")) {
      return "/media/pmo/excelIcon2.jpg";
    } else if (fileName?.endsWith(".txt")) {
      return "/media/pmo/textIcon.png";
    } else if (
      fileName?.endsWith(".mp4") ||
      fileName?.endsWith(".webm") ||
      fileName?.endsWith(".avi") ||
      fileName?.endsWith(".mkv") ||
      fileName?.endsWith(".flv") ||
      fileName?.endsWith(".ts")
    ) {
      return "/media/pmo/video.png";
    } else if (
      fileName?.endsWith(".ppt") ||
      fileName?.endsWith(".pptx") ||
      fileName?.endsWith(".pptm") ||
      fileName?.endsWith(".pps") ||
      fileName?.endsWith(".ppsx") ||
      fileName?.endsWith(".ppsm")
    ) {
      return "/media/pmo/powerPointIcon.png";
    }
  };
  const [startDate , setStartDate] = useState<any>("");
  const [endDate , setEndDate] = useState<any>("");
  const handleAddViolation = async (formValues: AddViolationProps) => {
    let formdata = new FormData();
    formdata.append("violationDto.Violationtype", formValues?.Violationtype);
    formdata.append("violationDto.Date", formValues?.Date);
    formdata.append("violationDto.Description", formValues?.Description);
    formdata.append("violationDto.VisitorId", id || "");
    if (selectedFilesForAttachments) {
      selectedFilesForAttachments.forEach((file) => {
        formdata.append("violationDto.Attachment", file);
      });
    }
    formdata.append("violationDto.Location", formValues?.Location || "");
    if (formValues?.Date && detailsPermissionByVisitorId?.startDate) {
      const formDate = new Date(formValues.Date);
      const startDate = new Date(detailsPermissionByVisitorId.startDate);
      if (formDate < startDate) {
        showSuccessAlert(false,"ViolationDateMustBeAfterTheStartDateOfPermit",intl); 
        return;
      }
    }
    try {
      const result = await dispatch(addViolation(formdata) as any).then(
        (res: any) => {
          if (
            res?.payload?.statusEnum == 3 &&
            res?.payload?.message == "Violation Added successfully"
          ) {
            showSuccessAlert(
              true,
           "AddedSuccessfully",
           intl
            );
            reset();
            setSelectedFilesForAttachments([]);
            navigate("/security-and-breaches", {
              state: {
                cardTitle: cardName,
              },
            });
          } else {
            showSuccessAlert(false,res?.payload?.message , intl);
          }
        }
      );
    } catch (error) {
    }
  };
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [uniqueNumber, setUniqueNumber] = useState<any | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);

  useEffect(() => {
    let params = {
      Visitor_ID: id,
    };
    dispatch(getPermissionbyVistorid(params) as any);
  }, [id]);

  let detailsPermissionByVisitorId = useSelector((state: RootState) => {
    return state?.violation?.visitorDetails;
  });
  useEffect(() => {
    if (detailsPermissionByVisitorId) {
      setVisitorName(detailsPermissionByVisitorId?.visitorName || "");
      setUniqueNumber(detailsPermissionByVisitorId?.permissionNumber);
      setOrgName(detailsPermissionByVisitorId?.orgName || "");
      setStartDate(detailsPermissionByVisitorId?.startDate || "");
      setEndDate(detailsPermissionByVisitorId?.endDate || "");
    }
  }, [detailsPermissionByVisitorId]);

  let location = useLocation();
  let cardName = location?.state?.cardTitle;
  const breadcrumbItems = [
    {
      path: "/security-and-breaches",
      defaultName: "SecurityAndBreaches",
      name: cardName,
    },
    { path: "", defaultName: "AddViolation", name: "" },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle={"AddViolation"}
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName}
        fixedTitle={true}
      />
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div className="card">
            <div className="card-header px-3 pt-3 pb-2 mb-3">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fs-4 my-5 ">
                  {intl.formatMessage({ id: "AddViolation" })}
                </span>
                <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                  {intl.formatMessage({ id: "PleaseEnterTheData" })}
                </span>
              </h3>
            </div>
            <form onSubmit={handleSubmit(handleAddViolation)}>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4 col-12">
                    <label className="mb-2">
                      <span>{intl.formatMessage({ id: "PermitNumber" })}</span>
                    </label>
                    <div className="input-group ">
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({ id: "PermitNumber" })}
                        value={uniqueNumber}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 col-12">
                    <label className="mb-2">
                      <span>
                        {intl.formatMessage({ id: "OffendingVisitor" })}
                      </span>
                    </label>
                    <div className="input-group ">
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "OffendingVisitor",
                        })}
                        value={visitorName || ""}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 col-12">
                    <label className="fs-6 fw-bold mb-2" htmlFor="region">
                      {intl.formatMessage({ id: "TheRegion" })}{" "}
                    </label>
                    <div className="input-group ">
                      <input
                        className="form-control"
                        id="region"
                        placeholder={intl.formatMessage({
                          id: "Management",
                        })}
                        value={orgName || ""}
                        readOnly
                        disabled
                      />
                      <div className="h-110 d-flex" role="button">
                        <span className="input-group-text">
                          <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row my-8">
                  <div className="col-sm-4 col-12">
                    <label className="mb-2 required" htmlFor="typeOfViolation">
                      <span>
                        {intl.formatMessage({ id: "TypeOfViolation" })}
                      </span>
                    </label>
                    <div className="input-group ">
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "TypeOfViolation",
                        })}
                        type="text"
                        id="typeOfViolation"
                        {...register("Violationtype")}
                      />
                      {DisplayErrorMessage(
                        errors?.Violationtype?.message,
                        intl,language
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4 col-12">
                    <label
                      htmlFor="violationDate"
                      className="form-label px-2  fontSz-6 required "
                    >
                      {intl.formatMessage({ id: "ViolationDate" })}
                    </label>
                    <input
                      id="violationDate"
                      type="date"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                      placeholder={intl.formatMessage({
                        id: "ViolationDate",
                      })}
                      min={startDate}
                      max={endDate}
                      {...register("Date")}
                    />
                    {DisplayErrorMessage(errors?.Date?.message, intl ,language)}
                  </div>
                  <div className="col-sm-4 col-12">
                    <label
                      className="fs-6 fw-bold mb-2"
                      htmlFor="locationOfTheViolation"
                    >
                      {intl.formatMessage({ id: "LocationOfTheViolation" })}{" "}
                    </label>
                    <div className="input-group ">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-map-marker special"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "LocationOfTheViolation",
                        })}
                        type="text"
                        id="locationOfTheViolation"
                        {...register("Location")}
                      />
                      {DisplayErrorMessage(errors?.Location?.message, intl,language)}
                    </div>
                  </div>
                </div>
                <div className="row my-8">
                  <div className="col-sm-12 col-12">
                    <label className="mb-2 required">
                      <span>
                        {intl.formatMessage({ id: "ViolationDetails" })}
                      </span>
                    </label>
                    <textarea
                      className="form-control form-control-solid"
                      placeholder={intl.formatMessage({
                        id: "ViolationDetails",
                      })}
                      {...register("Description")}
                    />
                    {DisplayErrorMessage(errors?.Description?.message, intl,language)}
                  </div>
                </div>
                <div className="row my-8 d-flex align-items-center">
                  <div className="col-12 col-sm-12 ">
                    <label className="form-label px-2  fontSz-6">
                      {intl.formatMessage({ id: "ATTACHMENTS" })}
                    </label>
                    <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-fit">
                      <label
                        htmlFor="outputAttachment1"
                        className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
                      >
                        <div
                          role="button"
                          className="d-flex align-items-center"
                        >
                          {selectedFilesForAttachments?.length > 0 ? (
                            <>
                              <div>
                                <ul className="d-flex align-items-center flex-wrap">
                                  {selectedFilesForAttachments?.map(
                                    (file: any, index: any) => (
                                      <li
                                        key={index}
                                        className="d-flex align-items-center my-2 mx-2 position-relative"
                                      >
                                        <img
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                          }}
                                          src={getIconSrc(file?.name, file)}
                                          className={file?.name}
                                        />
                                        <div className="mx-1">{file.name}</div>
                                        <div
                                          style={{
                                            position: "absolute",
                                            top: "-10px",
                                            left: "-10px",
                                            height: "15px",
                                            width: "15px",
                                            borderRadius: "50%",
                                            backgroundColor: "red",
                                            display: "flex",
                                            color: "black",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                          onClick={() =>
                                            handleFileDelete(index)
                                          }
                                        >
                                          x
                                        </div>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </>
                          ) : (
                            <>
                              <img
                                style={{
                                  width: "50px",
                                  display: "inline-block",
                                  marginLeft: "10px",
                                }}
                                src="/media/pmo/uploadFile.png"
                                className="img-fluid"
                              />
                              <div
                                className="row py-auto"
                                style={{ position: "relative", top: "-7px" }}
                              >
                                <span className="text-primary fw-bolder">
                                  {intl.formatMessage({
                                    id: "QuickFileUploader",
                                  })}
                                </span>
                                <span>
                                  {" "}
                                  {intl.formatMessage({
                                    id: "DragAndDropOrChooseFilesFromComputer",
                                  })}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </label>
                      <div
                        className="dropzone dropzone-queue "
                        id="kt_dropzonejs_example_3"
                      >
                        <div className="dropzone-panel">
                          <input
                            multiple
                            type="file"
                            id="outputAttachment1"
                            name="attachments1"
                            onChange={handleFileInputChange}
                            placeholder={intl.formatMessage({
                              id: "FileUpload",
                            })}
                            className="dropzone-select  uploadFile-style inputAreaHeight d-none w-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-7 mb-7 mt-10">
                  <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
                    <div className="d-flex justify-content-end align-items-center w-50">
                      <Link
                        to="/security-and-breaches"
                        state={{
                          cardTitle: cardName,
                        }}
                        className="btn btn-secondary mx-1 text-center"
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </Link>
                      <button
                        className="btn btn-success mx-1 text-center"
                        type="submit"
                      >
                        {intl.formatMessage({ id: "Add" })}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="Rega_modal_viewallcards_hierarchy"
        aria-hidden="true"
      >
        <ManagementHierarchyPopup
          show={modalMShow}
          handleClose={() => setModalMShow(false)}
        />
      </div>
      <AddPopup
        show={modalAddShow}
        handleClose={() => setModalAddShow(false)}
      />
    </>
  );
};
export default AddSubViolation;
