import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "@4eplatform/shared/models/responseModel";
import { ControlPanelAggConsume } from "@4eplatform/shared/apis/control_panel_agg";
import { OrgHierarchyModel } from "../model/org-model";
import { OrgConsume } from "@4eplatform/shared/apis/org";
import { OrgsModel } from "../model/orgs-model";

interface OrgsState {
  orgData: OrgHierarchyModel[];
  orgs: OrgsModel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrgsState = {
  orgData: [],
  orgs: [],
  status: "idle",
  error: "",
};

export const fetchOrgs = createAsyncThunk<ResponseModel, object | undefined>(
  "orgs/fetchorgs",
  async (params = {}, thunkApi) => {
    try {
      const response = await ControlPanelAggConsume.getEmployee({ params });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchOrgsWithoutUsers = createAsyncThunk<ResponseModel, object>(
  "orgs/fetchOrgsWithoutUsers",
  async (params = {}, thunkApi) => {
    try {
      const response = await OrgConsume.getAllOrgs(params);
      return response;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

const orgsSlice = createSlice({
  name: "orgs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrgs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orgData = action.payload.result as OrgHierarchyModel[];
      })
      .addCase(fetchOrgs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchOrgsWithoutUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrgsWithoutUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orgs = action.payload.result as unknown as OrgsModel[];
      })
      .addCase(fetchOrgsWithoutUsers.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export default orgsSlice.reducer;
