import React, { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import { ToolsBoxDrawer } from "./ToolsBoxDrawer";
import { useToolbar } from "@4eplatform/gateway/src/app/layout/core/ToolbarProvider";

const ToolsBoxToggleDrawer: FC<any> = () => {
  const intl = useIntl();

  const { showToolBox: show, setShowToolBox: setShow} = useToolbar();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    // <button
    //   id='kt_tools_box_toggle'
    //   className='engage-demos-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm fs-6 px-4 rounded-top-0'
    //   title={intl.formatMessage({ id: "ToolsBox" })}
    //   data-bs-toggle='tooltip'
    //   data-bs-placement='left'
    //   data-bs-dismiss='click'
    //   data-bs-trigger='hover'
    // >
    //   <span id='kt_tools_box_label'>   {intl.formatMessage({ id: "ToolsBox" })}</span>
    // </button>
    <>
      <button
        onClick={handleShow}
        className="engage-demos-toggle btn btn-flex h-35px bg-body btn-color-gray-700 btn-active-color-gray-900 shadow-sm fs-6 px-4 rounded-top-0"
      >
        {intl.formatMessage({ id: "ToolsBox" })}
      </button>
      <ToolsBoxDrawer
        show={show}
        handleClose={handleClose}
      />
    </>
  );
};
export { ToolsBoxToggleDrawer };
