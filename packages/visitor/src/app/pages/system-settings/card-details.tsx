import { FC } from "react";
import { RightToolbar } from "@4eplatform/shared/src/partials/RightToolbar";
import { ViewAllcardsCardDetails } from "./components/CardDetails";
import { SystemSettingsSmartToolbarDetails } from "./toolbar/SystemSettingsDetailsSmartToolbar";

const ServicesSettingsCardDetails: FC = () => {
  return (
    <>
      <SystemSettingsSmartToolbarDetails />
      <ViewAllcardsCardDetails />
      <RightToolbar />
    </>
  );
};

export default ServicesSettingsCardDetails;
