import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { VisitorAggConsume } from "@4eplatform/shared/apis/visitor_agg";
import {
  GroupModel,
  PermissionListModel,
} from "../model/permission-list-model";
import { VisitorConsume } from "@4eplatform/shared/apis/visitor";
import { FollowPermissionModel } from "../model/follow-permission-model";

interface PermissionsListState {
  permissionsList: PermissionListModel[];
  myPermissions: PermissionListModel[];
  followPermissionList:FollowPermissionModel[]
  groupsWithVisitors: GroupModel[];
  myPermissionsGroup: GroupModel[];
  status: RequestStatus;
  // Separate loading states for different operations
  loadingPermissionsList: boolean;
  loadingMyPermissions: boolean;
  loadingMyPermissionsGroup: boolean;
  loadingGroupsWithVisitors: boolean;
  loadingFollowPermission: boolean;
  loadingCancelRequestForVisitor: boolean;
  loadingCancelRequestForGroup: boolean;
  loadingFavouriteForVisitor: boolean;
  loadingFavouriteForGroup: boolean;
  loadingArchiveForMember: boolean;
  loadingArchiveForGroup: boolean;
  loadingRenewPermission: boolean;
  paginationForPermissions: Pagination;
  paginationForGroups: Pagination;
  paginationForMyPermissions: Pagination;
  paginationForMyPermissionsGroup: Pagination;
  error: string | null;
}

const initialState: PermissionsListState = {
  permissionsList: [],
  followPermissionList:[],
  groupsWithVisitors: [],
  myPermissions:[],
  myPermissionsGroup: [],
  status: RequestStatus.idle,
  // Initialize loading states
  loadingPermissionsList: false,
  loadingMyPermissions: false,
  loadingMyPermissionsGroup: false,
  loadingGroupsWithVisitors: false,
  loadingFollowPermission: false,
  loadingCancelRequestForVisitor: false,
  loadingCancelRequestForGroup: false,
  loadingFavouriteForVisitor: false,
  loadingFavouriteForGroup: false,
  loadingArchiveForMember: false,
  loadingArchiveForGroup: false,
  loadingRenewPermission: false,
  paginationForPermissions: new Pagination(),
  paginationForGroups: new Pagination(),
  paginationForMyPermissions: new Pagination(),
  paginationForMyPermissionsGroup: new Pagination(),
  error: "",
};
// all get requests

