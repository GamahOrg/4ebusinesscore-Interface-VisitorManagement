/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useIntl } from "react-intl";
import { PmoSystemTools } from "./components/PmoSystemTools";
import { Offcanvas } from "react-bootstrap";
import { useParams } from "react-router";

interface ToolBoxProps {
  show?: any;
  handleClose?: any;
  removeFromCardList: any;
  removeFromTableList: any;
}
export function ToolsBoxDrawer({
  removeFromCardList,
  removeFromTableList,
  show,
  handleClose,
}: ToolBoxProps) {
  const intl = useIntl();
  let {workspaceName}=useParams()


  const [getMyToolsList, setMyToolsList] = useState([
      {
        id: 1,
        title: intl.formatMessage({ id: "RequestAnInternalPermit" }),
        icon: <i className="fal fa-inbox-in fs-2x"></i>,
        link: "/request-internal-permit",
        color: "text-primary",
        transition: "text-hover-primary",
        isChecked: true,
      },
      {
        id: 2,
        title: intl.formatMessage({ id: "RequestAnEntryPermit" }),
        icon: <i className="fal fa-inbox-out fs-2x"></i>,
        link: "/request-entry-permit",
        color: "text-danger",
        transition: "text-hover-danger",
        isChecked: true,
      },
      {
        id: 3,
        title: intl.formatMessage({ id: "PermissionsPermits" }),
        icon: <i className="fas fa-cog fs-2x"></i>,
        link: "/permissions-Permits",
        color: "text-warning",
        transition: "text-hover-warning",
        isChecked: true,
      },
      {
        id: 4,
        title: intl.formatMessage({ id: "ListOfPermits" }),
        icon: <i className="fas fa-folder fs-2x"></i>,
        link: "/permits-list",
        color: "text-primary",
        transition: "text-hover-primary",
        isChecked: true,
      },
      {
        id: 6,
        title: intl.formatMessage({ id: "VisitorReports" }),
        icon: <i className="fad fa-analytics fs-2x"></i>,
        link: "/visitor-reports",
        color: "text-success",
        transition: "text-hover-success",
        isChecked: true,
      },
      {
        id: 7,
        title: intl.formatMessage({ id: "SecurityAndBreaches" }),
        icon: <i className="fas fa-user-shield fs-2x"></i>,
        link: "/security-and-breaches",
        color: "text-info",
        transition: "text-hover-info",
        isChecked: true,
      },
      {
        id: 8,
        title: intl.formatMessage({ id: "VisitorIndicators" }),
        icon: <i className="fad fa-file-chart-pie fs-2x"></i>,
        link: "/visitor-indicators",
        color: "text-primary",
        transition: "text-hover-primary",
        isChecked: true,
      },
  
      {
        id: 9,
        title: intl.formatMessage({ id: "Alerts" }),
        icon: <KTSVG path="/media/icons/duotune/general/gen069.svg" />,
        link: "/notifications-details",
        color: "text-primary",
        transition: "text-hover-primary",
        isChecked: true,
      },
      {
        id: 10,
        title: intl.formatMessage({ id: "SearchAndFiltering" }),
        icon: <i className="fal fa-filter fs-2x"></i>,
        link: "#",
        color: "text-danger",
        transition: "text-hover-danger",
        isChecked: true,
      },
      {
        id: 11,
        title: intl.formatMessage({ id: "Approvals" }),
        icon: <i className="fas fa-check-square fs-2x"></i>,
        link: "#",
        color: "text-success",
        transition: "text-hover-success",
        isChecked: true,
      },
      {
        id: 12,
        title: intl.formatMessage({ id: "Requests" }),
        icon: <i className="fa-solid fa-bars fs-2x"></i>,
        link: "#",
        color: "text-info",
        transition: "text-hover-info",
        isChecked: true,
      },
      {
        id: 13,
        title: intl.formatMessage({ id: "TheFavorites" }),
        icon: <i className="fa-solid fa-star fs-2x"></i>,
        link: "/visitor-favorites",
        color: "text-info",
        transition: "text-hover-info",
        isChecked: true,
      },
      {
        id: 8,
        title: intl.formatMessage({ id: "Archive" }),
        icon: <i className="fas bi-archive-fill fs-2x"></i>,
        link: "/archive-favorites",
        color: "text-danger",
        transition: "text-danger",
        isChecked: true,
      },
      {
        id: 14,
        title: intl.formatMessage({ id: "SystemSettings" }),
        icon: <i className="fas fa-users-cog fs-2x"></i>,
        link: "/visitor-system-settings/visitor-workspace",
        color: "text-danger",
        transition: "text-hover-danger",
        isChecked: true,
      },
  ]);



  //Committees Shared Services
  const [getSharedServicesList, setSharedServicesList] = useState([

    {
      id: 2,
      title: intl.formatMessage({ id: "CommitteeFormation" }),
      icon: <i className="fas fa-code-branch fs-2x"></i>,
      link: "/committee-formation",
      color: "text-primary",
      transition: "text-hover-primary",
      isChecked: true,
    },
  ]);

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.name === "getMyToolsList" &&
      window.location.pathname === "/visitor-workspace"
    ) {
      const index = getMyToolsList.findIndex(
        (item) => item.id === +event.target.id
      );
      const newMyToolsList = [...getMyToolsList];
      newMyToolsList[index].isChecked = event.target.checked;
      setMyToolsList(newMyToolsList);
      removeFromCardList(event.target.value, event.target.checked);
    } else if (
      event.target.name === "getSharedServicesList" &&
      window.location.pathname === "/visitor-workspace"
    ) {
      const index = getSharedServicesList.findIndex(
        (item) => item.id === +event.target.id
      );
      const newSharedServicesList = [...getSharedServicesList];
      newSharedServicesList[index].isChecked = event.target.checked;
      setSharedServicesList(newSharedServicesList);
      removeFromTableList(event.target.value, event.target.checked);
    }
  };
  return (
    <>
      <Offcanvas
        style={{
          left: intl.locale == "ar" ? "0%" : "auto",
          right: intl.locale == "en" ? "0%" : "auto",
          maxWidth: "440px",
          minWidth: "320px",
          width: "60%",
        }}
        show={show}
        onHide={handleClose}
        autoFocus={true}
        className="bg-light pe-0 drawer drawer-on overflow-hidden fade"
      >
        <div className="drawer-overlay" onClick={handleClose}></div>
        <div
          style={{
            zIndex: 120,
          }}
          className="card shadow-none w-100 h-100 bg-body rounded-0"
        >
          <Offcanvas.Header
            closeButton
            className="d-flex justify-content-between mx-4 my-3"
          >
            <div className="card-header" id="kt_explore_header">
              <Offcanvas.Title className="py-3">
                <h5 className="card-title fw-bold text-gray-600">
                  {intl.formatMessage({ id: "AddingServicesToTheWorkspace" })}
                </h5>
              </Offcanvas.Title>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body className="h-100 pt-5 px-0" id="Workspace_List_body">
            <ul className="nav nav-line-tabs side-menu-tab nav-line-tabs-2x nav-stretch fw-bold px-9">
              <li className="nav-item">
                <a
                  className="nav-link text-dark opacity-75 opacity-state-100 pb-4 active"
                  data-bs-toggle="tab"
                  href="#MyToolsTab"
                >
                  {" "}
                  {intl.formatMessage({ id: "MyTools" })}
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link text-dark opacity-75 opacity-state-100 pb-4"
                  data-bs-toggle="tab"
                  href="#SharedServicesTab"
                >
                  {" "}
                  {intl.formatMessage({ id: "SharedServices" })}
                </a>
              </li>
            </ul>
            <div className="tab-content rounded h-100 bg-light p-10">
              <div className="tab-pane fade active show" id="MyToolsTab">
                <div
                  id="Workspace_List_scroll"
                  className="hover-scroll-overlay-y"
                  data-kt-scroll="true"
                  data-kt-scroll-height="auto"
                  data-kt-scroll-wrappers="#Workspace_List_body"
                  data-kt-scroll-dependencies="#Workspace_List_header"
                  data-kt-scroll-offset="5px"
                >
                  <div className="rounded border border-dashed border-gray-300 p-0 mb-7">
                    <div className="fs-5 fw-bold mb-0">
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="position-relative w-md-400px ms-md-0">
                          <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                            <KTSVG path="/media/icons/duotune/general/gen065.svg" />
                          </span>
                          <input
                            type="text"
                            className="form-control form-control-solid ps-10"
                            name="search"
                            value=""
                            placeholder={intl.formatMessage({
                              id: "TypeYourSearchHere",
                            })}
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <button type="submit" className="btn btn-primary">
                            {intl.formatMessage({ id: "Search" })}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-body">
                    {getMyToolsList.map((mytoolscard) => (
                      <>
                        <div className="d-flex align-items-center mb-7">
                          <div className="d-flex flex-stack flex-grow-1 me-5 ms-lg-6">
                            <PmoSystemTools
                              id={mytoolscard.id}
                              title={mytoolscard.title}
                              icon={mytoolscard.icon as any}
                              link={mytoolscard.link}
                              color={mytoolscard.color}
                              transition={mytoolscard.transition}
                            />

                            <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-lg">
                              <input
                                id={`${mytoolscard.id}`}
                                className="form-check-input widget-9-check xCheckBg"
                                type="checkbox"
                                value={mytoolscard.title}
                                name="getMyToolsList"
                                checked={mytoolscard.isChecked}
                                onChange={(event) => {
                                  handleChangeCheckBox(event);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="SharedServicesTab">
                <div
                  className="hover-scroll-overlay-y"
                  data-kt-scroll="true"
                  data-kt-scroll-height="auto"
                  data-kt-scroll-offset="5px"
                >
                  <div className="rounded border border-dashed border-gray-300 p-0 mb-7">
                    <div className="fs-5 fw-bold mb-0">
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="position-relative w-md-400px ms-md-0">
                          <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                            <KTSVG path="/media/icons/duotune/general/gen065.svg" />
                          </span>
                          <input
                            type="text"
                            className="form-control form-control-solid ps-10"
                            name="search"
                            value=""
                            placeholder={intl.formatMessage({
                              id: "TypeYourSearchHere",
                            })}
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <button type="submit" className="btn btn-primary">
                            {intl.formatMessage({ id: "Search" })}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-body">
                    {getSharedServicesList.map((sharedservicesscard) => (
                      <>
                        <div className="d-flex align-items-center mb-7">
                          <div className="d-flex flex-stack flex-grow-1 me-5 ms-lg-6">
                            <PmoSystemTools
                              id={sharedservicesscard.id}
                              title={sharedservicesscard.title}
                              icon={sharedservicesscard.icon as any}
                              link={sharedservicesscard.link}
                              color={sharedservicesscard.color}
                              transition={sharedservicesscard.transition}
                            />

                            <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-lg">
                              <input
                                id={`${sharedservicesscard.id}`}
                                className="form-check-input widget-9-check xCheckBg"
                                type="checkbox"
                                value={sharedservicesscard.title}
                                name="getSharedServicesList"
                                checked={sharedservicesscard.isChecked}
                                onChange={(event) => {
                                  handleChangeCheckBox(event);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </>
  );
}
