import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { VisitorAggConsume } from "@4eplatform/shared/apis/visitor_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { VisitorPermissionModel } from "../model/visitor-permission-model";
import { VisitorsPermissionGroupModel } from "../model/visitior-permission-group-model";
import { CancelPermissionModel } from "../model/cancel-permission-model";
import { CancelPermissionGroupModel } from "../model/cancel-permission-group-model";
import { FollowPermissionModel } from "../model/follow-permission-model";
import { VisitorConsume } from "@4eplatform/shared/apis/visitor";


interface VisitorPermissionState {
  visitorPermission:VisitorPermissionModel[];
  visitorPermissionGroup:VisitorsPermissionGroupModel[];
  additionPermissionsRequests:VisitorsPermissionGroupModel[];
  renewalPermissionsRequests:VisitorPermissionModel[];
  renewalPermissionsGroupRequests:VisitorsPermissionGroupModel[];
  cancelPermissions:CancelPermissionModel[];
  cancelPermissionsGroup:CancelPermissionGroupModel[];
  followPermission:FollowPermissionModel;
  permissionFavoriteOrArchive:VisitorPermissionModel[];
  permissionFavoriteOrArchiveGroup: VisitorsPermissionGroupModel[];
  status: RequestStatus;
  // Separate loading states for different operations
  loadingVisitorPermission: boolean;
  loadingVisitorPermissionGroup: boolean;
  loadingAdditionPermissionsRequests: boolean;
  loadingRenewalPermissionsRequests: boolean;
  loadingRenewalPermissionsGroupRequests: boolean;
  loadingCancelPermissions: boolean;
  loadingCancelPermissionsGroup: boolean;
  loadingFollowPermission: boolean;
  loadingPermissionFavoriteOrArchive: boolean;
  loadingPermissionFavoriteOrArchiveGroup: boolean;
  paginationForVisitorPermission: Pagination;
  paginationForVisitorPermissionGroup: Pagination;
  paginationForAdditionPermissionsRequests: Pagination;
  paginationForRenewalPermissionsRequests: Pagination;
  paginationForRenewalPermissionsGroupRequests: Pagination;
  paginationForCancelPermission: Pagination;
  paginationForCancelPermissionGroup: Pagination;
  paginationForFollowPermission: Pagination;
  paginationForPermissionFavoriteOrArchive: Pagination;
  paginationForPermissionFavoriteOrArchiveGroup: Pagination;
  error: string | null;
}

