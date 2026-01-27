import { FC } from "react";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";
import { ViewGroupViolationHome } from "./components/ViewGroupViolationHome";
const ViewGroupViolations: FC = (props) => {
    let location = useLocation();
    let cardName = location?.state?.cardTitle;
    const breadcrumbItems = [
        {
            path: "/security-and-breaches",
            defaultName: "SecurityAndBreaches",
            name: cardName,
        },
        { path: "", defaultName: "ViewViolations", name: "" },
    ];

    return (
        <>
            <DynamicToolbar
                defaultTitle={"ViewViolations"}
                extraTitle=""
                breadcrumbItems={breadcrumbItems}
                showWorkspace={true}
                cardOption={cardName}
                fixedTitle={true}
            />
            <ViewGroupViolationHome />
        </>
    );
};
export default ViewGroupViolations;