import { FC } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";


export enum ListOfPermitsToolbarLinkType {
    ProjectBrochure = "ProjectBrochure",
    ListOfPermits = "ListOfPermits",
}

interface IListOfPermitsToolbar {
    isListOfPermits: boolean;
    type: ListOfPermitsToolbarLinkType;
    title?: string;
}

export const ListOfPermitsToolbar: FC<IListOfPermitsToolbar> = ({
    isListOfPermits,
    type,
    title = ""
}) => {
    const intl = useIntl();

    return (
        <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
            <div
                id="kt_toolbar_container"
                className="container-xxl d-flex flex-stack flex-wrap p-0"
            >
                <div className="page-title d-flex flex-column me-3">
                    <h1 className="d-flex text-white fw-bolder my-1 fs-3">
                        {intl.formatMessage({
                            id: isListOfPermits
                                ? "ListOfPermits"
                                : type == ListOfPermitsToolbarLinkType.ProjectBrochure
                                    ? "ProjectBrochure"
                                    : "ProjectDetails"
                        })}
                    </h1>
                    <ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
                        <li className="breadcrumb-item text-white opacity-75">
                            <Link
                                to={"/home-workspace"}
                                className="text-white text-hover-primary"
                            >
                                {intl.formatMessage({ id: "Home" })}
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
                        </li>
                        <li className="breadcrumb-item text-white opacity-75">
                            <Link
                                to={"/pmo-workspace"}
                                className="text-white text-hover-primary"
                            >
                                {intl.formatMessage({ id: "Workspace" })}
                            </Link>
                        </li>
                        {!isListOfPermits && (
                            <>
                                <li className="breadcrumb-item">
                                    <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
                                </li>
                                <li className="breadcrumb-item text-white opacity-75">
                                    <Link
                                        to={"/pmo--feasibility-study"}
                                        className="text-white text-hover-primary"
                                    >
                                        {intl.formatMessage({ id: "ListOfPermits" })}
                                    </Link>
                                </li>

                                {type == ListOfPermitsToolbarLinkType.ProjectBrochure && (
                                    <>
                                        <li className="breadcrumb-item">
                                            <span className="bullet bg-white opacity-75 w-5px h-2px"></span>
                                        </li>
                                        <li className="breadcrumb-item text-white opacity-75">
                                            <div
                                            >
                                                {intl.formatMessage({ id: title || type })}
                                            </div>
                                        </li>
                                    </>
                                )}
                            </>
                        )}
                    </ul>
                </div>
                {isListOfPermits && (
                    <div className="d-flex align-items-center py-3">
                        <Link
                            to={"#"}
                            className="btn btn-bg-white btn-active-color-primary py-lg-3 py-sm-1 px-2"
                        >
                            {intl.formatMessage({ id: "AddListOfPermits" })}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
