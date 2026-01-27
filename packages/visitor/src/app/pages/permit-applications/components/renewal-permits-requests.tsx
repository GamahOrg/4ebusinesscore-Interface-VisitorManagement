import { FC, Fragment, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { RiFilter2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getRenewalPermissionsGroupRequests, getRenewalPermissionsRequests, getVisitorPermission, getVisitorPermissionGroup } from "../../../redux/visitor-permission-slice";
import { RootState } from "../../../redux/store";
import PermitsListTableRowGenratorForMember from "./PermitsListTableRowGeneratorForMember";
import PermitsListTableRowGenratorForGroup from "./PermitsListTableRowGenratorForGroup";
import PermitsListTableRowGenratorForMemberInGroup from "./PermitsListTableRowGenratorForMemberInGroup";
import { FilteringPermitMembers } from "../popup/FilteringPermitMembers";
import { FilteringPermitGroups } from "../popup/FilteringPermitGroups";
export const RenewalPermitsRequests: FC<{ tabName: string, setTabName?: any }> = ({
    tabName, setTabName
}) => {
    const intl = useIntl();
    const [showFilter, setShowFilter] = useState(false);
    const [showMemberFilter, setShowMemberFilter] = useState(false);
    const [showGroupFilter, setShowGroupFilter] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
    const [pageSizeForRenewalPermissionsRequests, setPageSizeForRenewalPermissionsRequests] = useState<number>(10);
    const [pageIndexForRenewalPermissionsRequests, setPageIndexForRenewalPermissionsRequests] = useState<number>(1);
    const [pageSizeForRenewalPermissionsGroupRequests, setPageSizeForRenewalPermissionsGroupRequests] = useState<number>(10);
    const [pageIndexForRenewalPermissionsGroupRequests, setPageIndexForRenewalPermissionsGroupRequests] = useState<number>(1);
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
            pageSize: pageSizeForRenewalPermissionsRequests,
            pageIndex: pageIndexForRenewalPermissionsRequests,
            status: 2,
            search: searchTerm,
        }
        dispatch(getRenewalPermissionsRequests(params) as any)
    }, [pageSizeForRenewalPermissionsRequests, , pageIndexForRenewalPermissionsRequests, searchTerm])

    useEffect(() => {
        const params: any = {
            pageSize: pageSizeForRenewalPermissionsGroupRequests,
            pageIndex: pageIndexForRenewalPermissionsGroupRequests,
            status: 2,
            search: searchTerm,
        }
        dispatch(getRenewalPermissionsGroupRequests(params) as any)
    }, [pageSizeForRenewalPermissionsGroupRequests, , pageIndexForRenewalPermissionsGroupRequests, searchTerm])

    //Tables Data

    const { renewalPermissionsRequests } = useSelector((state: RootState) => state.visitorPermission)
    const { renewalPermissionsGroupRequests } = useSelector((state: RootState) => state.visitorPermission)

    //Pagination

    const totalPagesOfRenewalPermissionsRequests = useSelector((state: RootState) => {
        return state?.visitorPermission?.paginationForRenewalPermissionsRequests?.totalPages;
    });
    const totalItemsOfRenewalPermissionsRequests = useSelector((state: RootState) => {
        return state?.visitorPermission?.paginationForRenewalPermissionsRequests?.totalItems;
    });

    const totalPagesOfRenewalPermissionsGroupRequests = useSelector((state: RootState) => {
        return state?.visitorPermission?.paginationForRenewalPermissionsGroupRequests?.totalPages;
    });
    const totalItemsOfRenewalPermissionsGroupRequests = useSelector((state: RootState) => {
        return state?.visitorPermission?.paginationForRenewalPermissionsGroupRequests?.totalItems;
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
                                // data-bs-toggle="modal"
                                style={{ backgroundColor: "#A1A5B7" }}
                                // data-bs-target="#Rega_modal_filter"
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
                        <div className="row d-flex overflow-auto h-66px">
                            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap mb-3">
                                {types.map((step: any) => (
                                    <button
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
                                                {renewalPermissionsRequests?.map((permit, index) => (
                                                    <>
                                                        <tr key={permit?.visitorId}>
                                                            <PermitsListTableRowGenratorForMember
                                                                permit={permit}
                                                                tabName={tabName}
                                                                type={activeStep?.type}
                                                                pageIndexMember={pageIndexForRenewalPermissionsRequests}
                                                                pageSizeMember={pageSizeForRenewalPermissionsRequests}
                                                            />
                                                        </tr>
                                                    </>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                {renewalPermissionsGroupRequests?.map((permit, index) => (
                                                    <>
                                                        <tr key={permit?.groupId}>
                                                            <PermitsListTableRowGenratorForGroup
                                                                permit={permit}
                                                                tabName={tabName}
                                                                {...{
                                                                    expandedGroups,
                                                                    handleToggle,
                                                                }}
                                                                pageIndexGroup={pageIndexForRenewalPermissionsGroupRequests}
                                                                pageSizeGroup={pageSizeForRenewalPermissionsGroupRequests}
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
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {activeStep?.type == "Person" ? renewalPermissionsRequests ? <SystemPagination
                                totalPages={totalPagesOfRenewalPermissionsRequests}
                                totalItems={totalItemsOfRenewalPermissionsRequests}
                                pageIndex={pageIndexForRenewalPermissionsRequests}
                                pageSize={pageSizeForRenewalPermissionsRequests}
                                setPageIndex={setPageIndexForRenewalPermissionsRequests}
                                setPageSize={setPageSizeForRenewalPermissionsRequests}
                            /> : <div className="text-center fw-bold">
                                {intl.formatMessage({ id: "NoPermissionsFound" })}
                            </div> : renewalPermissionsGroupRequests ?
                                <SystemPagination
                                    totalPages={totalPagesOfRenewalPermissionsGroupRequests}
                                    totalItems={totalItemsOfRenewalPermissionsGroupRequests}
                                    pageIndex={pageIndexForRenewalPermissionsGroupRequests}
                                    pageSize={pageSizeForRenewalPermissionsGroupRequests}
                                    setPageIndex={setPageIndexForRenewalPermissionsGroupRequests}
                                    setPageSize={setPageSizeForRenewalPermissionsGroupRequests}
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
                <FilteringPermitMembers
                    showAdd={showMemberFilter}
                    handleClose={() => {
                        setShowMemberFilter(false);
                    }}
                    pageSize={pageSizeForRenewalPermissionsRequests}
                    tabName={tabName}
                    setTabName={setTabName}
                />
                <FilteringPermitGroups
                    showAdd={showGroupFilter}
                    handleClose={() => {
                        setShowGroupFilter(false)
                    }}
                    pageSize={pageSizeForRenewalPermissionsGroupRequests}
                    tabName={tabName}
                    setTabName={setTabName}
                />
            </div>
        </Fragment>
    );
};
