import { FC, Fragment, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { RiFilter2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getAdditionPermissionsRequests } from "../../../redux/visitor-permission-slice";
import { RootState } from "../../../redux/store";
import PermitsListTableRowGenratorForGroup from "./PermitsListTableRowGenratorForGroup";
import PermitsListTableRowGenratorForMemberInGroup from "./PermitsListTableRowGenratorForMemberInGroup";
import { FilteringPermitGroups } from "../popup/FilteringPermitGroups";
export const AdditionPermitsRequests: FC<{ tabName: string, setTabName?: any }> = ({
  tabName, setTabName
}) => {
  const intl = useIntl();
  const [showFilter, setShowFilter] = useState(false);
  const [showGroupFilter, setShowGroupFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [pageSizeForAdditionPermissionsRequests, setPageSizeForAdditionPermissionsRequests] = useState<number>(10);
  const [pageIndexForAdditionPermissionsRequests, setPageIndexForAdditionPermissionsRequests] = useState<number>(1);
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
  const [activeStep, setActiveStep] = useState<any>(types[1]);



  useEffect(() => {
    const params: any = {
      pageSize: pageSizeForAdditionPermissionsRequests,
      pageIndex: pageIndexForAdditionPermissionsRequests,
      status: 1,
      search: searchTerm,
    }
    dispatch(getAdditionPermissionsRequests(params) as any)
  }, [pageSizeForAdditionPermissionsRequests, , pageIndexForAdditionPermissionsRequests, searchTerm])

  const { additionPermissionsRequests } = useSelector((state: RootState) => state.visitorPermission)

  const totalPagesOfAdditionPermissionsRequests = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForAdditionPermissionsRequests?.totalPages;
  });
  const totalItemsOfAdditionPermissionsRequests = useSelector((state: RootState) => {
    return state?.visitorPermission?.paginationForAdditionPermissionsRequests?.totalItems;
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
              <div
                className="btn w-auto btn-custom text-white btn-flex   fw-bolder"
                style={{ backgroundColor: "#A1A5B7" }}
                onClick={() => {
                  setShowGroupFilter(true);
                }}
              >
                <RiFilter2Fill size={17} className="me-3 text-white" />{" "}
                {intl.formatMessage({ id: "Filtering" })}
              </div>
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
                      <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                        {intl.formatMessage({ id: activeStep?.type == "Group" ? "PersonGroupName" : "VisitorName" })}
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
                    {additionPermissionsRequests?.map((permit, index) => (
                      <>
                        <tr key={permit?.groupId}>
                          <PermitsListTableRowGenratorForGroup
                            permit={permit}
                            tabName={tabName}
                            {...{
                              expandedGroups,
                              handleToggle,
                            }}
                            pageIndexGroup={pageIndexForAdditionPermissionsRequests}
                            pageSizeGroup={pageSizeForAdditionPermissionsRequests}
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
                                    tabName={tabName}
                                    permit={modifiedVisitor}
                                    group={permit}
                                  />
                                </tr>
                              );
                            })
                          )}
                      </>
                    ))}

                  </tbody>
                </table>
              </div>
              {additionPermissionsRequests ? <SystemPagination
                totalPages={totalPagesOfAdditionPermissionsRequests}
                totalItems={totalItemsOfAdditionPermissionsRequests}
                pageIndex={pageIndexForAdditionPermissionsRequests}
                pageSize={pageSizeForAdditionPermissionsRequests}
                setPageIndex={setPageIndexForAdditionPermissionsRequests}
                setPageSize={setPageSizeForAdditionPermissionsRequests}
              /> : <div className="text-center fw-bold">
                {intl.formatMessage({ id: "NoPermissionsFound" })}
              </div>}
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
        <FilteringPermitGroups
          showAdd={showGroupFilter}
          handleClose={() => {
            setShowGroupFilter(false)
          }}
          pageSize={pageSizeForAdditionPermissionsRequests}
          tabName={tabName}
          setTabName={setTabName}
        />
      </div>
    </Fragment>
  );
};
