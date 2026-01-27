import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { VisitorAggConsume } from "@4eplatform/shared/apis/visitor_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { VisitorConsume } from "@4eplatform/shared/apis/visitor";

interface CheckInState {
  checkInList: any[];
  selectedCheckIn: any | null;
  status: RequestStatus;
  pagination: Pagination;
  error: string | null;
}

const initialState: CheckInState = {
  checkInList: [],
  selectedCheckIn: null,
  status: RequestStatus.idle,
  pagination: new Pagination(),
  error: null,
};

export const fetchCheckInList = createAsyncThunk<ResponseModel, any>(
  "checkIn/fetchCheckInList",
  async (params = {}, thunkApi) => {
    try {
      const response = await VisitorAggConsume.getCheckInList(params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchCheckInById = createAsyncThunk<ResponseModel, string>(
  "checkIn/fetchCheckInById",
  async (id, thunkApi) => {
    try {
      const response = await VisitorAggConsume.getCheckInById(id);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createCheckIn = createAsyncThunk<ResponseModel, any>(
  "checkIn/createCheckIn",
  async (data, thunkApi) => {
    try {
      const response = await VisitorConsume.createCheckIn(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateCheckIn = createAsyncThunk<ResponseModel, any>(
  "checkIn/updateCheckIn",
  async (data, thunkApi) => {
    try {
      const response = await VisitorConsume.updateCheckIn(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const checkInSlice = createSlice({
  name: "checkIn",
  initialState,
  reducers: {
    clearSelectedCheckIn: (state) => {
      state.selectedCheckIn = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckInList.fulfilled, (state, action) => {
        state.checkInList = action.payload.result as any[];
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalItems = action.payload.totalItems;
        state.pagination.pageIndex = action.payload.pageIndex;
        state.pagination.pageSize = action.payload.pageSize;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchCheckInList.pending, handlePending)
      .addCase(fetchCheckInList.rejected, handleRejected)
      .addCase(fetchCheckInById.fulfilled, (state, action) => {
        state.selectedCheckIn = action.payload.result;
        state.status = RequestStatus.succeeded;
      })
      .addCase(fetchCheckInById.pending, handlePending)
      .addCase(fetchCheckInById.rejected, handleRejected)
      .addCase(createCheckIn.fulfilled, handleFulfilled)
      .addCase(createCheckIn.pending, handlePending)
      .addCase(createCheckIn.rejected, handleRejected)
      .addCase(updateCheckIn.fulfilled, handleFulfilled)
      .addCase(updateCheckIn.pending, handlePending)
      .addCase(updateCheckIn.rejected, handleRejected);
  },
});

const handlePending = (state: CheckInState) => {
  state.status = RequestStatus.loading;
  state.error = null;
};

const handleFulfilled = (state: CheckInState) => {
  state.status = RequestStatus.succeeded;
  state.error = null;
};

const handleRejected = (state: CheckInState, action: any) => {
  state.status = RequestStatus.failed;
  state.error = action.error.message ?? "An error occurred";
};

export const { clearSelectedCheckIn, clearError } = checkInSlice.actions;

export default checkInSlice.reducer;
