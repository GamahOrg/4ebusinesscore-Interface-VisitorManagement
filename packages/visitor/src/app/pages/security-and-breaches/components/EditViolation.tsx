import { FC, useState , useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Link } from "react-router-dom";
import { ManagementHierarchyPopup } from '@4eplatform/shared/src/popups/ManagementHierarchyPopup';
import { SavePopup } from '@4eplatform/shared/src/popups/SavePopup';
import { useLocation } from "react-router-dom";
import { getPermissionbyVistorid } from '../../../redux/violation-slice';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../redux/store';
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  EditViolationProps,
  EditViolationSchema,
} from "../../../validation/edit-violation-validation";
import { editViolation } from '../../../redux/violation-slice';
import { useParams } from "react-router-dom";
import { getOneViolationByViolationID } from '../../../redux/violation-slice';
import { useNavigate } from "react-router-dom";
import { DeleteViolationPopup } from '../popup/delete-violation-popup';
import { VisitorRootUrl } from "@4eplatform/shared/apis/visitor";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

const EditViolation: FC = () => {
  const intl = useIntl();
  const [modalMShow, setModalMShow] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const location = useLocation();
  const visitorId = location?.state?.visitorId
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [uniqueNumber, setUniqueNumber] = useState<any | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);
  let dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let params = {
      Visitor_ID : visitorId
    }
      dispatch(getPermissionbyVistorid(params) as any);
         }, [visitorId]);
  let detailsPermissionByVisitorId = useSelector((state: RootState) => {
    return state?.violation?.visitorDetails;
  });
useEffect(() => {
  if (detailsPermissionByVisitorId) {
    setVisitorName(detailsPermissionByVisitorId?.visitorName || "");
    setUniqueNumber(detailsPermissionByVisitorId?.permissionNumber);
    setOrgName(detailsPermissionByVisitorId?.orgName || "");
  }
}, [detailsPermissionByVisitorId]);
// id refer to violationId
const { id } = useParams();
useEffect(() => {
  if (id) {
    dispatch(getOneViolationByViolationID({
      ViolationId:id,
    }) as any);
  }
}, [id]);
const violationDetails = useSelector((state: RootState) => {
  return state?.violation?.violationDetails
});
const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
useState<any[]>([]);
useEffect(() => {
  if (violationDetails) {
    setSelectedFilesForAttachments(violationDetails?.attachments)
    setValue("Violationtype", violationDetails?.violationtype);
    setValue(
      "Date",
      moment(violationDetails?.date).format("YYYY-MM-DD")
    );
    setValue("Description", violationDetails?.description);
    setValue("Location", violationDetails?.location);
  }
}, [violationDetails]);

const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

const {
  register,
  handleSubmit,
  watch,
  setValue,
  formState: { errors },
} = useForm<EditViolationProps>({
  resolver: yupResolver(EditViolationSchema),
  mode: "all",
  reValidateMode: "onSubmit",
});

const handleEditViolation = async (formValues: EditViolationProps) => {
  let formdata = new FormData();
  formdata.append("ViolationId",id || "");
  formdata.append("violationDto.Violationtype", formValues?.Violationtype);
  formdata.append("violationDto.Date", formValues?.Date);
  formdata.append("violationDto.Description", formValues?.Description);
  formdata.append("violationDto.VisitorId",visitorId || "" );
  if(selectedFilesForAttachments){
    selectedFilesForAttachments.forEach((file)=>{
      if(file?.size){
        // new sendFile
        formdata.append("violationDto.Attachment",file);
      } else{
        // old
        formdata.append("violationDto.OldAttachment",file?.id );
      }
    })
    }
  formdata.append("violationDto.Location", formValues?.Location || "");
  try {
    const result = await dispatch(editViolation(formdata) as any).then(
      (res: any) => {
        if (res?.payload?.statusEnum == 3 && res?.payload?.message == "Violation Edit successfully") {
          showSuccessAlert(
            true,
          "ViolationEditSuccessfully",intl
          );
          navigate(`/security-and-breaches/view-violation/${visitorId}`)
        } else if (res?.payload?.message == "Violation  Not Found"){
          showSuccessAlert(false, res?.payload?.message ,intl);
        }
        else {
          showSuccessAlert(false,res?.payload?.message,intl);
        }
      }
    );
  } catch (error) {
  }  
};
const language: string = intl.locale;


