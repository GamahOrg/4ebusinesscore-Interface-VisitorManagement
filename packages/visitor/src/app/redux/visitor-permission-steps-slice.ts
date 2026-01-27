import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import { VisitorAggConsume } from "@4eplatform/shared/apis/visitor_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";


interface VisitorPermissionStepsState {
  status: RequestStatus;
  pagination: Pagination;
  error: string | null;
}

const initialState:VisitorPermissionStepsState = {
    status: RequestStatus.idle,
    pagination: new Pagination(),
    error: "",
  };
  

  export const editPermissionVisitor = createAsyncThunk<ResponseModel, any>(
    "VisitorPermissionSteps/editPermissionVisitor",
    async (newVisitor = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.editPermissionVisitor(newVisitor);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

 
  
  const visitorPermissionStepsSlice = createSlice({
    name: "VisitorPermissionSteps",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(editPermissionVisitor.pending, handlePending)
        .addCase(editPermissionVisitor.fulfilled, handleFulfilled)
        .addCase(editPermissionVisitor.rejected, handleRejected)
    },
  });


  const handlePending = (state: VisitorPermissionStepsState) => {
    state.status = RequestStatus.loading;
  };
  
  const handleFulfilled = (state: VisitorPermissionStepsState) => {
    state.status = RequestStatus.succeeded;
  };
  
  const handleRejected = (state: VisitorPermissionStepsState, action: any) => {
    state.status = RequestStatus.failed;
    state.error = action.error.message ?? "An error occurred";
  };
  
  export default visitorPermissionStepsSlice.reducer;