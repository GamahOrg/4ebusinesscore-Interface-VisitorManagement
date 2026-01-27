import { FC } from "react";
import { GenericToolbar } from "@4eplatform/shared/src/popups//GenericToolbar";
import { RightToolbar } from "@4eplatform/shared/src/partials/RightToolbar";
import { ReportsIndicators } from "./Components/ReportsIndicators";

const VisitorIndicators: FC = () => {
  return (
    <>
      <GenericToolbar
        list={[
          { key: "Workspace", value: "/visitor-workspace" },
          { key: "VisitorIndicators", value: "" },
        ]}
      />
      <RightToolbar />
      <ReportsIndicators />
    </>
  );
};

export default VisitorIndicators;
