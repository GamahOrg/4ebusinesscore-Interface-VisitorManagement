import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const VisitorEndpoints: { [key: string]: Endpoint } = {
  addPermissionVisitor: {
    url: "Visitor/PostPermissionVisitor",
    method: "post",
  },
  editPermissionVisitor: {
    url: "VisitorPermissionSteps/EditPermissionVisitor",
    method: "post",
  },
  getVisitorPermission: {
    url: "VisitorPermission",
    method: "get",
  },
  getVisitorPermissionGroup: {
    url: "VisitorPermission/GetVisitorsPermissionGroup",
    method: "get",
  },
  getCancelPermissions: {
    url: "VisitorPermission/GetCancelPermissions",
    method: "get",
  },
  getCancelPermissionsGroup: {
    url: "VisitorPermission/GetCancelPermissionsGroup",
    method: "get",
  },
  getFollowPermission: {
    url: "VisitorPermission/FollowPermission",
    method: "getById",
  },
  getPermissionFavoriteOrArchive: {
    url: "VisitorPermission/GetPermissionFavoriteOrArchive",
    method: "get",
  },
  getPermissionFavoriteOrArchiveGroup: {
    url: "VisitorPermission/GetPermissionFavoriteOrArchiveGroup",
    method: "get",
  },
  getEditedPermission: {
    url: "EditedPermission/GetEditedPermission",
    method: "get",
  },
  getEditedPermissionGroup: {
    url: "EditedPermission/GetEditedPermissionGroup",
    method: "get",
  },
  getEditedPermissionById: {
    url: "EditedPermission/GetEditedPermissionById",
    method: "getById",
  },
  getAllViolation: {
    url: "Violation/GetAllViolation",
    method: "get",
  },
  getViolationsByVisitorID: {
    url: "Violation/GetViolationsByVisitorID/Id",
    method: "get",
  },
  getAllPermissionList: {
    url: "PermissionControllers/GetAllPermissionList",
    method: "get",
  },
  getGroupsWithVisitors: {
    url: "PermissionControllers/GetGroupsWithVisitors",
    method: "get",
  },
  GetMyPermission: {
    url: "PermissionControllers/GetMyPermission",
    method: "get",
  },
  GetMyPermissionGroups: {
    url: "PermissionControllers/GetMyPermissionGroups",
    method: "get",
  },
  getGetPermissionByVisitorId: {
    url: "PermissionControllers/GetPermissionbyVistorid",
    method: "get",
  },
  getGroupByID: {
    url: "PermissionControllers/GetGroupbyID",
    method: "get",
  },
  addGroupPermission: {
    url: "Group/PostGroupPermission",
    method: "post",
  },
  addVisitorToPermission: {
    url: "Visitors/AddVisitortoPermission",
    method: "post",
  },
  addVisitorsArchive: {
    url: "Visitors/AddArchive",
    method: "put",
  },
  addVisitorsFavorite: {
    url: "Visitors/AddFouvrite",
    method: "put",
  },
  getPermissionbyVistorid: {
    url: "/PermissionControllers/GetPermissionbyVistorid",
    method: "get",
  },
  getAllViolationGroups: {
    url: "Violation/GetAllViolationGroups",
    method: "get",
  },
  getViolationsByGroupId: {
    url: "Violation/GetGroupMembersViolationByGroupID/Id",
    method: "get",
  },
  editVisitorsReportStatus: {
    url: "VisitorPermission/PutVisitorsReportStatus",
    method: "putByQueryWithBody",
  },
  editGroupReportStatus: {
    url: "VisitorPermission/PutGroupReportStatus",
    method: "putByQueryWithBody",
  },
  editStatusCancelRequest: {
    url: "VisitorPermission/PutStatusCancelRequest",
    method: "putByQueryWithBody",
  },
  editStatusCancelRequestGroup: {
    url: "VisitorPermission/PutStatusCancelRequestGroup",
    method: "putByQueryWithBody",
  },
  getCheckInList: {
    url: "CheckIn_OutVisitor/GetAllCheckIn_OutVisitor",
    method: "get",
  },
  getCheckInById: {
    url: "CheckIn_OutVisitor/GetCheckOutVisitor",
    method: "getById",
  },
};

export const VisitorAggRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Visitor_Agg_Url
}/`;
const VisitorAggUrl = `${VisitorAggRootUrl}api/`;

export const VisitorAggConsume = initializeConsume(
  VisitorAggUrl,
  VisitorEndpoints
);
