import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { SystemPagination } from "@4eplatform/shared/src/popups/SystemPagination";
import { ViewallcardsTableCardRowInformation } from "./TableCardRowInformation";
import CheckBoxDropDown from "@4eplatform/shared/src/popups/CheckBoxDropDown";
import { Link, useParams } from "react-router-dom";
import ViewallcardsSortPopup from "../popup/sort-popup";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

const ViewAllcardsTableCards: FC = () => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { workspaceName } = useParams();
  const [categories, setCategories] = useState([]);
  const categoryOptions = [
    {
      id: 1,
      name: "تصنيف1",
    },
    {
      id: 2,
      name: "تصنيف2",
    },
    {
      id: 3,
      name: "تصنيف3",
    },
    {
      id: 4,
      name: "تصنيف4",
    },
  ];

  const cardInfo = [
    {
      badgeColor: `bg-light-primary`,
      svgIcon: <i className="fal fa-inbox-in fs-2x"></i>,
      iconTextColor: `primary`,
      title: intl.formatMessage({ id: "RequestAnInternalPermit" }),
      category: `ادوات`,
      owner: `ادارة المستخدمين`,
      permissionBadgeColor: `badge-light-primary`,
      permissionTitle: `كل الادارات`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-danger`,
      svgIcon: <i className="fal fa-inbox-out fs-2x"></i>,
      iconTextColor: `danger`,
      title: intl.formatMessage({ id: "RequestAnExternalPermit" }),
      category: `ادوات`,
      owner: `الادارة المالية`,
      permissionBadgeColor: `badge-light-danger`,
      permissionTitle: `ادارة المعرفة`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-warning`,
      svgIcon: <i className="fas fa-sign-in-alt fs-2x"></i>,
      iconTextColor: `warning`,
      title: intl.formatMessage({ id: "RequestAnEntryPermit" }),
      category: `خدمات`,
      owner: `ادارة تقنية المعلومات`,
      permissionBadgeColor: `badge-light-warning`,
      permissionTitle: `كل الادارات`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-success`,
      svgIcon: <i className="fas fa-users fs-2x"></i>,
      iconTextColor: `success`,
      title: intl.formatMessage({ id: "FollowVisitors" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-success`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-warning`,
      svgIcon: <i className="fas fa-cog fs-2x"></i>,
      iconTextColor: `warning`,
      title: intl.formatMessage({ id: "PermissionsSettings" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-warning`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-info`,
      svgIcon: <i className="fal fa-barcode-read fs-2x"></i>,
      iconTextColor: `info`,
      title: intl.formatMessage({ id: "PermitBarcode" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-info`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-secondary`,
      svgIcon: <i className="fas fa-eye fs-2x"></i>,
      iconTextColor: `secondary`,
      title: intl.formatMessage({ id: "ControlAndMonitoring" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-secondary`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-info`,
      svgIcon: <i className="fas fa-user-shield fs-2x"></i>,
      iconTextColor: `info`,
      title: intl.formatMessage({ id: "safety" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-info`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-primary`,
      svgIcon: <i className="fad fa-file-chart-pie fs-2x"></i>,
      iconTextColor: `primary`,
      title: intl.formatMessage({ id: "VisitorIndicators" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-primary`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-success`,
      svgIcon: <i className="fad fa-analytics fs-2x"></i>,
      iconTextColor: `success`,
      title: intl.formatMessage({ id: "VisitorReports" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-success`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-primary`,
      svgIcon: <KTSVG path="/media/icons/duotune/general/gen069.svg" />,
      iconTextColor: `primary`,
      title: intl.formatMessage({ id: "Alerts" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-danger`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-danger`,
      svgIcon: <i className="fal fa-filter fs-2x"></i>,
      iconTextColor: `danger`,
      title: intl.formatMessage({ id: "SearchAndFiltering" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-danger`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-success`,
      svgIcon: <i className="fas fa-check-square fs-2x"></i>,
      iconTextColor: `success`,
      title: intl.formatMessage({ id: "Approvals" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-danger`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-info`,
      svgIcon: <i className="fa-solid fa-bars fs-2x"></i>,
      iconTextColor: `info`,
      title: intl.formatMessage({ id: "Requests" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-info`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
    {
      badgeColor: `bg-light-info`,
      svgIcon: <i className="fa-solid fa-star fs-2x"></i>,
      iconTextColor: `info`,
      title: intl.formatMessage({ id: "TheFavorites" }),
      category: `ادوات`,
      owner: `ادارة المعرفة`,
      permissionBadgeColor: `badge-light-danger`,
      permissionTitle: `الادارة المالية`,
      cardStatus: `checked`,
    },
  ];
  //
  return (
    <>
      <div className="card-header border-0 pt-3 pb-2 mb-2">
        <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-start align-items-md-center w-100">
          <div className="d-flex gap-5 w-md-50 w-100 mb-3 mb-md-0">
            <input
              type="search"
              name="search"
              className="form-control form-control-solid ps-10"
              placeholder={intl.formatMessage({ id: "Search" })}
            />
            <div className="w-100">
              <CheckBoxDropDown
                placeholder={intl.formatMessage({ id: "Category" })}
                selectedOptions={categories}
                setSelectedOptions={setCategories}
                options={categoryOptions}
              />
            </div>
          </div>
          <div className="d-flex gap-5 justify-content-end w-md-50 w-100">
            <a
              className="btn btn-custom text-white btn-flex fw-bolder bg-gray-500 px-md-15 px-5"
              onClick={handleShow}
            >
              <span className="svg-icon svg-icon-5 me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              {intl.formatMessage({ id: "Filtering" })}
            </a>

            <Link
              to={`/visitor-system-settings/add-service/${workspaceName}`}
              className="btn btn-success px-md-15 px-5"
            >
              {intl.formatMessage({ id: "AddCard" })}
            </Link>
          </div>
        </div>
      </div>

      <div className="py-5 taskLogs">
        <div className="table-responsive">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bolder text-muted">
                <th className="min-w-250px text-center">
                  {intl.formatMessage({ id: "CardName" })}
                </th>
                <th className="min-w-130px text-center">
                  {intl.formatMessage({ id: "Category" })}
                </th>
                <th className="min-w-150px text-center">
                  {intl.formatMessage({ id: "Owner" })}
                </th>
                <th className="min-w-130px text-center">
                  {intl.formatMessage({ id: "Permissions" })}
                </th>
                <th className="min-w-120px text-center">
                  {intl.formatMessage({ id: "CardStatus" })}
                </th>
                <th className="min-w-150px text-center">
                  {intl.formatMessage({ id: "TheProcedures" })}
                </th>
              </tr>
            </thead>

            <tbody>
              {cardInfo?.map((card) => (
                <>
                  <ViewallcardsTableCardRowInformation cardInfo={card} />
                </>
              ))}
            </tbody>
          </table>
          <SystemPagination />
        </div>
      </div>

      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
        />
        <ViewallcardsSortPopup handleClose={handleClose} show={show} />
      </div>
    </>
  );
};

export { ViewAllcardsTableCards };
