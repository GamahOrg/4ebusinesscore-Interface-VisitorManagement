import { storeRegistry } from "./../../../../../node_modules/@4eplatform/shared/store/storeRegistry";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import visitorSlice from "./visitor-slice";
import visitorPermissionStepsSlice from "./visitor-permission-steps-slice";
import visitorPermissionSlice from "./visitor-permission-slice";
import editedPermissionSlice from "./edited-permission-slice";
import violationSlice from "./violation-slice";
import orgHierarchySlice from "@4eplatform/gateway/src/app/features/orgHierarchySlice";
import requestTemplateSlice from "@4eplatform/gateway/src/app/features/requestTemplateSlice";
import userSlice from "@4eplatform/gateway/src/app/features/userSlice";
import permissionsListSlice from "./permissions-list-slice";
import permissionSlice from "./permission-slice";
import orgsSlice from "./orgs-slice";
import usersSlice from "./users-slice";
import cancelRequestsSlice from "./cancel-request-slice";
import permissionsTypeSlice from "./permissions-type-slice";
import rolesSlice from "./roles-slice";
import checkInSlice from "./check-in-slice";
import getAllMyComponentsSlice from "../redux/getAllMyComponentsSlice";
import workspaceSlice from "../../../../gateway/src/app/features/workspaces-slice";
import delegationUserSlice from "./delegationUserSlice";
const store = storeRegistry.createStore({
  visitor: visitorSlice,
  visitorPermissionSteps: visitorPermissionStepsSlice,
  visitorPermission: visitorPermissionSlice,
  editedPermission: editedPermissionSlice,
  violation: violationSlice,
  orgHierarchy: orgHierarchySlice,
  managementEmployees: requestTemplateSlice,
  user: userSlice,
  permission: permissionSlice,
  permissionsList: permissionsListSlice,
  orgs: orgsSlice,
  users: usersSlice,
  cancelRequessts: cancelRequestsSlice,
  permissionTypes: permissionsTypeSlice,
  roles: rolesSlice,
  checkIn: checkInSlice,
  workspace: workspaceSlice,
  myComponents: getAllMyComponentsSlice,
  delegationUser: delegationUserSlice,
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
