import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { RiFilter2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getPermissionFavoriteOrArchive, getPermissionFavoriteOrArchiveGroup } from "../../../redux/visitor-permission-slice";
import PermitsListTableRowGenratorForMember from "./PermitsListTableRowGeneratorForMember";
import PermitsListTableRowGenratorForGroup from "./PermitsListTableRowGenratorForGroup";
import PermitsListTableRowGenratorForMemberInGroup from "./PermitsListTableRowGenratorForMemberInGroup";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { FilteringPermitMembers } from "../popup/FilteringPermitMembers";
import { FilteringPermitGroups } from "../popup/FilteringPermitGroups";

export function PermitsListTable() {
  const intl = useIntl();
  const [showAddGroup, setShowAddGroup] = useState(false);
  const handleCloseGroup = () => setShowAddGroup(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const handleCloseMember = () => setShowAddMember(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);


  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  const handleToggle = (groupId: string) => {
    if (expandedGroups.includes(groupId)) {
      setExpandedGroups(expandedGroups?.filter((id) => id !== groupId));
    } else {
      setExpandedGroups([...expandedGroups, groupId]);
    }
  };

  let [searchTerm, setSearchTerm] = useState("");

  const [pageSizeForMember, setPageSizeForMember] = useState<number>(10);
  const [pageIndexForMember, setPageIndexForMember] = useState<number>(1);
  const [pageSizeForGroups, setPageSizeForGroups] = useState<number>(10);
  const [pageIndexForGroups, setPageIndexForGroups] = useState<number>(1);
  let permissionFavorites = useSelector((state: RootState) => {
    return state?.visitorPermission?.permissionFavoriteOrArchive;
  });
  let totalPagesOfPermissionsFavouritesForMember = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForPermissionFavoriteOrArchive?.totalPages;
  });
  let totalItemsOfPermissionsFavouritesForMember = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForPermissionFavoriteOrArchive?.totalItems;
  });
  let permissionsFavouritesForGroups = useSelector((state: RootState) => {
    return state?.visitorPermission?.permissionFavoriteOrArchiveGroup;
  });
  let totalPagesOfPermissionsFavouritesForGroups = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForPermissionFavoriteOrArchiveGroup?.totalPages;
  });
  let totalItemsOfPermissionsFavouritesForGroups = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForPermissionFavoriteOrArchiveGroup?.totalItems;
  });

  let dispatch = useDispatch();
  useEffect(() => {
    let params = {
      pageSize: pageSizeForMember,
      pageNumber: pageIndexForMember,
      Search: searchTerm,
    };
    dispatch(getPermissionFavoriteOrArchive(params) as any)
      .unwrap()
      .then((response: any) => {
      })
      .catch((error: any) => {
      });
  }, [pageIndexForMember, pageSizeForMember, searchTerm]);

  useEffect(() => {
    let params = {
      pageSize: pageSizeForGroups,
      pageNumber: pageIndexForGroups,
      Search: searchTerm,
    };

    dispatch(getPermissionFavoriteOrArchiveGroup(params) as any)
      .unwrap()
      .then((response: any) => {
      })
      .catch((error: any) => {
      });
  }, [pageIndexForGroups, pageSizeForGroups, searchTerm]);


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
  const handleButtonClick = () => {
    const nextType = activeStep.type === "Person" ? "Person" : "Group";
    setActiveStep(types.find(type => type.type === nextType));
    setShowPopup(true);
  };

  useEffect(() => {
    setActiveStep(types[0]);
  }, [])

  return (
    <Fragment>
      <div className="detailsCard my-5">
        <div className="card-xl-stretch mb-xl-8">
          <div className="card-title">
            <div className="d-flex justify-content-between  align-content-center flex-wrap  ">
              <div className="d-flex align-items-center position-relative my-1">
                <span
                  className={`svg-icon svg-icon-1 position-absolute ${getCurrentSystemLanguage() == "ar" ? "me-6" : "ms-6"
                    }`}
                >
                  <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                </span>
                <input
                  type="text"
                  data-kt-filemanager-table-filter="search"
                  className={`form-control form-control-solid w-250px ${getCurrentSystemLanguage() === "ar" ? "pe-15" : "ps-15"
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

              <div className="d-flex align-items-center">
                <div
                  onClick={handleButtonClick}
                  className="btn w-auto btn-custom text-white btn-flex fw-bolder"
                  style={{ backgroundColor: "#A1A5B7" }}
                >
                  <RiFilter2Fill size={17} className="me-3 text-white" />
                  {intl.formatMessage({ id: "Filtering" })}
                </div>
              </div>

            </div>
            <div className="row d-flex overflow-auto h-66px">
              <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap mb-3">
                {types.map((step: any) => (
                  <button
                    key={step?.id}
                    className={`btn rounded-0 bg-transparent btn-active-color-primary border-0 ms-6 pe-3 fw-bolder  border border-bottom border-white border-2 border-active-primary  ${activeStep?.id === step?.id ? "active" : ""
                      }`}
                    onClick={() => {
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
                      {
                        activeStep?.type === "Person" ? (
                          <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                            {intl.formatMessage({ id: "VisitorName" })}
                          </th>
                        ) : (
                          <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                            {intl.formatMessage({ id: "VisitorNameGroupName" })}
                          </th>
                        )
                      }
                      {activeStep?.type !== "Person" && (
                        <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                          {intl.formatMessage({ id: "Number" })}
                        </th>
                      )}
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: "PermitReason" })}
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
                        {permissionFavorites?.map((permit) => (
                          <>
                            <tr key={permit?.userId}>
                              <PermitsListTableRowGenratorForMember
                                permit={permit}
                                {...{
                                  pageSizeForMember, pageIndexForMember
                                }}
                              />
                            </tr>
                          </>
                        ))}
                      </>
                    ) : (
                      <>
                        {permissionsFavouritesForGroups?.map((permit) => (
                          <>
                            <tr key={permit.groupId}>
                              <PermitsListTableRowGenratorForGroup
                                permit={permit}
                                {...{
                                  expandedGroups,
                                  handleToggle,
                                  pageSizeForGroups,
                                  pageIndexForGroups
                                }}
                              />
                            </tr>
                            {expandedGroups?.includes(permit?.groupId) &&
                              permit?.permissionDto?.map((permission) =>
                                permission.visitorDto?.map((visitor, index) => {
                                  const modifiedVisitor =
                                  {
                                    permissionType: permission?.permissionType,
                                    permissionSource: permission?.permissionSource,
                                    permissionCode: visitor?.visitorCode,
                                    orgId: permission?.orgId,
                                    recivedId: permission?.recivedId,
                                    orgName: permission?.orgName,
                                    recivedName: permission?.recivedName,
                                    visitorName: visitor?.visitorName,
                                    userId: visitor?.userId,
                                    permissionStatus: visitor?.permissionStatus,
                                    visitorId: visitor?.visitorId,
                                    permissionID: permission?.permissionId
                                  };

                                  return (
                                    <tr key={index}>
                                      <PermitsListTableRowGenratorForMemberInGroup
                                        permit={modifiedVisitor}
                                        group={permit}
                                        {...{
                                          pageSizeForGroups,
                                          pageIndexForGroups
                                        }}
                                      />
                                    </tr>
                                  );
                                })
                              )}
                          </>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
                {activeStep?.type == "Person" &&
                  (totalPagesOfPermissionsFavouritesForMember == 0 ? (
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
                        totalPages={totalPagesOfPermissionsFavouritesForMember}
                        totalItems={totalItemsOfPermissionsFavouritesForMember}
                        pageIndex={pageIndexForMember}
                        pageSize={pageSizeForMember}
                        setPageIndex={setPageIndexForMember}
                        setPageSize={setPageSizeForMember}
                      />
                    </>
                  ))}

                {activeStep?.type !== "Person" &&
                  (totalPagesOfPermissionsFavouritesForGroups == 0 ? (
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
                        totalPages={totalPagesOfPermissionsFavouritesForGroups}
                        totalItems={totalItemsOfPermissionsFavouritesForGroups}
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
        {showPopup && (
          activeStep.type === "Person" ? (
            <FilteringPermitMembers
              showAdd={true}
              handleClose={handleClosePopup}
            />
          ) : (
            <FilteringPermitGroups
              showAdd={true}
              handleClose={handleClosePopup}
            />
          )
        )}
      </div>
    </Fragment>
  );
}

