import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { RiFilter2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  fetchMyPermissions,
  fetchMyPermissionsGroup,
} from "../../../redux/permissions-list-slice";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import PermitsListTableRowGenratorForMember from "./PermitsListTableRowGeneratorForMember";
import PermitsListTableRowGenratorForGroup from "./PermitsListTableRowGenratorForGroup";
import PermitsListTableRowGenratorForMemberInGroup from "./PermitsListTableRowGenratorForMemberInGroup";
import { FilteringPermitGroups } from "../popup/FilteringPermitGroups";
import { FilteringPermitMembers } from "../popup/FilteringPermitMembers";
import { FilteringPermitStatus } from "../popup/FilteringPermitsStatus";
import PermitStatusFilter from "./PermitStatusFilter";
import { Spinner } from "react-bootstrap";
interface PermitsListTableProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function PermitsListTable({
  searchTerm,
  setSearchTerm,
}: PermitsListTableProps) {
  const intl = useIntl();
  const [showPemritStatusFilter, setShowPemritStatusFilter] = useState(false);
  const [showMemberFilter, setShowMemberFilter] = useState(false);
  const [showGroupFilter, setShowGroupFilter] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const handleToggle = (groupId: string) => {
    if (expandedGroups.includes(groupId)) {
      setExpandedGroups(expandedGroups?.filter((id) => id !== groupId));
    } else {
      setExpandedGroups([...expandedGroups, groupId]);
    }
  };
  const types = [
    {
      id: 1,
      name: intl.formatMessage({ id: "One" }),
      type: "Person",
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Group" }),
      type: "Group",
    },
  ];
  const [activeStep, setActiveStep] = useState<any>(types[0]);

  useEffect(() => {
    setActiveStep(types[0]);
  }, []);
  const [pageSizeForMember, setPageSizeForMember] = useState<number>(10);
  const [pageIndexForMember, setPageIndexForMember] = useState<number>(1);
  const [pageSizeForGroups, setPageSizeForGroups] = useState<number>(10);
  const [pageIndexForGroups, setPageIndexForGroups] = useState<number>(1);

  const [filter, setFilter] = useState<any>({
    permissionType: "",
    permissionStatus: "",
    startDate: "",
    endDate: "",
    isFouvirte: "",
    search: "",
    orgId: "",
    employeeId: "",
  });
  let [employeeId, setEmployeeId] = useState<string>("");
  let [orgId, setOrgId] = useState<string>("");

  let permissionsListForMember = useSelector((state: RootState) => {
    return state?.permissionsList?.myPermissions;
  });
  let totalPagesOfPermissionsListForMember = useSelector((state: RootState) => {
    return state?.permissionsList?.paginationForMyPermissions?.totalPages;
  });
  let totalItemsOfPermissionsListForMember = useSelector((state: RootState) => {
    return state?.permissionsList?.paginationForMyPermissions?.totalItems;
  });
  let permissionsListForGroups = useSelector((state: RootState) => {
    return state?.permissionsList?.myPermissionsGroup;
  });
  let totalPagesOfPermissionsListForGroups = useSelector((state: RootState) => {
    return state?.permissionsList?.paginationForMyPermissionsGroup?.totalPages;
  });
  let totalItemsOfPermissionsListForGroups = useSelector((state: RootState) => {
    return state?.permissionsList?.paginationForMyPermissionsGroup?.totalItems;
  });

  //Loading states
  const loadingMyPermissions = useSelector(
    (state: RootState) => state.permissionsList.loadingMyPermissions
  );
  const loadingMyPermissionsGroup = useSelector(
    (state: RootState) => state.permissionsList.loadingMyPermissionsGroup
  );
  let dispatch = useDispatch();

  useEffect(() => {
    //to execlude permission status from the filter
    const { permissionStatus, ...rest } = filter;

    let params = {
      pagesize: pageSizeForGroups,
      pageIndex: pageIndexForGroups,
      search: searchTerm,
      permissionStatus:
        filter.permissionStatus == "all" ? "" : filter.permissionStatus,
      ...rest,
    };
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== "")
    );
    if (activeStep?.type !== "Person") {
      dispatch(fetchMyPermissionsGroup(filteredParams) as any);
    }
  }, [pageIndexForGroups, pageSizeForGroups, searchTerm, activeStep, filter]);

  useEffect(() => {
    let params = {
      pagesize: pageSizeForMember,
      pageIndex: pageIndexForMember,
      search: searchTerm || filter.search,
      permissionType: filter.permissionType,
      permissionStatus:
        filter.permissionStatus == "all" ? "" : filter.permissionStatus,
      startDate: filter.startDate,
      endDate: filter.endDate,
      isFouvirte: filter.isFouvirte,
      recivedVisitingId: filter.employeeId || employeeId,
      orgId: filter.orgId || orgId,
    };
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== "")
    );
    if (activeStep?.type == "Person") {
      dispatch(fetchMyPermissions(filteredParams) as any);
    }
  }, [pageIndexForMember, pageSizeForMember, searchTerm, activeStep, filter]);
  return (
    <Fragment>
      <div className="detailsCard my-5">
        <div className="card-xl-stretch mb-xl-8">
          <div className="card-title">
            <div className="row d-flex overflow-auto h-66px">
              <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap mb-3">
                {types?.map((step: any) => (
                  <Fragment key={step?.id}>
                    <button
                      className={`btn rounded-0 bg-transparent btn-active-color-primary border-0 ms-6 pe-3 fw-bolder  border border-bottom border-white border-2 border-active-primary  ${
                        activeStep?.id === step?.id ? "active" : ""
                      } ${
                        loadingMyPermissions || loadingMyPermissionsGroup
                          ? "disabled"
                          : ""
                      }`}
                      onClick={() => {
                        if (loadingMyPermissions || loadingMyPermissionsGroup) {
                          return;
                        }
                        setActiveStep(step);
                      }}
                    >
                      {step?.name}
                    </button>
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
          <div className="card-body py-3">
            <div className={`tab-pane fade show`} id="kt_tab_project_tasks">
              <div className="d-flex justify-content-between  align-content-center flex-wrap">
                <div className="d-flex align-items-center position-relative my-1 w-50">
                  <span
                    className={`svg-icon svg-icon-1 position-absolute ${
                      getCurrentSystemLanguage() == "ar" ? "me-6" : "ms-6"
                    }`}
                  >
                    {(activeStep?.type === "Person" && loadingMyPermissions) ||
                    (activeStep?.type === "Group" &&
                      loadingMyPermissionsGroup) ? (
                      <Spinner animation="border" variant="primary" size="sm" />
                    ) : (
                      <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                    )}
                  </span>
                  <input
                    type="text"
                    data-kt-filemanager-table-filter="search"
                    className={`form-control form-control-solid ${
                      getCurrentSystemLanguage() === "ar" ? "pe-15" : "ps-15"
                    }`}
                    placeholder={intl.formatMessage({
                      id: "SearchInThePermits",
                    })}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e?.target?.value);
                    }}
                    // disabled={
                    //   (activeStep?.type === "Person" && loadingMyPermissions) ||
                    //   (activeStep?.type === "Group" && loadingMyPermissionsGroup)
                    // }
                  />
                </div>
                <div className="d-flex gap-2 text-white">
                  <PermitStatusFilter
                    filter={filter}
                    setFilter={setFilter}
                    setPageIndexForMember={setPageIndexForMember}
                    setPageIndexForGroups={setPageIndexForGroups}
                  />
                  <div
                    className={`btn w-auto btn-custom text-white btn-flex fw-bolder mb-2${
                      (activeStep?.type === "Person" && loadingMyPermissions) ||
                      (activeStep?.type === "Group" &&
                        loadingMyPermissionsGroup)
                        ? "disabled"
                        : ""
                    }`}
                    style={{ backgroundColor: "#A1A5B7" }}
                    onClick={() => {
                      if (
                        (activeStep?.type === "Person" &&
                          loadingMyPermissions) ||
                        (activeStep?.type === "Group" &&
                          loadingMyPermissionsGroup)
                      ) {
                        return;
                      }
                      if (activeStep?.type == "Person") {
                        setShowMemberFilter(true);
                      } else {
                        setShowGroupFilter(true);
                      }
                    }}
                  >
                    <RiFilter2Fill size={17} className="me-3 text-white" />{" "}
                    {intl.formatMessage({ id: "Filtering" })}
                  </div>
                </div>
              </div>
              <div className="table-responsive my-4 min-h-500px">
                <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
                  <thead>
                    <tr className="fw-bolder projectSecColor">
                      {activeStep?.type !== "Person" && (
                        <>
                          <th className="px-2 pb-3 min-w-50px max-w-350px text-muted"></th>
                          <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                            {intl.formatMessage({ id: "GroupNumber" })}
                          </th>
                        </>
                      )}
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitNumber" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({
                          id:
                            activeStep?.type == "Person"
                              ? "VisitorName"
                              : "PersonGroupName",
                        })}
                      </th>

                      {activeStep?.type !== "Person" && (
                        <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                          {intl.formatMessage({ id: "Number" })}
                        </th>
                      )}
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "StatementType" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "AuthorizingAuthority" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "Building" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "Parkings" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "VisitReceiver" })}
                      </th>
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitStatus" })}
                      </th>

                      {/* <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                        {intl.formatMessage({ id: "Favourite" })}
                      </th> */}
                      <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                        {intl.formatMessage({ id: "Options" })}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeStep?.type == "Person" ? (
                      loadingMyPermissions ? (
                        <tr>
                          <td colSpan={10} className="text-center py-5">
                            <div className="d-flex flex-column align-items-center">
                              <Spinner animation="border" variant="primary" />
                              <div className="mt-3 fw-bold text-muted">
                                {intl.formatMessage({ id: "Loading" })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <>
                          {permissionsListForMember?.map((permit) => (
                            <Fragment key={permit?.permissionID}>
                              <tr>
                                <PermitsListTableRowGenratorForMember
                                  permit={permit}
                                  {...{
                                    pageSizeForMember,
                                    pageIndexForMember,
                                  }}
                                />
                              </tr>
                            </Fragment>
                          ))}
                        </>
                      )
                    ) : loadingMyPermissionsGroup ? (
                      <tr>
                        <td colSpan={11} className="text-center py-5">
                          <div className="d-flex flex-column align-items-center">
                            <Spinner animation="border" variant="primary" />
                            <div className="mt-3 fw-bold text-muted">
                              {intl.formatMessage({ id: "Loading" })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {permissionsListForGroups?.map((permit) => (
                          <Fragment key={permit.id}>
                            <tr>
                              <PermitsListTableRowGenratorForGroup
                                permit={permit}
                                {...{
                                  expandedGroups,
                                  handleToggle,
                                  pageSizeForGroups,
                                  pageIndexForGroups,
                                }}
                              />
                            </tr>
                            {expandedGroups?.includes(permit?.id) &&
                              permit?.permissionListDto?.map((item, index) => (
                                <Fragment key={item?.permissionID + permit?.id}>
                                  <tr>
                                    <PermitsListTableRowGenratorForMemberInGroup
                                      permit={item}
                                      group={permit}
                                      {...{
                                        pageSizeForGroups,
                                        pageIndexForGroups,
                                      }}
                                    />
                                  </tr>
                                </Fragment>
                              ))}
                          </Fragment>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {activeStep?.type == "Person" ? (
                loadingMyPermissions ? (
                  <></>
                ) : totalPagesOfPermissionsListForMember == 0 ? (
                  <>
                    {" "}
                    <div className="text-center fw-bold">
                      {intl.formatMessage({ id: "NoPermissionsFound" })}
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <SystemPagination
                      totalPages={totalPagesOfPermissionsListForMember}
                      totalItems={totalItemsOfPermissionsListForMember}
                      pageIndex={pageIndexForMember}
                      pageSize={pageSizeForMember}
                      setPageIndex={setPageIndexForMember}
                      setPageSize={setPageSizeForMember}
                    />
                  </>
                )
              ) : loadingMyPermissionsGroup ? (
                <></>
              ) : totalPagesOfPermissionsListForGroups == 0 ? (
                <>
                  {" "}
                  <div className="text-center fw-bold">
                    {intl.formatMessage({ id: "NoPermissionsFound" })}
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <SystemPagination
                    totalPages={totalPagesOfPermissionsListForGroups}
                    totalItems={totalItemsOfPermissionsListForGroups}
                    pageIndex={pageIndexForGroups}
                    pageSize={pageSizeForGroups}
                    setPageIndex={setPageIndexForGroups}
                    setPageSize={setPageSizeForGroups}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="Rega_modal_Create_New_Classification"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
      >
        <FilteringPermitStatus
          showAdd={showPemritStatusFilter}
          handleClose={() => {
            setShowPemritStatusFilter(false);
          }}
          filter={filter}
          setFilter={setFilter}
          employeeId={employeeId}
          setEmployeeId={setEmployeeId}
          orgId={orgId}
          setOrgId={setOrgId}
          setPageIndexForMember={setPageIndexForMember}
          setPageIndexForGroups={setPageIndexForGroups}
          activeStep={activeStep}
        />
        <FilteringPermitMembers
          showAdd={showMemberFilter}
          handleClose={() => {
            setShowMemberFilter(false);
          }}
          filter={filter}
          setFilter={setFilter}
          employeeId={employeeId}
          setEmployeeId={setEmployeeId}
          orgId={orgId}
          setOrgId={setOrgId}
          setPageIndexForMember={setPageIndexForMember}
        />
        <FilteringPermitGroups
          showAdd={showGroupFilter}
          filter={filter}
          setFilter={setFilter}
          handleClose={() => {
            setShowGroupFilter(false);
          }}
          setPageIndexForGroups={setPageIndexForGroups}
        />
      </div>
    </Fragment>
  );
}
