import { ChangeEvent, FC, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import { EmployeeHierarchyPopup } from "./EmployeeHierarchyPopup";
import { ManagementHierarchyPopup } from "./ManagementHierarchyPopup";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupsWithVisitors } from "../../../redux/permissions-list-slice";
import { getAllLKPermissiontypes } from "../../../redux/permissions-type-slice";
import { RootState } from "../../../redux/store";

type PopupProps = {
  showAdd: boolean;
  handleClose: () => void;
  setPageIndexForGroups?: any
};

export const FilteringPermitGroups: FC<PopupProps> = ({
  showAdd,
  handleClose,
  setPageIndexForGroups
}) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  let [employeeId, setEmployeeId] = useState<string>("");
  let [employeeName, setEmployeeName] = useState<string>("");
  let [orgId, setOrgId] = useState<string>("");
  let [orgName, setOrgName] = useState<string>("");

  const StatementTypeOptions = [
    {
      id: "",
      name: intl.formatMessage({ id: "Choose" }),
    },
    {
      id: 0,
      name: "داخلي",
    },
    {
      id: 1,
      name: "دخول",
    },
  ];
  const [showEmployeePopup, setShowEmployeePopup] = useState<boolean>(false);
  const [showOrgsPopup, setShowOrgsPopup] = useState<boolean>(false);

  const PermitStatusOptions = [
    {
      id: "",
      name: intl.formatMessage({ id: "Choose" }),
    },
    {
      id: 2,
      name: "موافقة",
    },
    {
      id: 1,
      name: "سارية",
    },
    {
      id: 4,
      name: "منتهية",
    },
    {
      id: 3,
      name: "ملغية",
    },
    {
      id: 5,
      name: "مرفوضة",
    },
  ];

  const PreferencessOptions = [
    {
      id: "",
      name: intl.formatMessage({ id: "Choose" }),
    },
    {
      id: "true",
      name: "مفضل",
    },
    {
      id: "false",
      name: "غير مفضل",
    },
  ];
  const [filter, setFilter] = useState<any>({
    permissionType: "",
    permissionStatus: "",
    startDate: "",
    endDate: "",
    isFouvirte: "",
    search: "",
    visitorCount: "",
  });
  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prevFilter: any) => ({ ...prevFilter, [name]: value }));
  };
  const handleApplyFilter = async (e: React.FormEvent) => {
    const params = {
      permissionType: filter.permissionType,
      permissionStatus: filter.permissionStatus,
      startDate: filter.startDate,
      endDate: filter.endDate,
      isFouvirte: filter.isFouvirte,
      search: filter.search,
      recivedVisitingId: employeeId,
      orgId,
      visitorCount: filter?.visitorCount,
    };
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== "")
    );
    dispatch(fetchGroupsWithVisitors(filteredParams) as any);
    showSuccessAlert(true, "FilteredSuccessfully", intl, () => { });
    handleClose();
  };
  let handleCancel = () => {
    setFilter({
      permissionType: "",
      permissionStatus: "",
      startDate: "",
      endDate: "",
      isFouvirte: "",
      search: "",
      visitorCount: "",
    });
    setOrgId("");
    setOrgName("");
    setEmployeeId("");
    setEmployeeName("");
    setPageIndexForGroups(1)
  };

  useEffect(() => {
    dispatch(getAllLKPermissiontypes({}) as any)
  }, [])

  const permissionTypes = useSelector((state: RootState) => {
    return state?.permissionTypes?.permissionTypes;
  });
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
            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <div className="mb-4">
                <label htmlFor="VisitorName" className="mb-2">
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
                    name="search"
                    value={filter?.search}
                    onChange={handleFilterChange}
                    placeholder={intl.formatMessage({ id: "VisitorName" })}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <div className="mb-4">
                <label htmlFor="visitorCount" className="mb-2">
                  {intl.formatMessage({ id: "Number" })}
                </label>
                <div className="input-group position-relative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa-solid fa-hashtag fs-2"></i>
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    id="visitorCount"
                    name="visitorCount"
                    value={filter?.visitorCount}
                    onChange={handleFilterChange}
                    placeholder={intl.formatMessage({ id: "Number" })}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <label className="mb-2">
                <span>{intl.formatMessage({ id: "StatementType" })}</span>
              </label>
              <select
                id="StatementType"
                className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                data-placeholder="اختر"
                tabIndex={-1}
                aria-hidden="true"
                onChange={handleFilterChange}
                name="permissionType"
                value={filter?.permissionType}
              >
                {permissionTypes?.map((option) => {
                  return <option value={option?.id}>{intl.locale == "ar" ? option?.nameAr : option?.nameEn}</option>;
                })}
              </select>
            </div>
            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <label className="fs-6 fw-bold mb-2" htmlFor="classNameification">
                {intl.formatMessage({ id: "AuthorizingAuthority" })}{" "}
              </label>

              <div className="input-group ">
                <input
                  className="form-control"
                  placeholder={intl.formatMessage({
                    id: "ChooseAuthorizingAuthority",
                  })}
                  disabled
                  defaultValue={orgName}
                  readOnly
                />
                <div className="h-110 d-flex" role="button">
                  <span
                    className="input-group-text"
                    onClick={() => setShowOrgsPopup(true)}
                  >
                    <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="col-md-12 col-lg-4 col-12 mb-3">
              <label className="mb-2">
                <span>{intl.formatMessage({ id: "PermitStatus" })}</span>
              </label>
              <select
                id="PermitStatus"
                className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                data-placeholder="اختر"
                tabIndex={-1}
                aria-hidden="true"
                onChange={handleFilterChange}
                value={filter?.permissionStatus}
                name="permissionStatus"
              >
                {PermitStatusOptions?.map((option) => {
                  return (
                    <option
                      value={option?.id}
                      key={option?.id}
                      disabled={option?.id === "" ? true : false}
                    >
                      {option?.name}
                    </option>
                  );
                })}
              </select>
            </div> */}
            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <label className="mb-2">
                {intl.formatMessage({
                  id: "PermitStartDate",
                })}
              </label>
              <input
                className="form-control form-control-solid"
                type="date"
                placeholder={intl.formatMessage({ id: "PermitStartDate" })}
                onChange={handleFilterChange}
                value={filter?.startDate}
                name="startDate"
              />
            </div>
            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <label className="mb-2">
                {intl.formatMessage({
                  id: "PermitEndDate",
                })}
              </label>
              <input
                className="form-control form-control-solid"
                type="date"
                placeholder={intl.formatMessage({ id: "PermitEndDate" })}
                onChange={handleFilterChange}
                name="endDate"
                value={filter?.endDate}
              />
            </div>
            {/* <div className="col-md-12 col-lg-4 col-12 mb-3">
              <label className="mb-2">
                <span>{intl.formatMessage({ id: "Preferencess" })}</span>
              </label>
              <select
                id="Preferencess"
                className="form-select myform-control form-select-solid select2-hidden-accessible mt-1"
                data-placeholder="اختر"
                tabIndex={-1}
                aria-hidden="true"
                onChange={handleFilterChange}
                value={filter?.isFouvirte}
                name="isFouvirte"
              >
                {PreferencessOptions?.map((option) => {
                  return (
                    <option
                      value={option?.id}
                      key={option?.id}
                      disabled={option?.id === "" ? true : false}
                    >
                      {option?.name}
                    </option>
                  );
                })}
              </select>
            </div> */}
            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <div className="mb-4">
                <label htmlFor="VisitReceiver" className="mb-2">
                  {intl.formatMessage({ id: "VisitReceiver" })}
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
                    defaultValue={employeeName}
                    readOnly
                    disabled
                    placeholder={intl.formatMessage({ id: "VisitorName" })}
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
                      onClick={() => setShowEmployeePopup(true)}
                    ></i>
                  </div>
                </div>
              </div>
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
                handleCancel();
              }}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={(event) => {
                handleApplyFilter(event);
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

      <EmployeeHierarchyPopup
        show={showEmployeePopup}
        handleClose={() => setShowEmployeePopup(false)}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        setEmployeeName={setEmployeeName}
      />
      <ManagementHierarchyPopup
        show={showOrgsPopup}
        orgId={orgId}
        setOrgId={setOrgId}
        orgName={orgName}
        setOrgName={setOrgName}
        handleClose={() => {
          setShowOrgsPopup(false);
        }}
      />
    </>
  );
};
