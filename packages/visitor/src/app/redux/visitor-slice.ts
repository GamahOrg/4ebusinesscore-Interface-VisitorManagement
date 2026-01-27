import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { VisitorAggConsume } from "@4eplatform/shared/apis/visitor_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { NotificationsConsume } from "@4eplatform/shared/apis/notification";

interface VisitorState {
  status: RequestStatus;
  pagination: Pagination;
  error: string | null;
}

const initialState:VisitorState = {
    status: RequestStatus.idle,
    pagination: new Pagination(),
    error: "",
  };
  
  export const addPermissionVisitor = createAsyncThunk<ResponseModel, any>(
    "visitor/addPermissionVisitor",
    async (visitor = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.addPermissionVisitor(visitor);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const addGroupPermission = createAsyncThunk<ResponseModel, any>(
    "visitor/addGroupPermission",
    async (group = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.addGroupPermission(group);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const addVisitortoPermission = createAsyncThunk<ResponseModel, any>(
    "visitor/addVisitortoPermission",
    async (data, thunkApi) => {
      try {
        const response = await VisitorAggConsume.addVisitorToPermission(data);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const editVisitortoPermission = createAsyncThunk<ResponseModel, any>(
    "visitor/editVisitortoPermission ",
    async (data, thunkApi) => {
      try {
        const response = await VisitorAggConsume.editPermissionVisitor(data);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const sendHayakmNotificationToVisitor = createAsyncThunk<ResponseModel, any>(
    "visitor/sendHayakmNotificationToVisitor",
    async (data, thunkApi) => {
      try {
        const response = await NotificationsConsume.sendHayakmNotification(data);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  const visitorSlice = createSlice({
    name: "visitor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addPermissionVisitor.pending, handlePending)
        .addCase(addPermissionVisitor.fulfilled, handleFulfilled)
        .addCase(addPermissionVisitor.rejected, handleRejected)
        .addCase(addVisitortoPermission.pending, handlePending)
        .addCase(addVisitortoPermission.rejected, handleRejected)
        .addCase(addVisitortoPermission.fulfilled, handleFulfilled)
        .addCase(addGroupPermission.pending, handlePending)
        .addCase(addGroupPermission.rejected, handleRejected)
        .addCase(addGroupPermission.fulfilled, handleFulfilled)
        .addCase(editVisitortoPermission.pending, handlePending)
        .addCase(editVisitortoPermission.rejected, handleRejected)
        .addCase(editVisitortoPermission.fulfilled, handleFulfilled);
    },
  });


  const handlePending = (state: VisitorState) => {
    state.status = RequestStatus.loading;
  };
  
  const handleFulfilled = (state: VisitorState) => {
    state.status = RequestStatus.succeeded;
  };
  
  const handleRejected = (state: VisitorState, action: any) => {
    state.status = RequestStatus.failed;
    state.error = action.error.message ?? "An error occurred";
  };
  
  export default visitorSlice.reducer;