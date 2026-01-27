import { FC, Fragment, useState, useEffect, useCallback } from "react";
import { useIntl } from "react-intl";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { RiFilter2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getVisitorPermission,
  getVisitorPermissionGroup,
} from "../../../redux/visitor-permission-slice";
import { RootState } from "../../../redux/store";
import PermitsListTableRowGenratorForMember from "./PermitsListTableRowGeneratorForMember";
import PermitsListTableRowGenratorForGroup from "./PermitsListTableRowGenratorForGroup";
import PermitsListTableRowGenratorForMemberInGroup from "./PermitsListTableRowGenratorForMemberInGroup";
import { FilteringPermitMembers } from "../popup/FilteringPermitMembers";
import { FilteringPermitGroups } from "../popup/FilteringPermitGroups";
import PermitStatusFilter from "./PermitStatusFilter";
import React from "react";
import { Spinner } from "react-bootstrap";

export const PermitApplicationsTable: FC<{
  tabName: string;
  setTabName?: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}> = ({ tabName, setTabName, searchTerm, setSearchTerm }) => {
  const intl = useIntl();
  const [showFilter, setShowFilter] = useState(false);
  const [showMemberFilter, setShowMemberFilter] = useState(false);
  const [showGroupFilter, setShowGroupFilter] = useState(false);
  const [permitStatusFilter, setPermitStatusFilter] = useState<any>({
    permissionStatus: "",
  });
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [pageSizeForVisitorPermission, setPageSizeForVisitorPermission] =
    useState<number>(10);
  const [pageIndexForVisitorPermission, setPageIndexForVisitorPermission] =
    useState<number>(1);
  const [
    pageSizeForVisitorPermissionGroup,
    setPageSizeForVisitorPermissionGroup,
  ] = useState<number>(10);
  const [
    pageIndexForVisitorPermissionGroup,
    setPageIndexForVisitorPermissionGroup,
  ] = useState<number>(1);
  const dispatch = useDispatch();

  //To handle switch from "فرد" to "مجموعة"
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

  useEffect(() => {
    const params: any = {
      pageSize: pageSizeForVisitorPermission,
      pageIndex: pageIndexForVisitorPermission,
      status: 0,
      search: searchTerm,
      permissionStatus:
        permitStatusFilter.permissionStatus === "all"
          ? ""
          : permitStatusFilter.permissionStatus,
    };
    dispatch(getVisitorPermission(params) as any);
  }, [
    pageSizeForVisitorPermission,
    pageIndexForVisitorPermission,
    searchTerm,
    permitStatusFilter,
  ]);

  useEffect(() => {
    const params: any = {
      pageSize: pageSizeForVisitorPermissionGroup,
      pageIndex: pageIndexForVisitorPermissionGroup,
      status: 0,
      Search: searchTerm,
      permissionStatus:
        permitStatusFilter.permissionStatus === "all"
          ? ""
          : permitStatusFilter.permissionStatus,
    };
    dispatch(getVisitorPermissionGroup(params) as any);
  }, [
    pageSizeForVisitorPermissionGroup,
    pageIndexForVisitorPermissionGroup,
    searchTerm,
    permitStatusFilter,
  ]);

  //Tables Data
  const { visitorPermission } = useSelector(
    (state: RootState) => state.visitorPermission
  );
  const { visitorPermissionGroup } = useSelector(
    (state: RootState) => state.visitorPermission
  );

  //Loading states
  const loadingVisitorPermission = useSelector(
    (state: RootState) => state.visitorPermission.loadingVisitorPermission
  );
  const loadingVisitorPermissionGroup = useSelector(
    (state: RootState) => state.visitorPermission.loadingVisitorPermissionGroup
  );

  //Pagination
  const totalPagesOfVisitorPermission = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForVisitorPermission?.totalPages;
  });
  const totalItemsOfVisitorPermission = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForVisitorPermission?.totalItems;
  });
  const totalPagesOfVisitorPermissionGroup = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForVisitorPermissionGroup
      ?.totalPages;
  });
  const totalItemsOfVisitorPermissionGroup = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForVisitorPermissionGroup
      ?.totalItems;
  });

  const handleCloseFilter = () => setShowFilter(false);

  const handleToggle = (groupId: string) => {
    if (expandedGroups.includes(groupId)) {
      setExpandedGroups(expandedGroups?.filter((id) => id !== groupId));
    } else {
      setExpandedGroups([...expandedGroups, groupId]);
    }
  };

  return (
    <Fragment>
      <div className="detailsCard my-5">
        <div className="card-xl-stretch mb-xl-8">
          <div className="card-title">
            <div className="row">
              <div className="col-12">
                <div className="d-flex flex-column flex-md-row align-items-stretch gap-2 w-100 position-relative mb-2 mb-md-0 flex-wrap">
                  <div
                    className="d-flex align-items-center position-relative flex-grow-1 mb-2 mb-md-0"
                    style={{ minWidth: 0 }}
                  >
                    <span
                      className={`svg-icon svg-icon-1 position-absolute ${
                        getCurrentSystemLanguage() == "ar" ? "me-6" : "ms-6"
                      }`}
                    >
                      {(activeStep?.type === "Person" &&
                        loadingVisitorPermission) ||
                      (activeStep?.type === "Group" &&
                        loadingVisitorPermissionGroup) ? (
                        <Spinner
                          animation="border"
                          variant="primary"
                          size="sm"
                        />
                      ) : (
                        <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                      )}
                    </span>
                    <input
                      type="text"
                      data-kt-filemanager-table-filter="search"
                      className={`form-control form-control-solid w-100 w-md-250px ${
                        getCurrentSystemLanguage() === "ar" ? "pe-15" : "ps-15"
                      }`}
                      placeholder={intl.formatMessage({
                        id: "SearchInThePermits",
                      })}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e?.target?.value)}
                      style={{ maxWidth: "100%" }}
                      // disabled={
                      //   (activeStep?.type === "Person" && loadingVisitorPermission) ||
                      //   (activeStep?.type === "Group" && loadingVisitorPermissionGroup)
                      // }
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-shrink-0">
                    <PermitStatusFilter
                      filter={permitStatusFilter}
                      setFilter={setPermitStatusFilter}
                      setPageIndexForMember={setPageIndexForVisitorPermission}
                      setPageIndexForGroups={
                        setPageIndexForVisitorPermissionGroup
                      }
                    />
                    <div
                      className={`btn w-auto btn-custom text-white btn-flex fw-bolder ${
                        (activeStep?.type === "Person" &&
                          loadingVisitorPermission) ||
                        (activeStep?.type === "Group" &&
                          loadingVisitorPermissionGroup)
                          ? "disabled"
                          : ""
                      }`}
                      style={{ backgroundColor: "#A1A5B7" }}
                      onClick={() => {
                        if (
                          (activeStep?.type === "Person" &&
                            loadingVisitorPermission) ||
                          (activeStep?.type === "Group" &&
                            loadingVisitorPermissionGroup)
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
                      <RiFilter2Fill size={17} className="me-3 text-white" />
                      {intl.formatMessage({ id: "Filtering" })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex overflow-auto h-66px">
              <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap mb-3 justify-content-start">
                {types.map((step: any) => (
                  <button
                    key={step.id}
                    className={`btn rounded-0 bg-transparent btn-active-color-primary border-0 ms-3 pe-3 fw-bolder border-bottom border-2 border-active-primary ${
                      activeStep?.id === step?.id ? "active" : ""
                    } ${
                      loadingVisitorPermission || loadingVisitorPermissionGroup
                        ? "disabled"
                        : ""
                    }`}
                    style={{ minWidth: 80 }}
                    onClick={() => {
                      if (
                        loadingVisitorPermission ||
                        loadingVisitorPermissionGroup
                      ) {
                        return;
                      }
                      setActiveStep(step);
                    }}
                  >
                    {step?.name}
                  </button>
                ))}
              </ul>
            </div>
          </div>
          <div className="card-body py-3">
            <div className={`tab-pane fade show`} id="kt_tab_project_tasks">
              <div className="table-responsive mb-3 min-h-500px">
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
                            activeStep?.type == "Group"
                              ? "PersonGroupName"
                              : "VisitorName",
                        })}
                      </th>
                      {activeStep?.type !== "Person" && (
                        <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                          {intl.formatMessage({ id: "Number" })}
                        </th>
                      )}
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitType" })}
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
                      <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                        {intl.formatMessage({ id: "Options" })}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeStep?.type == "Person" ? (
                      loadingVisitorPermission ? (
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
                        visitorPermission?.map((permit) => (
                          <tr key={permit?.visitorId}>
                            <PermitsListTableRowGenratorForMember
                              permit={permit}
                              tabName={tabName}
                              type={activeStep?.type}
                              pageIndexMember={pageIndexForVisitorPermission}
                              pageSizeMember={pageSizeForVisitorPermission}
                            />
                          </tr>
                        ))
                      )
                    ) : loadingVisitorPermissionGroup ? (
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
                      visitorPermissionGroup?.map((permit) => (
                        <React.Fragment key={permit?.groupId}>
                          <tr>
                            <PermitsListTableRowGenratorForGroup
                              permit={permit}
                              tabName={tabName}
                              {...{
                                expandedGroups,
                                handleToggle,
                              }}
                              pageIndexGroup={
                                pageIndexForVisitorPermissionGroup
                              }
                              pageSizeGroup={pageSizeForVisitorPermissionGroup}
                            />
                          </tr>
                          {expandedGroups?.includes(permit?.groupId) &&
                            permit?.permissionDto?.map((permission) =>
                              permission.visitorDto?.map((visitor) => {
                                const modifiedVisitor = {
                                  permissionType: permission?.permissionType,
                                  permissionSource:
                                    permission?.permissionSource,
                                  permissionCode: visitor?.visitorCode,
                                  orgId: permission?.orgId,
                                  isParking: permission?.isParking,
                                  permissionTypeAr:
                                    permission?.permissionTypeAr,
                                  permissionTypeEn:
                                    permission?.permissionTypeEn,
                                  recivedId: permission?.recivedId,
                                  orgName: permission?.orgName,
                                  recivedName: permission?.recivedName,
                                  visitorName: visitor?.visitorName,
                                  userId: visitor?.userId,
                                  permissionStatus: visitor?.permissionStatus,
                                  visitorId: visitor?.visitorId,
                                  permissionID: permission?.permissionId,
                                };
                                return (
                                  <tr key={visitor?.visitorId}>
                                    <PermitsListTableRowGenratorForMemberInGroup
                                      tabName={tabName}
                                      permit={modifiedVisitor}
                                      group={permit}
                                    />
                                  </tr>
                                );
                              })
                            )}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {activeStep?.type == "Person" ? (
                loadingVisitorPermission ? (
                  <></>
                ) : visitorPermission && visitorPermission.length > 0 ? (
                  <SystemPagination
                    totalPages={totalPagesOfVisitorPermission}
                    totalItems={totalItemsOfVisitorPermission}
                    pageIndex={pageIndexForVisitorPermission}
                    pageSize={pageSizeForVisitorPermission}
                    setPageIndex={setPageIndexForVisitorPermission}
                    setPageSize={setPageSizeForVisitorPermission}
                  />
                ) : (
                  <div className="text-center fw-bold">
                    {intl.formatMessage({ id: "NoPermissionsFound" })}
                  </div>
                )
              ) : loadingVisitorPermissionGroup ? (
                <></>
              ) : visitorPermissionGroup &&
                visitorPermissionGroup.length > 0 ? (
                <SystemPagination
                  totalPages={totalPagesOfVisitorPermissionGroup}
                  totalItems={totalItemsOfVisitorPermissionGroup}
                  pageIndex={pageIndexForVisitorPermissionGroup}
                  pageSize={pageSizeForVisitorPermissionGroup}
                  setPageIndex={setPageIndexForVisitorPermissionGroup}
                  setPageSize={setPageSizeForVisitorPermissionGroup}
                />
              ) : (
                <div className="text-center fw-bold">
                  {intl.formatMessage({ id: "NoPermissionsFound" })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <>
        {showMemberFilter ? (
          <FilteringPermitMembers
            showAdd={showMemberFilter}
            handleClose={() => {
              setShowMemberFilter(false);
            }}
            pageSize={pageSizeForVisitorPermission}
            tabName={tabName}
            setTabName={setTabName}
          />
        ) : (
          ""
        )}
        {showGroupFilter ? (
          <FilteringPermitGroups
            showAdd={showGroupFilter}
            handleClose={() => {
              setShowGroupFilter(false);
            }}
            pageSize={pageSizeForVisitorPermissionGroup}
            tabName={tabName}
            setTabName={setTabName}
          />
        ) : (
          ""
        )}
      </>
    </Fragment>
  );
};
