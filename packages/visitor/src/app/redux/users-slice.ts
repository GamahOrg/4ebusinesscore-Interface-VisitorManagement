import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { UserModel } from "../model/user-model";
import { ResponseModel } from "../partials/response-model";

export const fetchUser = createAsyncThunk<
  ResponseModel,
  number | string | Number
>("users/fetchUser", async (data: number | string | Number, thunkApi) => {
  try {
    const response = await ControlPanelAggConsume?.getUserbyId(data);
    return response;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err);
  }
});
interface users {
  userDetails: UserModel;
  status: string;
  message: string;
}
let initialState: users = {
  userDetails: new UserModel(),
  status: "idle",
  message: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state: users) => {
        state.status = "loading";
      })
      .addCase(
        fetchUser.fulfilled,
        (state: users, action: PayloadAction<ResponseModel>) => {
          state.status = "succeeded";
          state.userDetails = action.payload?.result as unknown as UserModel;
        }
      )
      .addCase(
        fetchUser.rejected,
        (state: users, action: PayloadAction<any>) => {
          state.status = "failed";
          state.message = action.payload?.message;
        }
      );
  },
});

export default usersSlice.reducer;