export const fetchGroupsWithVisitors = createAsyncThunk<ResponseModel, any>(
  "permissionsList/fetchGroupsWithVisitors",
  async (params = {}, thunkApi) => {
    try {
      const response = await VisitorAggConsume.getGroupsWithVisitors(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchAllPermissionList = createAsyncThunk<ResponseModel, any>(
  "permissionsList/fetchAllPermissionList",
  async (params = {}, thunkApi) => {
    try {
      const response = await VisitorAggConsume.getAllPermissionList(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchMyPermissions = createAsyncThunk<ResponseModel, any>(
  "permissionsList/fetchMyPermissions",
  async (params = {}, thunkApi) => {
    try {
      const response = await VisitorAggConsume.GetMyPermission(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchMyPermissionsGroup = createAsyncThunk<ResponseModel, any>(
  "permissionsList/fetchMyPermissionsGroup",
  async (params = {}, thunkApi) => {
    try {
      const response = await VisitorAggConsume.GetMyPermissionGroups(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);


export const putPermissionReminder = createAsyncThunk<ResponseModel, any>(
  "permissionsList/putPermissionReminder",
  async (data, thunkApi) => {
    try {
      const response = await VisitorConsume.putPermissionReminder(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchFollowPermission = createAsyncThunk<ResponseModel, any>(
  "permissionsList/fetchFollowPermission",
  async (id:string, thunkApi) => {
    try {
      const response = await VisitorAggConsume.getFollowPermission(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const addCancelRequestForVisitor = createAsyncThunk<ResponseModel, any>(
  "permissionsList/addCancelRequestForVisitor",
  async (data, thunkApi) => {
    try {
      const response = await VisitorConsume.addCancelRequestForVisitor(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const addCancelRequestForGroup = createAsyncThunk<ResponseModel, any>(
  "permissionsList/addCancelRequestForGroup",
  async (data, thunkApi) => {
    try {
      const response = await VisitorConsume.addCancelRequestForGroup(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const putFavouriteForVisitor = createAsyncThunk<ResponseModel, any>(
  "permissionsList/putFavouriteForVisitor",
  async (data, thunkApi) => {
    try {
      const response = await VisitorAggConsume.addVisitorsFavorite(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const putFavouriteForGroup = createAsyncThunk<ResponseModel, any>(
  "permissionsList/putFavouriteForGroup",
  async (data, thunkApi) => {
    try {
      const response = await VisitorConsume.addGroupsFavorite(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addArchiveForMember = createAsyncThunk<ResponseModel, any>(
  "permissionsList/addArchiveForMember",
  async (data, thunkApi) => {
    try {
      const response = await VisitorAggConsume.addVisitorsArchive(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const addArchiveForGroup = createAsyncThunk<ResponseModel, any>(
  "permissionsList/addArchiveForGroup",
  async (data, thunkApi) => {
    try {
      const response = await VisitorConsume.addGroupForArchive(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const renewPermission = createAsyncThunk<ResponseModel, any>(
  "permissionsList/renewPermission",
  async (data, thunkApi) => {
    try {
      const response = await VisitorConsume.editRenewPermission(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const permissionsListSlice = createSlice({
  name: "permissionsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsWithVisitors.pending, (state) => {
        state.loadingGroupsWithVisitors = true;
        state.status = RequestStatus.loading;
      })
      .addCase(fetchGroupsWithVisitors.rejected, (state, action) => {
        state.loadingGroupsWithVisitors = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchGroupsWithVisitors.fulfilled, (state, action) => {
        state.loadingGroupsWithVisitors = false;
        state.groupsWithVisitors = action.payload.result as GroupModel[];
        state.paginationForGroups.totalPages = action.payload.totalPages;
        state.paginationForGroups.totalItems = action.payload.totalItems;
        state.paginationForGroups.pageIndex = action.payload.pageIndex;
        state.paginationForGroups.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchAllPermissionList.pending, (state) => {
        state.loadingPermissionsList = true;
        state.status = RequestStatus.loading;
      })
      .addCase(fetchAllPermissionList.rejected, (state, action) => {
        state.loadingPermissionsList = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchAllPermissionList.fulfilled, (state, action) => {
        state.loadingPermissionsList = false;
        state.permissionsList = action.payload.result as PermissionListModel[];
        state.paginationForPermissions.totalPages = action.payload.totalPages;
        state.paginationForPermissions.totalItems = action.payload.totalItems;
        state.paginationForPermissions.pageIndex = action.payload.pageIndex;
        state.paginationForPermissions.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchMyPermissions.pending, (state) => {
        state.loadingMyPermissions = true;
        state.status = RequestStatus.loading;
      })
      .addCase(fetchMyPermissions.rejected, (state, action) => {
        state.loadingMyPermissions = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchMyPermissions.fulfilled, (state, action) => {
        state.loadingMyPermissions = false;
        state.myPermissions = action.payload.result as PermissionListModel[];
        state.paginationForMyPermissions.totalPages = action.payload.totalPages;
        state.paginationForMyPermissions.totalItems = action.payload.totalItems;
        state.paginationForMyPermissions.pageIndex = action.payload.pageIndex;
        state.paginationForMyPermissions.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchMyPermissionsGroup.pending, (state) => {
        state.loadingMyPermissionsGroup = true;
        state.status = RequestStatus.loading;
      })
      .addCase(fetchMyPermissionsGroup.rejected, (state, action) => {
        state.loadingMyPermissionsGroup = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchMyPermissionsGroup.fulfilled, (state, action) => {
        state.loadingMyPermissionsGroup = false;
        state.myPermissionsGroup = action.payload.result as GroupModel[];
        state.paginationForMyPermissionsGroup.totalPages = action.payload.totalPages;
        state.paginationForMyPermissionsGroup.totalItems = action.payload.totalItems;
        state.paginationForMyPermissionsGroup.pageIndex = action.payload.pageIndex;
        state.paginationForMyPermissionsGroup.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchFollowPermission.pending, (state) => {
        state.loadingFollowPermission = true;
        state.status = RequestStatus.loading;
      })
      .addCase(fetchFollowPermission.rejected, (state, action) => {
        state.loadingFollowPermission = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchFollowPermission.fulfilled, (state, action) => {
        state.loadingFollowPermission = false;
        state.followPermissionList = action.payload.result as FollowPermissionModel[];
        state.status = RequestStatus.succeeded;
      })
      .addCase(addCancelRequestForVisitor.pending, (state) => {
        state.loadingCancelRequestForVisitor = true;
        state.status = RequestStatus.loading;
      })
      .addCase(addCancelRequestForVisitor.rejected, (state, action) => {
        state.loadingCancelRequestForVisitor = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(addCancelRequestForVisitor.fulfilled, (state) => {
        state.loadingCancelRequestForVisitor = false;
        state.status = RequestStatus.succeeded;
      })
      .addCase(addCancelRequestForGroup.pending, (state) => {
        state.loadingCancelRequestForGroup = true;
        state.status = RequestStatus.loading;
      })
      .addCase(addCancelRequestForGroup.rejected, (state, action) => {
        state.loadingCancelRequestForGroup = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(addCancelRequestForGroup.fulfilled, (state) => {
        state.loadingCancelRequestForGroup = false;
        state.status = RequestStatus.succeeded;
      })
      .addCase(putFavouriteForVisitor.pending, (state) => {
        state.loadingFavouriteForVisitor = true;
        state.status = RequestStatus.loading;
      })
      .addCase(putFavouriteForVisitor.rejected, (state, action) => {
        state.loadingFavouriteForVisitor = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(putFavouriteForVisitor.fulfilled, (state) => {
        state.loadingFavouriteForVisitor = false;
        state.status = RequestStatus.succeeded;
      })
      .addCase(putFavouriteForGroup.pending, (state) => {
        state.loadingFavouriteForGroup = true;
        state.status = RequestStatus.loading;
      })
      .addCase(putFavouriteForGroup.rejected, (state, action) => {
        state.loadingFavouriteForGroup = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(putFavouriteForGroup.fulfilled, (state) => {
        state.loadingFavouriteForGroup = false;
        state.status = RequestStatus.succeeded;
      })
      .addCase(addArchiveForMember.pending, (state) => {
        state.loadingArchiveForMember = true;
        state.status = RequestStatus.loading;
      })
      .addCase(addArchiveForMember.rejected, (state, action) => {
        state.loadingArchiveForMember = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(addArchiveForMember.fulfilled, (state) => {
        state.loadingArchiveForMember = false;
        state.status = RequestStatus.succeeded;
      })
      .addCase(addArchiveForGroup.pending, (state) => {
        state.loadingArchiveForGroup = true;
        state.status = RequestStatus.loading;
      })
      .addCase(addArchiveForGroup.rejected, (state, action) => {
        state.loadingArchiveForGroup = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(addArchiveForGroup.fulfilled, (state) => {
        state.loadingArchiveForGroup = false;
        state.status = RequestStatus.succeeded;
      })
      .addCase(renewPermission.pending, (state) => {
        state.loadingRenewPermission = true;
        state.status = RequestStatus.loading;
      })
      .addCase(renewPermission.rejected, (state, action) => {
        state.loadingRenewPermission = false;
        state.status = RequestStatus.failed;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(renewPermission.fulfilled, (state) => {
        state.loadingRenewPermission = false;
        state.status = RequestStatus.succeeded;
      })
      ;
  },
});


export default permissionsListSlice.reducer;
