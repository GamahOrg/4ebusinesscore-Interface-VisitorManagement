import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { VisitorAggConsume } from "@4eplatform/shared/apis/visitor_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { SinglePermissionDetailsModel } from "../model/single-permission-details-model";
import { GroupPermissionDetailsModel } from "../model/group-permission-details-model";

interface PermissionState {
  singlePermission: SinglePermissionDetailsModel;
  groupPermission:GroupPermissionDetailsModel;
  groupPermissionWithFilter:GroupPermissionDetailsModel;
  status: RequestStatus;
  pagination: Pagination;
  paginationForFilteredGroup:Pagination;
  error: string | null;
}

const initialState:PermissionState = {
    singlePermission: new SinglePermissionDetailsModel(),
    groupPermission: new GroupPermissionDetailsModel(),
    groupPermissionWithFilter: new GroupPermissionDetailsModel(),
    status: RequestStatus.idle,
    pagination: new Pagination(),
    paginationForFilteredGroup: new Pagination(),
    error: "",
  };
  
 
//Get single permission details
  export const getGetPermissionByVisitorId = createAsyncThunk<ResponseModel, any>(
    "Violation/getGetPermissionByVisitorId",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getGetPermissionByVisitorId(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  
//Get group permission details
  export const GetGroupbyID = createAsyncThunk<ResponseModel, any>(
    "Violation/GetGroupbyID",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getGroupByID(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const GetGroupbyIDWithFilter = createAsyncThunk<ResponseModel, any>(
    "Violation/GetGroupbyIDWithFilter",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getGroupByID(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
 
  const permissionSlice = createSlice({
    name: "Permission",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getGetPermissionByVisitorId.pending, handlePending)
        .addCase(getGetPermissionByVisitorId.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.singlePermission = action.payload.result as SinglePermissionDetailsModel;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        })
        .addCase(getGetPermissionByVisitorId.rejected, handleRejected)
        .addCase(GetGroupbyID.pending, handlePending)
        .addCase(GetGroupbyID.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.groupPermission = action.payload.result as GroupPermissionDetailsModel;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        })
        .addCase(GetGroupbyID.rejected, handleRejected)
        .addCase(GetGroupbyIDWithFilter.pending, handlePending)
        .addCase(GetGroupbyIDWithFilter.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.groupPermissionWithFilter = action.payload.result as GroupPermissionDetailsModel;
          state.paginationForFilteredGroup = (action as PayloadAction<ResponseModel>).payload;
        })
        .addCase(GetGroupbyIDWithFilter.rejected, handleRejected)
    },
  });


  const handlePending = (state: PermissionState) => {
    state.status = RequestStatus.loading;
  };
  
  const handleFulfilled = (state: PermissionState) => {
    state.status = RequestStatus.succeeded;
  };
  
  const handleRejected = (state: PermissionState, action: any) => {
    state.status = RequestStatus.failed;
    state.error = action.error.message ?? "An error occurred";
  };
  
  export default permissionSlice.reducer;