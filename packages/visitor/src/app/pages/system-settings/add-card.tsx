import { FC } from "react";
import { SystemSettingsSmartToolbarAdd } from "./toolbar/SystemSettingsAddSmartToolbar";
import { RightToolbar } from "@4eplatform/shared/src/partials/RightToolbar";
import { ViewAllcardsAddCard } from "./components/AddCard";

const VisitorSystemSettingsAddCard: FC = () => {
  return (
    <>
      <SystemSettingsSmartToolbarAdd />
      <ViewAllcardsAddCard />
      <RightToolbar />
    </>
  );
};

export default VisitorSystemSettingsAddCard;
