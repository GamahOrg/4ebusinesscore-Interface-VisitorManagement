import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { RiFilter2Fill } from "react-icons/ri";
import { ViolationModel } from "../../../model/violation-model";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getAllViolation, getAllViolationGroups } from "../../../redux/violation-slice";
import PermitPersonRow from "./permit-person-row";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { FilteringPopup } from "../popup/Filtering-popup";
import PermitGroupRow from "./permit-group-row";
import PermitsListTableRowGenratorForMemberInGroup from "./PermitsListTableRowGenratorForMemberInGroup";
import { ViolationGroupModel } from "../../../model/violation-group-model";
import { FilteringViolationsGroupPopup } from "../popup/FilteringViolationsGroup";

export function SecurityAndBreachesHome() {
  const intl = useIntl();
  const dispatch = useDispatch();
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
  let [searchTerm, setSearchTerm] = useState("");
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



  const [pageSizeForMember, setPageSizeForMember] = useState<number>(10);
  const [pageIndexForMember, setPageIndexForMember] = useState<number>(1);
  const [pageSizeForGroups, setPageSizeForGroups] = useState<number>(10);
  const [pageIndexForGroups, setPageIndexForGroups] = useState<number>(1);
  let permissionsListForMember:ViolationModel[]  = useSelector((state: RootState)=>{
    return state?.violation?.violations
})

let violationListForGroups:ViolationGroupModel[]  = useSelector((state: RootState)=>{
  return state?.violation?.groupViolations
    })
useEffect(() => {
  let params;
  if (searchTerm) {
    params = {
      pageSize: 1000, 
      pageIndex: 1,
      search: searchTerm,
    };
  } else {
    params = {
      pageSize: pageSizeForMember,
      pageIndex: pageIndexForMember,
      search: searchTerm,
    };
  }
  dispatch(getAllViolation(params) as any);
}, [pageSizeForMember, pageIndexForMember, searchTerm]);

useEffect(() => {
  let params;
  if (searchTerm) {
    params = {
      pageSize: 1000, 
      PageIndex: 1,
      search: searchTerm,
    };
  } else {
    params = {
      pageSize: pageSizeForGroups,
      PageIndex: pageIndexForGroups,
      search: searchTerm,
    };
  }
  dispatch(getAllViolationGroups(params) as any);
}, [pageSizeForGroups, pageIndexForGroups, searchTerm]);
let totalPagesOfViolationsListForMember = useSelector((state: RootState) => {
  return state?.violation?.paginationForSingleViolations?.totalPages;
});
let totalItemsOfViolationsListForMember = useSelector((state: RootState) => {
  return state?.violation?.paginationForSingleViolations?.totalItems;
});


let totalPagesOfViolationsListForGroup = useSelector((state: RootState) => {
  return state?.violation?.paginationForGroupViolations?.totalPages;
});
let totalItemsOfViolationsListForGroup = useSelector((state: RootState) => {
  return state?.violation?.paginationForGroupViolations?.totalItems;
});


  return (
    <>
      <Fragment>
        <div
          id="kt_content_container"
          className="d-flex flex-column-fluid align-items-start container-xxl p-0"
        >
          <div className="content flex-row-fluid" id="kt_content">
            <div className="card mb-5 mb-xl-8 position-relative">
              <div className="card-body py-3">
                <div className="detailsCard my-5">
                  <div className="card-xl-stretch mb-xl-8">

                  <div className="card-title">
            <div className="row d-flex overflow-auto h-66px">
              <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap mb-3">
                {types.map((step: any) => (
                  <button
                    key={step?.id}
                    className={`btn rounded-0 bg-transparent btn-active-color-primary border-0 ms-6 pe-3 fw-bolder  border border-bottom border-white border-2 border-active-primary  ${
                      activeStep?.id === step?.id ? "active" : ""
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
                    {intl.formatMessage({ id: "PersonGroupName" })}
                  </th>
                  <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                    {intl.formatMessage({ id: "Violations" })}
                  </th>
                  <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                    {intl.formatMessage({ id: "StatementType" })}
                  </th>
                  <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                    {intl.formatMessage({
                      id: "AuthorizingAuthority",
                    })}
                  </th>
                  <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                    {intl.formatMessage({ id: "PermitSource" })}
                  </th>
                  <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                    {intl.formatMessage({ id: "visitReceiver" })}
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
                        {permissionsListForMember?.map((permit:any) => (
                          <>
                            <tr key={permit?.violationId}>
                              <PermitPersonRow
                                permit={permit}
                                {...{
                                  pageSizeForMember,
                                  pageIndexForMember,
                                }}
                              />
                            </tr>
                          </>
                        ))}
                      </>
                    ) : (
                      <>
                        {violationListForGroups?.map((permit : any) => (
                          <>
                            <tr key={permit?.groupId}>
                              <PermitGroupRow
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
                              permit?.violationGroupsInfoDto?.map((item :any, index :any) => (
                                <>
                                  <tr key={item?.violationId}>
                                    <PermitsListTableRowGenratorForMemberInGroup
                                      permit={item}
                                      group={permit}
                                      {...{
                                        pageSizeForGroups,
                                        pageIndexForGroups,
                                      }}
                                    />
                                  </tr>
                                </>
                              ))}
                          </>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
                {activeStep?.type == "Person" &&
                  (totalPagesOfViolationsListForMember == 0 ? (
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
                        totalPages={totalPagesOfViolationsListForMember}
                        totalItems={totalItemsOfViolationsListForMember}
                        pageIndex={pageIndexForMember}
                        pageSize={pageSizeForMember}
                        setPageIndex={setPageIndexForMember}
                        setPageSize={setPageSizeForMember}
                      />
                    </>
                  ))}

                {activeStep?.type !== "Person" &&
                  (totalPagesOfViolationsListForGroup == 0 ? (
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
                        totalPages={totalPagesOfViolationsListForGroup}
                        totalItems={totalItemsOfViolationsListForGroup}
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
        <FilteringPopup
          showAdd={showMemberFilter}
          handleClose={() => {
            setShowMemberFilter(false);
          }}
        />
        <FilteringViolationsGroupPopup
          showAdd={showGroupFilter}
          handleClose={() => {
            setShowGroupFilter(false);
          }}
        />
      </div>
      </Fragment>
    </>
  );
}


