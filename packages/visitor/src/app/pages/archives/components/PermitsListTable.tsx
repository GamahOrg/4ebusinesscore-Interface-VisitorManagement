import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { RiFilter2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import PermitsListTableRowGenratorForMember from "./PermitsListTableRowGeneratorForMember";
import PermitsListTableRowGenratorForGroup from "./PermitsListTableRowGenratorForGroup";
import PermitsListTableRowGenratorForMemberInGroup from "./PermitsListTableRowGenratorForMemberInGroup";
import { FilteringPermitGroups } from "../popup/FilteringPermitGroups";
import { FilteringPermitMembers } from "../popup/FilteringPermitMembers";
import {
  getPermissionFavoriteOrArchive,
  getPermissionFavoriteOrArchiveGroup,
} from "../../../redux/visitor-permission-slice";
import { ModifiedVisitorDtoModel } from "../../../model/visitior-permission-group-model";
export function PermitsListTable() {
  const intl = useIntl();
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
  let [searchTerm, setSearchTerm] = useState("");
  const [pageSizeForMember, setPageSizeForMember] = useState<number>(10);
  const [pageIndexForMember, setPageIndexForMember] = useState<number>(1);
  const [pageSizeForGroups, setPageSizeForGroups] = useState<number>(10);
  const [pageIndexForGroups, setPageIndexForGroups] = useState<number>(1);
  let permissionsListForMember = useSelector((state: RootState) => {
    return state?.visitorPermission?.permissionFavoriteOrArchive;
  });
  let totalPagesOfPermissionsListForMember = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForPermissionFavoriteOrArchive
      ?.totalPages;
  });
  let totalItemsOfPermissionsListForMember = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForPermissionFavoriteOrArchive
      ?.totalItems;
  });
  let permissionsListForGroups = useSelector((state: RootState) => {
    return state?.visitorPermission?.permissionFavoriteOrArchiveGroup;
  });
  let totalPagesOfPermissionsListForGroups = useSelector((state: RootState) => {
    return state?.visitorPermission
      ?.paginationForPermissionFavoriteOrArchiveGroup?.totalPages;
  });
  let totalItemsOfPermissionsListForGroups = useSelector((state: RootState) => {
    return state?.visitorPermission
      ?.paginationForPermissionFavoriteOrArchiveGroup?.totalItems;
  });
  let dispatch = useDispatch();
  useEffect(() => {
    let params = {
      pageSize: pageSizeForGroups,
      pageIndex: pageIndexForGroups,
      search: searchTerm,
      isFavoriteOrArchive: 1,
      isArchive: true,
    };
    if (activeStep?.type !== "Person") {
      dispatch(getPermissionFavoriteOrArchiveGroup(params) as any);
    }
  }, [pageIndexForGroups, pageSizeForGroups, searchTerm, activeStep]);

  useEffect(() => {
    let params = {
      pageSize: pageSizeForMember,
      pageIndex: pageIndexForMember,
      search: searchTerm,
      isFavoriteOrArchive: 1,
      isArchive: true,
    };
    if (activeStep?.type == "Person") {
      dispatch(getPermissionFavoriteOrArchive(params) as any);
    }
  }, [pageIndexForMember, pageSizeForMember, searchTerm, activeStep]);
  return (
    <Fragment>
      <div className="detailsCard my-5">
        <div className="card-xl-stretch mb-xl-8">
          <div className="card-title">
            <div className="row d-flex overflow-auto h-66px">
              <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap mb-3">
                {types.map((step: any) => (
                  <Fragment key={step?.id}>
                    {" "}
                    <button
                      className={`btn rounded-0 bg-transparent btn-active-color-primary border-0 ms-6 pe-3 fw-bolder  border border-bottom border-white border-2 border-active-primary  ${
                        activeStep?.id === step?.id ? "active" : ""
                      }`}
                      onClick={() => {
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
              <div className="d-flex justify-content-between  align-content-center flex-wrap  ">
                <div className="d-flex align-items-center position-relative my-1 w-50">
                  <span
                    className={`svg-icon svg-icon-1 position-absolute ${
                      getCurrentSystemLanguage() == "ar" ? "me-6" : "ms-6"
                    }`}
                  >
                    <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
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
                  />
                </div>
                <div
                  className="btn w-auto btn-custom text-white btn-flex   fw-bolder"
                  style={{ backgroundColor: "#A1A5B7" }}
                  onClick={() => {
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
              <div className="table-responsive mb-3">
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
                        {intl.formatMessage({ id: "PermitSource" })}
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
                      <>
                        {permissionsListForMember?.map((permit) => (
                          <Fragment key={permit?.permissionCode}>
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
                    ) : (
                      <>
                        {permissionsListForGroups?.map((permit) => (
                          <Fragment key={permit?.groupId}>
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
                            {expandedGroups?.includes(permit?.groupId) &&
                              permit?.permissionDto?.map((permission) =>
                                permission.visitorDto?.map((visitor, index) => {
                                  const modifiedVisitor: ModifiedVisitorDtoModel =
                                    {
                                      permissionType:
                                        permission?.permissionType,
                                      permissionSource:
                                        permission?.permissionSource,
                                      permissionCode: visitor?.visitorCode,
                                      orgId: permission?.orgId,
                                      recivedId: permission?.recivedId,
                                      orgName: permission?.orgName,
                                      recivedName: permission?.recivedName,
                                      visitorName: visitor?.visitorName,
                                      userId: visitor?.userId,
                                      permissionStatus:
                                        visitor?.permissionStatus,
                                      visitorId: visitor?.visitorId,
                                      permissionID: permission?.permissionId,
                                      reveivedMail: permission?.reveivedMail,
                                    };

                                  return (
                                    <Fragment key={visitor.visitorId}>
                                      <tr>
                                        <PermitsListTableRowGenratorForMemberInGroup
                                          visitor={modifiedVisitor}
                                          group={permit}
                                          {...{
                                            pageSizeForGroups,
                                            pageIndexForGroups,
                                          }}
                                        />
                                      </tr>
                                    </Fragment>
                                  );
                                })
                              )}
                          </Fragment>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
                {activeStep?.type == "Person" &&
                  (totalPagesOfPermissionsListForMember == 0 ? (
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
                  ))}

                {activeStep?.type !== "Person" &&
                  (totalPagesOfPermissionsListForGroups == 0 ? (
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
                  ))}
              </div>
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
        <FilteringPermitMembers
          showAdd={showMemberFilter}
          handleClose={() => {
            setShowMemberFilter(false);
          }}
        />
        <FilteringPermitGroups
          showAdd={showGroupFilter}
          handleClose={() => {
            setShowGroupFilter(false);
          }}
        />
      </div>
    </Fragment>
  );
}
