import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { VisitorAggConsume } from "@4eplatform/shared/apis/visitor_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { VisitorPermissionModel } from "../model/visitor-permission-model";
import { VisitorsPermissionGroupModel } from "../model/visitior-permission-group-model";
import { EditedPermissionModel } from "../model/edited-permission-model";
import { VisitorConsume } from "@4eplatform/shared/apis/visitor";



interface CancelRequestsState {
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
}

const initialState:CancelRequestsState = {
    pagination: new Pagination(),
    status: RequestStatus.idle,
    error: "",
  };


  export const updateStatusCancelRequest = createAsyncThunk<ResponseModel, any>(
    "CancelRequests/updateStatusCancelRequest",
    async (update, thunkApi) => {
      try {
        const formData = new FormData();
        formData.append('VisitorId', update.VisitorId);
        formData.append('Status', update.Status);
        const response = await VisitorAggConsume.editStatusCancelRequest(formData);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const updateStatusCancelRequestGroup = createAsyncThunk<ResponseModel, any>(
    "CancelRequests/updateStatusCancelRequestGroup",
    async (update, thunkApi) => {
      try {
        const formData = new FormData();
        formData.append("GroupId", update.GroupId)
        formData.append("Status", update.Status)
        const response = await VisitorAggConsume.editStatusCancelRequestGroup(formData);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );


  const cancelRequestsSlice = createSlice({
    name: "CancelRequests",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(updateStatusCancelRequest.pending, handlePending)
        .addCase(updateStatusCancelRequest.rejected, handleRejected)
        .addCase(updateStatusCancelRequest.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        })
        .addCase(updateStatusCancelRequestGroup.pending, handlePending)
        .addCase(updateStatusCancelRequestGroup.rejected, handleRejected)
        .addCase(updateStatusCancelRequestGroup.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        })
    },
  });


  const handlePending = (state: CancelRequestsState) => {
    state.status = RequestStatus.loading;
  };
  
  const handleFulfilled = (state: CancelRequestsState) => {
    state.status = RequestStatus.succeeded;
  };
  
  const handleRejected = (state: CancelRequestsState, action: any) => {
    state.status = RequestStatus.failed;
    state.error = action.error.message ?? "An error occurred";
  };
  
  export default cancelRequestsSlice.reducer;