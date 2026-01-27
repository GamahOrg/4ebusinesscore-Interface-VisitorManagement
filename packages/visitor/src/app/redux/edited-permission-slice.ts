import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { VisitorAggConsume } from "@4eplatform/shared/apis/visitor_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { VisitorPermissionModel } from "../model/visitor-permission-model";
import { VisitorsPermissionGroupModel } from "../model/visitior-permission-group-model";
import { EditedPermissionModel } from "../model/edited-permission-model";
import { VisitorConsume } from "@4eplatform/shared/apis/visitor";
import { EditedPermissionGroupModel } from "../model/edited-permission-group-model";



interface VisitorsState {
  editedPermission: EditedPermissionModel;
  editedPermissions:VisitorPermissionModel[];
  editedPermissionsGroup:EditedPermissionGroupModel[];
  paginationForEditedPermissions:Pagination;
  paginationForEditedPermissionsGroup:Pagination
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState:VisitorsState = {
    editedPermission: new EditedPermissionModel(),
    editedPermissions:[],
    editedPermissionsGroup:[],
    paginationForEditedPermissions: new Pagination(),
    paginationForEditedPermissionsGroup: new Pagination(),
    pagination: new Pagination(),
    status: RequestStatus.idle,
    error: "",
  };


  export const getEditedPermission = createAsyncThunk<ResponseModel, any>(
    "EditedPermission/getEditedPermission",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getEditedPermission(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const getEditedPermissionGroup = createAsyncThunk<ResponseModel, any>(
    "EditedPermission/getEditedPermissionGroup",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getEditedPermissionGroup(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  
  export const getEditedPermissionById = createAsyncThunk<ResponseModel, any>(
    "EditedPermission/getEditedPermissionById",
    async (id:string|number, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getEditedPermissionById(id);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const updateEditedPermissionRequest = createAsyncThunk<ResponseModel, any>(
    "EditedPermission/updateEditedPermissionRequest",
    async (update, thunkApi) => {
      try {
        const response = await VisitorConsume.editPutStatusEditRequest(update);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );





  
  const editedPermissionSlice = createSlice({
    name: "EditedPermission",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getEditedPermission.pending, handlePending)
        .addCase(getEditedPermission.rejected, handleRejected)
        .addCase(getEditedPermission.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.editedPermissions = action.payload.result as VisitorPermissionModel[];
          state.paginationForEditedPermissions.totalPages = action.payload.totalPages;
          state.paginationForEditedPermissions.totalItems = action.payload.totalItems;
          state.paginationForEditedPermissions.pageIndex = action.payload.pageIndex;
          state.paginationForEditedPermissions.pageSize = action.payload.pageSize;
        })
        .addCase(getEditedPermissionGroup.pending, handlePending)
        .addCase(getEditedPermissionGroup.rejected, handleRejected)
        .addCase(getEditedPermissionGroup.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.editedPermissionsGroup = action.payload.result as EditedPermissionGroupModel[];
          state.paginationForEditedPermissionsGroup.totalPages = action.payload.totalPages;
          state.paginationForEditedPermissionsGroup.totalItems = action.payload.totalItems;
          state.paginationForEditedPermissionsGroup.pageIndex = action.payload.pageIndex;
          state.paginationForEditedPermissionsGroup.pageSize = action.payload.pageSize;
        })
        .addCase(getEditedPermissionById.pending, handlePending)
        .addCase(getEditedPermissionById.rejected, handleRejected)
        .addCase(getEditedPermissionById.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.editedPermission = action.payload.result as EditedPermissionModel;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        })
        .addCase(updateEditedPermissionRequest.pending, handlePending)
        .addCase(updateEditedPermissionRequest.rejected, handleRejected)
        .addCase(updateEditedPermissionRequest.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        })
    },
  });


  const handlePending = (state: VisitorsState) => {
    state.status = RequestStatus.loading;
  };
  
  const handleFulfilled = (state: VisitorsState) => {
    state.status = RequestStatus.succeeded;
  };
  
  const handleRejected = (state: VisitorsState, action: any) => {
    state.status = RequestStatus.failed;
    state.error = action.error.message ?? "An error occurred";
  };
  
  export default editedPermissionSlice.reducer;