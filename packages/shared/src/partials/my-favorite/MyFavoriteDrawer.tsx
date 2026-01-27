/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { Offcanvas } from "react-bootstrap";

interface MyFavouriteProps {
  show?: any;
  handleClose?: any;
}
const MyFavoriteDrawer = ({ show, handleClose }: MyFavouriteProps) => {
  const intl = useIntl();
  return (
    <>
      {/* <div
      style={{
        left: intl.locale == "ar" ? "0%" : "auto",
        right: intl.locale == "en" ? "0%" : "auto",
      }}
      id="kt_my_favorite"
      className="bg-body"
      data-kt-drawer="true"
      data-kt-drawer-name="help"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'350px', 'md': '525px'}"
      data-kt-drawer-direction={intl.locale == "en" ? "end" : "start"}
      data-kt-drawer-toggle="#kt_my_favorite_toggle"
      data-kt-drawer-close="#kt_help_close"
    > */}
      {/* begin::Card */}
      <Offcanvas
        style={{
          left: intl.locale == "ar" ? "0%" : "auto",
          right: intl.locale == "en" ? "0%" : "auto",
          maxWidth: "440px",
          minWidth: "320px",
          width: "60%",
          // zIndex: 110,
        }}
        show={show}
        onHide={handleClose}
        // className="h-100 bg-body pe-0 drawer drawer-on drawer-overlay"
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
          {/* begin::Header */}
          <Offcanvas.Header
            closeButton
            className="d-flex justify-content-between mx-4 my-3"
          >
            <div className="card-header" id="kt_help_header">
              <Offcanvas.Title className="py-3">
                {" "}
                <h5 className="card-title fw-bold text-gray-600">
                  {intl.formatMessage({
                    id: "AddToolsAndServicesToMyFavourites",
                  })}
                </h5>
              </Offcanvas.Title>

              {/* <div className="card-toolbar">
                <button
                  type="button"
                  className="btn btn-sm btn-icon explore-btn-dismiss me-n5"
                  id="kt_help_close"
                >
                  <KTSVG
                    path="/media/icons/duotune/arrows/arr061.svg"
                    className="svg-icon-2"
                  />
                </button>
              </div> */}
            </div>
          </Offcanvas.Header>

          {/* end::Header */}

          {/* begin::Body */}
          <Offcanvas.Body className="h-100 pt-5 px-0" id="Workspace_List_body">
            {/* begin::Content */}
            <ul className="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9">
              <li className="nav-item">
                <a
                  className="nav-link text-dark opacity-75 opacity-state-100 pb-4 active"
                  data-bs-toggle="tab"
                  href="#MyFavorite"
                >
                  {intl.formatMessage({ id: "MyFavourite" })}
                </a>
              </li>
            </ul>
            <div className="tab-content rounded h-100 bg-light p-10">
              <div className="tab-pane fade active show" id="MyFavorite">
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
                            <KTSVG path="/media/icons/duotune/general/gen064.svg" />
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
                </div>
              </div>
            </div>
          </Offcanvas.Body>
          {/* end::Body */}
        </div>
        {/* end::Card */}
      </Offcanvas>
    </>
  );
};

export { MyFavoriteDrawer };
