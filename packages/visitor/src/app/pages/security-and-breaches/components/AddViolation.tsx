import { FC, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ManagementHierarchyPopup } from "@4eplatform/shared/src/popups/ManagementHierarchyPopup";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  AddViolationProps,
  AddViolationSchema,
} from "../../../validation/add-violation-validation";
import {
  getAllPermissionListController,
  getPermissionbyVistorid,
} from "../../../redux/violation-slice";
import { RootState } from "../../../redux/store";
import { ControllerPermissionModel } from "../../../model/controller-permission-model";
import { addViolation } from "../../../redux/violation-slice";
import { useNavigate } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";
import { getGroupsWithVisitors } from "../../../redux/violation-slice";
import { ControllerPermissionGroupModel } from "../../../model/controller-permission-group-model";
import { getGroupById } from "../../../redux/violation-slice";
import Select from 'react-select';
import { ActionMeta, SingleValue } from 'react-select';
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";


const AddViolation: FC = () => {
  const [uniqueNumber, setUniqueNumber] = useState<string | null>(null);
  const [permitType, setPermitType] = useState("One");
    const [permitNumberOfGroup, setPermitNumberOfGroup] = useState<string | null>(null);
    const [groupNumber, setGroupNumber] = useState<string | null>(null);
    const [visitorsNames, setVisitorsNames] = useState<any>([]);
    const [startDate , setStartDate] = useState<any>("");
    const [endDate , setEndDate] = useState<any>("");
  const handleRadioChange = (event: any) => {
    setPermitType(event.target.value);
    setUniqueNumber("");
    setGroupNumber("");
  };
  const intl = useIntl();
  const navigate = useNavigate();
  const [modalMShow, setModalMShow] = useState<boolean>(false);
  const [modalAddShow, setModalAddShow] = useState<boolean>(false);


  const [orgName, setOrgName] = useState<string | null>(null);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [visitorName, setVisitorName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddViolationProps>({
    resolver: yupResolver(AddViolationSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  let language: string = intl.locale;
  let dispatch = useDispatch();
  let permissionListControllers = useSelector((state: RootState) => {
    return state?.violation?.visitorControllerPermissionList;
  });
  let filteredpermissionListControllers =permissionListControllers?.filter((item : any) => item.permissionStatus == 1);
  let groupListControllers = useSelector((state: RootState) => {
    return state?.violation?.groupsWithVisitors;
  });
  const filteredGroupListControllers = groupListControllers?.filter((parent: any) => {
    return parent?.permissionListDto?.some((item: any) => 
      item?.permissionStatus === 1 
    );
  });
  // to get all ارقام التصاريح وارقام المجموعات
  useEffect(() => {
    if (permitType == "One") {
      dispatch(getAllPermissionListController({ pageSize: 1000 }) as any);
    } else if (permitType == "Group") {
      dispatch(getGroupsWithVisitors({ pageSize: 1000 }) as any);
    }
  }, [dispatch, permitType]);

  // ****************************************************
  const handleUniqueNumberChange = (
    newValue: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    if (!newValue) return; 
  
    const selectedValue = newValue.value;
  
    if (permitType === "One") {
      setUniqueNumber(selectedValue);
      setGroupNumber(""); 
    } else if (permitType === "Group") {
      setGroupNumber(selectedValue);
      setUniqueNumber(""); 
      setPermitNumberOfGroup(""); 
    }
  };
// ********************************************************
  useEffect(()=>{
    if (uniqueNumber && permitType == "One") {
      let params = { Visitor_ID: uniqueNumber };
      dispatch(getPermissionbyVistorid(params) as any);
    }
  },[uniqueNumber])

  useEffect(()=>{
    if (groupNumber && permitType == "Group") {
      dispatch(getGroupById({ Gruopid: groupNumber }) as any);
    }
  },[groupNumber])
    // to get by id
    let detailsPermissionByPermissionNumber = useSelector((state: RootState) => {
      return state?.violation?.visitorDetails;
    });
  
  // get group visitors
    let detailsGroupPermissionByGroupNumber= useSelector((state: RootState) => {
      return state?.violation?.groupDetails;
    });
// ********************************************************************
  let [permission, setPermission] = useState<any>({});
  useEffect(() => {
    if (uniqueNumber && permitType == "One") {
      setPermission(detailsPermissionByPermissionNumber);
    }
    else {
      setPermission({});
    }
  }, [
    uniqueNumber,
    detailsPermissionByPermissionNumber,
    permitType
  ]);

  useEffect(() => {
    if (permitType === "One" && permission) {
      setOrgName(permission?.orgName || "");
      setVisitorId(permission?.visitorId || "");
      setVisitorName(permission?.visitorName || "");
      setStartDate(permission?.startDate);
      setEndDate(permission?.endDate)
    }
  }, [permission, permitType]);

  //*************** */

  const handleGroupVisitorsChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
      const selectedValue = event.target.value;
      setPermitNumberOfGroup(selectedValue);
      let params = { Visitor_ID: selectedValue };
      dispatch(getPermissionbyVistorid(params) as any);
  };
  useEffect(() => {
    if (groupNumber && permitType == "Group") {
      setVisitorsNames(detailsGroupPermissionByGroupNumber);
    }
    else {
      setVisitorsNames([]);
    }
  }, [groupNumber, permitType, detailsGroupPermissionByGroupNumber]);
 
  let [detailsOnePermissionOfGroup, setDetailsOnePermissionOfGroup] = useState<any>({});
  useEffect(() => {
    if (permitNumberOfGroup && permitType == "Group") {
      setDetailsOnePermissionOfGroup(detailsPermissionByPermissionNumber);
    }
    else {
      setDetailsOnePermissionOfGroup({});
    }
  }, [
    permitNumberOfGroup,
    detailsPermissionByPermissionNumber,
    permitType
  ]);

  useEffect(() => {
    if (detailsOnePermissionOfGroup && permitType == "Group") {
      setOrgName(detailsOnePermissionOfGroup?.orgName || "");
      setVisitorId(detailsOnePermissionOfGroup?.visitorId || "");
      setVisitorName(detailsOnePermissionOfGroup?.visitorName || "");
      setStartDate(detailsOnePermissionOfGroup?.startDate);
      setEndDate(detailsOnePermissionOfGroup?.endDate)
    } 
  }, [detailsOnePermissionOfGroup ,permitType]);
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

  const handleAddViolation = async (formValues: AddViolationProps) => {
    if (!visitorId && permitType == "One" ) {
      showSuccessAlert(false,"PleaseEnterAPermitNumber",intl);
      return;
    }
    if (!visitorId   && permitType == "Group" ) {
      showSuccessAlert(false,"PleaseSelectOffendingVisitor",intl)
      return;
    }
    let formdata = new FormData();
    formdata.append("violationDto.Violationtype", formValues?.Violationtype);
    formdata.append("violationDto.Date", formValues?.Date);
    formdata.append("violationDto.Description", formValues?.Description);
    formdata.append("violationDto.VisitorId", visitorId || "");
    if (selectedFilesForAttachments) {
      selectedFilesForAttachments.forEach((file) => {
        formdata.append("violationDto.Attachment", file);
      });
    }
    formdata.append("violationDto.Location", formValues?.Location || "");
    if (formValues?.Date && startDate) {
      const formDate = new Date(formValues.Date);
      const formStartDate = new Date(startDate);
      if (formDate < formStartDate) {
        showSuccessAlert(false,"ViolationDateMustBeAfterTheStartDateOfPermit", intl);
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
              "AddedSuccessfully",intl
            );
            reset();
            setSelectedFilesForAttachments([]);
            navigate("/security-and-breaches", {
              state: {
                cardTitle: cardName,
              },
            });
            setUniqueNumber("");
            setOrgName("");
            setVisitorName("");
          } else {
            showSuccessAlert(
              false,
            res?.payload?.message ,intl
            );
          }
        }
      );
    } catch (error) {
    }
  };
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

  const options = permitType === "One" 
  ? filteredpermissionListControllers?.map((item: ControllerPermissionModel) => ({
      value: item?.vistorId,
      label: new Intl.NumberFormat('en-US').format(item?.permissionNumber) ,

    }))
  : permitType === "Group" 
    ? filteredGroupListControllers?.map((item: ControllerPermissionGroupModel) => ({
        value: item?.id,
        label: new Intl.NumberFormat('en-US').format(item?.groupNamber) ,

      }))
    : [];

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
              <div className="card-body row">
                <div className="col-lg-4 col-md-6 col-12 my-8">
                  <div>
                    <label
                      htmlFor="PermitWork"
                      className="form-label mx-2 px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "PerpetratorOfViolation" })}
                    </label>
                    <div className="form-control form-control-solid d-flex px-2">
                      <div className="d-flex flex-nowrap">
                        <input
                          type="radio"
                          name="PermitType"
                          id="PermitWorkEnable"
                          className="form-check-input"
                          value="One"
                          defaultChecked={permitType === "One"}
                          onChange={handleRadioChange}
                        />
                        <label
                          htmlFor="PermitWorkEnable"
                          className="mx-2 text-nowrap"
                        >
                          {intl.formatMessage({ id: "One" })}
                        </label>
                      </div>
                      <div className="mx-2 d-flex flex-nowrap">
                        <input
                          type="radio"
                          name="PermitType"
                          id="PersonalVisitPermitDisable"
                          className="form-check-input"
                          value="Group"
                          defaultChecked={permitType === "Group"}
                          onChange={handleRadioChange}
                        />
                        <label
                          htmlFor="PersonalVisitPermitDisable"
                          className="mx-2 text-nowrap"
                        >
                          {intl.formatMessage({ id: "Group" })}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12 my-8">
                  <label className="mb-2">
                    <span>
                      {permitType === "One"
                        ? intl.formatMessage({ id: "PermitNumber" })
                        : intl.formatMessage({ id: "GroupNumber" })}
                    </span>
                  </label>
                
                  <Select
                    className="react-select__container"
                    classNamePrefix="react-select"
                    id="uniqueNumber"
                    placeholder={
                    permitType === "One"
                      ? intl.formatMessage({ id: "PermitNumber" })
                        : intl.formatMessage({ id: "GroupNumber" })
                        }
                        options={options}
                        onChange={handleUniqueNumberChange}
                        value={
                          permitType === "One" && uniqueNumber
                          ? {
                            value: uniqueNumber,
                            label: String(
                              filteredpermissionListControllers?.find(
                                (item : any) => item.vistorId === uniqueNumber
                              )?.permissionNumber
                            ), 
                          }
                          : permitType === "Group" && groupNumber
                          ? {
                            value: groupNumber,
                            label: String(
                              filteredGroupListControllers?.find(
                                (item :any) => item?.id === groupNumber
                              )?.groupNamber
                            ),
                          }
                          : null
                          }
                          filterOption={(option:any, searchText:any) => {
                            if (!searchText) return true;
                            const label = option?.label?.toString().toLowerCase();
                            const search = searchText.toLowerCase();
                            return label.includes(search);
                          }}
                        />
                                        </div>
                      {permitType == "One" && (
                      <div className="col-lg-4 col-md-6 col-12 my-8">
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
            )}
                {permitType == "Group" && (
                  <div className="col-lg-4 col-md-6 col-12 my-8">
                    <label className="mb-2">
                      <span>
                        {intl.formatMessage({ id: "OffendingVisitor" })}
                      </span>
                    </label>
                    <select
                      className="form-select form-select-solid"
                      id="OffendingVisitor"
                      onChange={handleGroupVisitorsChange}
                      value={permitNumberOfGroup || ""}
                      style={{ maxHeight: "100px", overflowY: "auto" }}
                    >
                      <option value="" disabled selected>
                      {intl.formatMessage({ id: "OffendingVisitor" })}
                      </option>{" "}
                      {visitorsNames?.visitor?.filter((item: any) => item.permissionStatus == 1)?.map((item: any) => (
                          <option key={item?.vistorId} value={item?.vistorId}>
                              {item?.vistorName}
                          </option>
                      ))}
                    </select>
                  </div>
                )} 
                <div className="col-lg-4 col-md-6 col-12 my-8">
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
                <div className="col-lg-4 col-md-6 col-12 my-8">
                  <label className="mb-2 required" htmlFor="typeOfViolation">
                    <span>{intl.formatMessage({ id: "TypeOfViolation" })}</span>
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
                    {DisplayErrorMessage(errors?.Violationtype?.message, intl,language)}
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12 my-8">
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
                    min={startDate}
                    max={endDate}
                  />
                  {DisplayErrorMessage(errors?.Date?.message, intl,language)}
                </div>
                <div className="col-lg-6 col-md-6 col-12 my-8">
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
                <div className="col-lg-6 col-md-6 col-12 my-8">
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

                <div className=" col-12 my-8">
                  <label className="form-label px-2  fontSz-6">
                    {intl.formatMessage({ id: "ATTACHMENTS" })}
                  </label>
                  <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-fit">
                    <label
                      htmlFor="outputAttachment1"
                      className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
                    >
                      <div role="button" className="d-flex align-items-center">
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

                <div className="col-12 col-lg-7 mb-7 mt-10 my-8">
                  <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
                    <div className="d-flex justify-content-end align-items-center w-50">
                      <Link
                        to="/security-and-breaches"
                        className="btn btn-secondary mx-1 text-center"
                        state={{
                          cardTitle: cardName,
                        }}
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
export default AddViolation;
