import { FC } from "react";
import { SystemSettingsSmartToolbarEdit } from "@4eplatform/shared/src/popups/toolbar/SystemSettingsEditSmartToolbar";
import { RightToolbar } from "@4eplatform/shared/src/partials/RightToolbar";
import { ViewAllcardsEditCard } from "./components/EditCard";

const VisitorSystemSettingsEditCard: FC = () => {
  return (
    <>
      <SystemSettingsSmartToolbarEdit />
      <ViewAllcardsEditCard />
      <RightToolbar />
    </>
  );
};

export default VisitorSystemSettingsEditCard;
