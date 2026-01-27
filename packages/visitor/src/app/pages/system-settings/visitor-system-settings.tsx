import { FC } from "react";
import { RightToolbar } from "@4eplatform/shared/src/partials/RightToolbar";
import  SystemSettingsSmartToolbar  from "@4eplatform/shared/src/popups/toolbar/SystemSettingsDetailsSmartToolbar";
import { VisitorSystemSettingsHome } from "./components/VisitorSystemSettingsHome";
const VisitorSystemSettings: FC = () => {
  return (
    <>
      <SystemSettingsSmartToolbar />
      <RightToolbar />
      <VisitorSystemSettingsHome />
    </>
  );
};

export default VisitorSystemSettings;
