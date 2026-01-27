import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const VisitorEndpoints: { [key: string]: Endpoint } = {
  addViolation: {
    url: "Violation/PostViolation",
    method: "post",
  },
  editViolation: {
    url: "/Violation/PutViolation",
    method: "put",
  },
  deleteViolations: {
    url: "/Violation/DeleteAllViolationByVisitorId",
    method: "delete",
  },
  editVisitorsReportStatus: {
    url: "VisitorsPermission/PutVisitorsReportStatus",
    method: "putByQuery",
  },
  editGroupReportStatus: {
    url: "VisitorsPermission/PutGroupReportStatus",
    method: "putByQuery",
  },
  editRenewPermission: {
    url: "VisitorsPermission/RenewPermission",
    method: "put",
  },
  addCancelRequestForVisitor: {
    url: "CancelRequest/PostCancelRequest",
    method: "post",
  },
  addCancelRequestForGroup: {
    url: "CancelRequest/PostCancelRequestGroup",
    method: "post",
  },
  editStatusCancelRequest: {
    url: "CancelRequest/PutStatusCancelRequest",
    method: "put",
  },
  editStatusCancelRequestGroup: {
    url: "CancelRequest/PutStatusCancelRequestGroup",
    method: "put",
  },
  editPutStatusEditRequest: {
    url: "PutEditedrequest/PutStatusEditRequest",
    method: "put",
  },
  violationDetails: {
    url: "Violation/GetViolationById",
    method: "get",
  },
  addGroupsFavorite: {
    url: "VisitorsPermission/AddGroupToFouvrite",
    method: "putByIdWithQuery",
  },
  addGroupForArchive: {
    url: "VisitorsPermission/AddGroupToArchive",
    method: "putByIdWithQuery",
  },
  deleteViolation: {
    url: "/Violation/DeleteViolationById",
    method: "delete",
  },
  getPermissionTypes: {
    url: "LookUps/GetAllLKPermissiontypes",
    method: "get",
  },
  putPermissionReminder: {
    url: "IsReminder/IsReminder",
    method: "putById",
  },
  createCheckIn: {
    url: "CheckIn_OutVisitor/CheckInVisitor",
    method: "postByParamsWithBody",
  },
  updateCheckIn: {
    url: "CheckIn_OutVisitor/CheckOutVisitor",
    method: "postById",
  },
};

export const VisitorRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Visitor_Url
}/`;
const VisitorBaseUrl = `${VisitorRootUrl}api/`;

export const VisitorConsume = initializeConsume(
  VisitorBaseUrl,
  VisitorEndpoints
);
