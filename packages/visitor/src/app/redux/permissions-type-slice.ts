import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { VisitorConsume } from "@4eplatform/shared/apis/visitor";
import { permissionTypeModel } from "../model/permission-type-model";

interface VisitorsState {
  permissionTypes: permissionTypeModel[];
  status: RequestStatus;
  error: string | null;
}

const initialState: VisitorsState = {
  permissionTypes: [],
  status: RequestStatus.idle,
  error: "",
};

export const getAllLKPermissiontypes = createAsyncThunk<ResponseModel, any>(
  "PermissionTypes/getAllLKPermissiontypes",
  async (params = {}, thunkApi) => {
    try {
      const response = await VisitorConsume.getPermissionTypes(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const permissionsTypeSlice = createSlice({
  name: "PermissionTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLKPermissiontypes.fulfilled, (state, action) => {
        state.permissionTypes = action.payload.result as permissionTypeModel[];
        state.status = RequestStatus.succeeded;
      })
      .addCase(getAllLKPermissiontypes.pending, handlePending)
      .addCase(getAllLKPermissiontypes.rejected, handleRejected);
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

export default permissionsTypeSlice.reducer;