const getIconSrc = (fileName: string, file: any) => {
  if (file instanceof File && 
    file?.name?.endsWith(".png") ||
    file?.name?.endsWith(".jpg") ||
    file?.name?.endsWith(".jpeg") ||
    file?.name?.endsWith(".jfif") ||
    file?.name?.endsWith(".webp")
  ) {
    return URL.createObjectURL(file);
  }
  // old attachments images
  if (
    fileName?.endsWith(".png") ||
    fileName?.endsWith(".jpg") ||
    fileName?.endsWith(".jpeg") ||
    fileName?.endsWith(".jfif") ||
    fileName?.endsWith(".webp")
  ) {
    return  `${VisitorRootUrl}${file?.filePath}` 
  } 
  else if (fileName?.endsWith(".pdf") || file?.name?.endsWith(".pdf")) {
    return "/media/pmo/pdfIcon.png";
  } 
  else if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx") || file?.name?.endsWith(".docx") || file?.name?.endsWith(".doc") ) {
    return "/media/pmo/wordIcon2.jpg";
  } else if (fileName?.endsWith(".xls") || fileName?.endsWith(".xlsx") || file?.name?.endsWith(".xls") ||  file?.name?.endsWith(".xlsx") ) {
    return "/media/pmo/excelIcon2.jpg";
  } else if (fileName?.endsWith(".txt") || file?.name?.endsWith(".txt")  ) {
    return "/media/pmo/textIcon.png";
  } else if (
    fileName?.endsWith(".mp4") ||
    fileName?.endsWith(".webm") ||
    fileName?.endsWith(".avi") ||
    fileName?.endsWith(".mkv") ||
    fileName?.endsWith(".flv") ||
    fileName?.endsWith(".ts") ||
    file?.name?.endsWith(".mp4") ||
    file?.name?.endsWith(".webm") ||
    file?.name?.endsWith(".avi") ||
    file?.name?.endsWith(".mkv") ||
    file?.name?.endsWith(".flv") ||
    file?.name?.endsWith(".ts") 
  ) {
    return "/media/pmo/video.png";
  } else if (
    fileName?.endsWith(".ppt") ||
    fileName?.endsWith(".pptx") ||
    fileName?.endsWith(".pptm") ||
    fileName?.endsWith(".pps") ||
    fileName?.endsWith(".ppsx") ||
    fileName?.endsWith(".ppsm") ||
    file?.name?.endsWith(".ppt") ||
    file?.name?.endsWith(".pptx") ||
    file?.name?.endsWith(".pptm") ||
    file?.name?.endsWith(".pps") ||
    file?.name?.endsWith(".ppsx") ||
    file?.name?.endsWith(".ppsm") 
  ) {
    return "/media/pmo/powerPointIcon.png";
  }
};
let cardName = location?.state?.cardTitle;
const breadcrumbItems = [
  {
    path: "/security-and-breaches",
    defaultName: "SecurityAndBreaches",
    name: cardName,
  },
  { path: "", defaultName: "EditViolation", name: "" },
];
  return (
    <>
      <DynamicToolbar
        defaultTitle={"EditViolation"}
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
                  <span className="card-label fs-4 my-5 ">{intl.formatMessage({ id: "EditViolation" })}</span>
                  <span className="mt-1 fw-semibold fs-6 text-muted my-5">{intl.formatMessage({ id: "PleaseEnterTheData" })}</span>
                </h3>
              </div>
              <form 
              onSubmit={handleSubmit(handleEditViolation)}
              >
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4 col-12">
                    <label className="mb-2">
                      <span>{intl.formatMessage({ id: "PermitNumber" })}</span>   
                      </label>
                      <div className="input-group ">
                        <input
                          className="form-control"
                          placeholder ={intl.formatMessage({ id: "PermitNumber" }) }
                          value={uniqueNumber ?? ""}
                          readOnly
                          disabled
                        />
                      </div>
                  </div>
                  <div className="col-sm-4 col-12">
                      <label className="mb-2">
                        <span>
                          {intl.formatMessage({ id: "OffendingVisitor" }) }
                        </span>
                      </label>
                      <div className="input-group ">
                        <input
                          className="form-control"
                          placeholder ={intl.formatMessage({ id: "OffendingVisitor" }) }
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
                          <span
                            className="input-group-text"
  
                          >
                            <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="row my-8">
                <div className="col-sm-4 col-12">
                      <label
                        className="mb-2 required"
                        htmlFor="typeOfViolation"
                      >
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
                        {...register("Date")}
                      />
                      {DisplayErrorMessage(errors?.Date?.message, intl,language)}
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
                        {DisplayErrorMessage(
                          errors?.Location?.message,
                          intl,language
                        )}
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
                      htmlFor="violationAttachment"
                      className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
                    >
                      <div role="button" className="d-flex align-items-center">
                      {selectedFilesForAttachments?.length > 0 ? (
                          <>
                            <div>
                              <ul className="d-flex align-items-center flex-wrap">
                                {selectedFilesForAttachments?.map(
                                  (file : any, index:any) => (
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
                                        src={getIconSrc(file?.fileName, file)}
                                      />
                                      <div className="mx-1">{file?.fileName || file?.name}</div>
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
                                        onClick={() => handleFileDelete(index)}
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
                          id="violationAttachment"
                          name="attachments1"
                          onChange={handleFileInputChange}
                          placeholder={intl.formatMessage({ id: "FileUpload" })}
                          className="dropzone-select  uploadFile-style inputAreaHeight d-none w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                  </div>
                <div className="col-12 col-lg-7 mb-7 mt-10">
                  <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
                    <div className="d-flex justify-content-center align-items-center w-50">
                    <div
                        className="btn btn-danger mx-1 text-center"
                        style={{ textAlign: "right" }}
                        onClick={() => setModalDShow(true)}
                      >
                        {intl.formatMessage({ id: "Delete" })}
                      </div>
                      <Link
                        to={`/security-and-breaches/view-violation/${visitorId}`}
                        className="btn btn-secondary mx-1 text-center"
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </Link>
                      <button
                        className="btn btn-primary  mx-1 text-center"
                        type="submit"
                      >
                        {intl.formatMessage({ id: "Save" })}
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
      <div className="modal fade" id="Rega_modal_add" aria-hidden="true">
        <SavePopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <DeleteViolationPopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
          violationId={id} />
      </div>
    </>
  )
}
export default EditViolation;

