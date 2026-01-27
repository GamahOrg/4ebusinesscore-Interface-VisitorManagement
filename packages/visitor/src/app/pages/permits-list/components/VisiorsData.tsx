import React, { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { Fragment, useState } from "react";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { RiFilter2Fill } from "react-icons/ri";
import { GroupPermissionDetailsModel } from "../../../model/group-permission-details-model";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { GetGroupbyIDWithFilter } from "../../../redux/permission-slice";
import VisitorsTableInGroup from "./VisitorsTableInGroup";
import { FilterVistorsByGroupIdPopup } from "../popup/FilterVistorsByGroupIdPopup";

interface GroupDataProps {
  groupPermission: GroupPermissionDetailsModel;
}

const VisitorsData: FC<GroupDataProps> = ({ groupPermission }) => {
  const intl = useIntl();
  const [showFilter, setShowFilter] = useState(false);
  let [searchTerm, setSearchTerm] = useState("");
  const { groupId } = useParams();
  let dispatch = useDispatch();
  const { groupPermissionWithFilter } = useSelector(
    (state: RootState) => state.permission
  );
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  let totalPages = useSelector((state: RootState) => {
    return state?.permission?.paginationForFilteredGroup?.totalPages;
  });
  let totalItems = useSelector((state: RootState) => {
    return state?.permission?.paginationForFilteredGroup?.totalItems;
  });
  useEffect(() => {
    dispatch(
      GetGroupbyIDWithFilter({
        Gruopid: groupId,
        pagesize: pageSize,
        pageIndex,
        search: searchTerm,
      }) as any
    );
  }, [groupId, searchTerm, pageSize, pageIndex]);

  return (
    <>
      <div className="card  p-6 mb-7">
        <div className="px-3 mb-1">
          <p className="fw-bolder fs-4">
            {intl.formatMessage({ id: "VisitorsData" })}
          </p>
        </div>
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
                  {/* <div
                    className="btn w-auto btn-custom text-white btn-flex   fw-bolder"
                    style={{ backgroundColor: "#A1A5B7" }}
                    onClick={() => setShowFilter(true)}
                  >
                    <RiFilter2Fill size={17} className="me-3 text-white" />{" "}
                    {intl.formatMessage({ id: "Filtering" })}
                  </div> */}
                </div>
              </div>
              <div className="card-body py-3">
                <div className={`tab-pane fade show`} id="kt_tab_project_tasks">
                  <div className="table-responsive mb-3">
                    <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center">
                      <thead>
                        <tr className="fw-bolder projectSecColor">
                          <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                            {intl.formatMessage({ id: "PermitNumber" })}
                          </th>
                          <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                            {intl.formatMessage({ id: "VisitorName" })}
                          </th>
                          <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                            {intl.formatMessage({ id: "StatementType" })}
                          </th>
                          <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                            {intl.formatMessage({ id: "AuthorizingAuthority" })}
                          </th>
                          {/* <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                            {intl.formatMessage({ id: "Parkings" })}
                          </th> */}
                          <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                            {intl.formatMessage({ id: "VisitReceiver" })}
                          </th>
                          <th className="px-2 pb-3 min-w-50px max-w-350px text-muted">
                            {intl.formatMessage({ id: "PermitStatus" })}
                          </th>
                          {/* <th className="px-2 pb-3 min-w-50px max-w-200px text-muted">
                            {intl.formatMessage({ id: "Options" })}
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {groupPermissionWithFilter?.visitor?.map((visitor) => (
                          <Fragment key={visitor?.vistorId}>
                            <tr>
                              <VisitorsTableInGroup
                                visitor={visitor}
                                {...{
                                  pageIndex,
                                  pageSize,
                                }}
                              />
                            </tr>
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
      <FilterVistorsByGroupIdPopup
        showAdd={showFilter}
        handleClose={() => {
          setShowFilter(false);
        }}
      />
    </>
  );
};

export default VisitorsData;