const initialState:VisitorPermissionState = {
    visitorPermission:[],
    visitorPermissionGroup:[],
    additionPermissionsRequests:[],
    renewalPermissionsRequests:[],
    renewalPermissionsGroupRequests:[],
    cancelPermissions:[],
    cancelPermissionsGroup:[],
    followPermission:new FollowPermissionModel(),
    permissionFavoriteOrArchive:[],
    permissionFavoriteOrArchiveGroup:[],
    status: RequestStatus.idle,
    // Initialize loading states
    loadingVisitorPermission: false,
    loadingVisitorPermissionGroup: false,
    loadingAdditionPermissionsRequests: false,
    loadingRenewalPermissionsRequests: false,
    loadingRenewalPermissionsGroupRequests: false,
    loadingCancelPermissions: false,
    loadingCancelPermissionsGroup: false,
    loadingFollowPermission: false,
    loadingPermissionFavoriteOrArchive: false,
    loadingPermissionFavoriteOrArchiveGroup: false,
    paginationForVisitorPermission: new Pagination(),
    paginationForVisitorPermissionGroup: new Pagination(),
    paginationForAdditionPermissionsRequests: new Pagination(),
    paginationForRenewalPermissionsRequests: new Pagination(),
    paginationForRenewalPermissionsGroupRequests: new Pagination(),
    paginationForCancelPermission: new Pagination(),
    paginationForCancelPermissionGroup: new Pagination(),
    paginationForFollowPermission: new Pagination(),
    paginationForPermissionFavoriteOrArchive: new Pagination(),
    paginationForPermissionFavoriteOrArchiveGroup: new Pagination(),
    error: "",
  };
  

  export const getVisitorPermission = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/getVisitorPermission",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getVisitorPermission(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const getVisitorPermissionGroup = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/getVisitorPermissionGroup",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getVisitorPermissionGroup(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const getAdditionPermissionsRequests = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/getAdditionPermissionsRequests",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getVisitorPermissionGroup(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const getRenewalPermissionsRequests = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/getRenewalPermissionsRequests",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getVisitorPermission(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const getRenewalPermissionsGroupRequests = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/getRenewalPermissionsGroupRequests",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getVisitorPermissionGroup(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );


  export const getCancelPermissions = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/getCancelPermissions",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getCancelPermissions(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const getCancelPermissionsGroup = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/getCancelPermissionsGroup",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getCancelPermissionsGroup(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const getFollowPermission = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/getFollowPermission",
    async (id:string|number, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getFollowPermission(id);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const getPermissionFavoriteOrArchive = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/getPermissionFavoriteOrArchive",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getPermissionFavoriteOrArchive(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  
  export const getPermissionFavoriteOrArchiveGroup = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/getPermissionFavoriteOrArchiveGroup",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getPermissionFavoriteOrArchiveGroup(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const updateVisitorPermissionStatus = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/updateVisitorPermissionStatus",
    async (update, thunkApi) => {
      try {
        const response = await VisitorAggConsume.editVisitorsReportStatus(update);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const updateVisitorPermissionGroupStatus = createAsyncThunk<ResponseModel, any>(
    "VisitorPermission/updateVisitorPermissionGroupStatus",
    async (update, thunkApi) => {
      try {
        const response = await VisitorAggConsume.editGroupReportStatus(update);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );



 

  
  const visitorPermissionSlice = createSlice({
    name: "VisitorPermission",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getVisitorPermission.pending, (state) => {
          state.loadingVisitorPermission = true;
          state.status = RequestStatus.loading;
        })
        .addCase(getVisitorPermission.rejected, (state, action) => {
          state.loadingVisitorPermission = false;
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(getVisitorPermission.fulfilled, (state, action) => {
          state.loadingVisitorPermission = false;
          state.status = RequestStatus.succeeded;
          state.visitorPermission = action.payload.result as VisitorPermissionModel[];
          state.paginationForVisitorPermission.totalPages = action.payload.totalPages;
          state.paginationForVisitorPermission.totalItems = action.payload.totalItems;
          state.paginationForVisitorPermission.pageIndex = action.payload.pageIndex;
          state.paginationForVisitorPermission.pageSize = action.payload.pageSize;
        })
        .addCase(getVisitorPermissionGroup.pending, (state) => {
          state.loadingVisitorPermissionGroup = true;
          state.status = RequestStatus.loading;
        })
        .addCase(getVisitorPermissionGroup.rejected, (state, action) => {
          state.loadingVisitorPermissionGroup = false;
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(getVisitorPermissionGroup.fulfilled, (state, action) => {
          state.loadingVisitorPermissionGroup = false;
          state.status = RequestStatus.succeeded;
          state.visitorPermissionGroup = action.payload.result as VisitorsPermissionGroupModel[];
          state.paginationForVisitorPermissionGroup.totalPages = action.payload.totalPages;
          state.paginationForVisitorPermissionGroup.totalItems = action.payload.totalItems;
          state.paginationForVisitorPermissionGroup.pageIndex = action.payload.pageIndex;
          state.paginationForVisitorPermissionGroup.pageSize = action.payload.pageSize;
        })
        .addCase(getAdditionPermissionsRequests.pending, (state) => {
          state.loadingAdditionPermissionsRequests = true;
          state.status = RequestStatus.loading;
        })
        .addCase(getAdditionPermissionsRequests.rejected, (state, action) => {
          state.loadingAdditionPermissionsRequests = false;
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(getAdditionPermissionsRequests.fulfilled, (state, action) => {
          state.loadingAdditionPermissionsRequests = false;
          state.status = RequestStatus.succeeded;
          state.additionPermissionsRequests = action.payload.result as VisitorsPermissionGroupModel[];
          state.paginationForAdditionPermissionsRequests.totalPages = action.payload.totalPages;
          state.paginationForAdditionPermissionsRequests.totalItems = action.payload.totalItems;
          state.paginationForAdditionPermissionsRequests.pageIndex = action.payload.pageIndex;
          state.paginationForAdditionPermissionsRequests.pageSize = action.payload.pageSize;
        })
        .addCase(getRenewalPermissionsRequests.pending, (state) => {
          state.loadingRenewalPermissionsRequests = true;
          state.status = RequestStatus.loading;
        })
        .addCase(getRenewalPermissionsRequests.rejected, (state, action) => {
          state.loadingRenewalPermissionsRequests = false;
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(getRenewalPermissionsRequests.fulfilled, (state, action) => {
          state.loadingRenewalPermissionsRequests = false;
          state.status = RequestStatus.succeeded;
          state.renewalPermissionsRequests = action.payload.result as VisitorPermissionModel[];
          state.paginationForRenewalPermissionsRequests.totalPages = action.payload.totalPages;
          state.paginationForRenewalPermissionsRequests.totalItems = action.payload.totalItems;
          state.paginationForRenewalPermissionsRequests.pageIndex = action.payload.pageIndex;
          state.paginationForRenewalPermissionsRequests.pageSize = action.payload.pageSize;
        })
        .addCase(getRenewalPermissionsGroupRequests.pending, (state) => {
          state.loadingRenewalPermissionsGroupRequests = true;
          state.status = RequestStatus.loading;
        })
        .addCase(getRenewalPermissionsGroupRequests.rejected, (state, action) => {
          state.loadingRenewalPermissionsGroupRequests = false;
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(getRenewalPermissionsGroupRequests.fulfilled, (state, action) => {
          state.loadingRenewalPermissionsGroupRequests = false;
          state.status = RequestStatus.succeeded;
          state.renewalPermissionsGroupRequests = action.payload.result as VisitorsPermissionGroupModel[];
          state.paginationForRenewalPermissionsGroupRequests.totalPages = action.payload.totalPages;
          state.paginationForRenewalPermissionsGroupRequests.totalItems = action.payload.totalItems;
          state.paginationForRenewalPermissionsGroupRequests.pageIndex = action.payload.pageIndex;
          state.paginationForRenewalPermissionsGroupRequests.pageSize = action.payload.pageSize;
        })
        .addCase(getCancelPermissions.pending, (state) => {
          state.loadingCancelPermissions = true;
          state.status = RequestStatus.loading;
        })
        .addCase(getCancelPermissions.rejected, (state, action) => {
          state.loadingCancelPermissions = false;
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(getCancelPermissions.fulfilled, (state, action) => {
          state.loadingCancelPermissions = false;
          state.status = RequestStatus.succeeded;
          state.cancelPermissions = action.payload.result as CancelPermissionModel[];
          state.paginationForCancelPermission.totalPages = action.payload.totalPages;
          state.paginationForCancelPermission.totalItems = action.payload.totalItems;
          state.paginationForCancelPermission.pageIndex = action.payload.pageIndex;
          state.paginationForCancelPermission.pageSize = action.payload.pageSize;
        })
        .addCase(getCancelPermissionsGroup.pending, (state) => {
          state.loadingCancelPermissionsGroup = true;
          state.status = RequestStatus.loading;
        })
        .addCase(getCancelPermissionsGroup.rejected, (state, action) => {
          state.loadingCancelPermissionsGroup = false;
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(getCancelPermissionsGroup.fulfilled, (state, action) => {
          state.loadingCancelPermissionsGroup = false;
          state.status = RequestStatus.succeeded;
          state.cancelPermissionsGroup = action.payload.result as CancelPermissionGroupModel[];
          state.paginationForCancelPermissionGroup.totalPages = action.payload.totalPages;
          state.paginationForCancelPermissionGroup.totalItems = action.payload.totalItems;
          state.paginationForCancelPermissionGroup.pageIndex = action.payload.pageIndex;
          state.paginationForCancelPermissionGroup.pageSize = action.payload.pageSize;
        })
        .addCase(getFollowPermission.pending, (state) => {
          state.loadingFollowPermission = true;
          state.status = RequestStatus.loading;
        })
        .addCase(getFollowPermission.rejected, (state, action) => {
          state.loadingFollowPermission = false;
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(getFollowPermission.fulfilled, (state, action) => {
          state.loadingFollowPermission = false;
          state.status = RequestStatus.succeeded;
          state.followPermission = action.payload.result as FollowPermissionModel;
          state.paginationForFollowPermission.totalPages = action.payload.totalPages;
          state.paginationForFollowPermission.totalItems = action.payload.totalItems;
          state.paginationForFollowPermission.pageIndex = action.payload.pageIndex;
          state.paginationForFollowPermission.pageSize = action.payload.pageSize;
        })
        .addCase(getPermissionFavoriteOrArchive.pending, (state) => {
          state.loadingPermissionFavoriteOrArchive = true;
          state.status = RequestStatus.loading;
        })
        .addCase(getPermissionFavoriteOrArchive.rejected, (state, action) => {
          state.loadingPermissionFavoriteOrArchive = false;
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(getPermissionFavoriteOrArchive.fulfilled, (state, action) => {
          state.loadingPermissionFavoriteOrArchive = false;
          state.status = RequestStatus.succeeded;
          state.permissionFavoriteOrArchive = action.payload.result as VisitorPermissionModel[];
          state.paginationForPermissionFavoriteOrArchive.totalPages = action.payload.totalPages;
          state.paginationForPermissionFavoriteOrArchive.totalItems = action.payload.totalItems;
          state.paginationForPermissionFavoriteOrArchive.pageIndex = action.payload.pageIndex;
          state.paginationForPermissionFavoriteOrArchive.pageSize = action.payload.pageSize;
        })
        .addCase(getPermissionFavoriteOrArchiveGroup.pending, (state) => {
          state.loadingPermissionFavoriteOrArchiveGroup = true;
          state.status = RequestStatus.loading;
        })
        .addCase(getPermissionFavoriteOrArchiveGroup.rejected, (state, action) => {
          state.loadingPermissionFavoriteOrArchiveGroup = false;
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(getPermissionFavoriteOrArchiveGroup.fulfilled, (state, action) => {
          state.loadingPermissionFavoriteOrArchiveGroup = false;
          state.status = RequestStatus.succeeded;
          state.permissionFavoriteOrArchiveGroup = action.payload.result as VisitorsPermissionGroupModel[];
          state.paginationForPermissionFavoriteOrArchiveGroup.totalPages = action.payload.totalPages;
          state.paginationForPermissionFavoriteOrArchiveGroup.totalItems = action.payload.totalItems;
          state.paginationForPermissionFavoriteOrArchiveGroup.pageIndex = action.payload.pageIndex;
          state.paginationForPermissionFavoriteOrArchiveGroup.pageSize = action.payload.pageSize;

        })
        .addCase(updateVisitorPermissionStatus.pending, (state) => {
          state.status = RequestStatus.loading;
        })
        .addCase(updateVisitorPermissionStatus.rejected, (state, action) => {
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(updateVisitorPermissionStatus.fulfilled, (state) => {
          state.status = RequestStatus.succeeded;
        })
        
        .addCase(updateVisitorPermissionGroupStatus.pending, (state) => {
          state.status = RequestStatus.loading;
        })
        .addCase(updateVisitorPermissionGroupStatus.rejected, (state, action) => {
          state.status = RequestStatus.failed;
          state.error = action.error.message ?? "An error occurred";
        })
        .addCase(updateVisitorPermissionGroupStatus.fulfilled, (state) => {
          state.status = RequestStatus.succeeded;
        })
     
    },
  });



  
  export default visitorPermissionSlice.reducer;