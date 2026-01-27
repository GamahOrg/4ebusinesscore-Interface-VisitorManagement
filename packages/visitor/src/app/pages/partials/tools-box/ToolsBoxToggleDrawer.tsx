import React, { FC, useState } from "react";
import { useIntl } from "react-intl";
import { ToolsBoxDrawer } from "./ToolsBoxDrawer";
import { useToolbar } from "@4eplatform/gateway/src/app/layout/core/ToolbarProvider"; 

const ToolsBoxToggleDrawer: FC<any> = ({
  removeFromCardList,
  removeFromTableList,
}) => {
  const intl = useIntl();

  const { showToolBox: show, setShowToolBox: setShow} = useToolbar();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
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
        removeFromCardList={removeFromCardList}
        removeFromTableList={removeFromTableList}
      />
    </>
  );
};
export { ToolsBoxToggleDrawer };
