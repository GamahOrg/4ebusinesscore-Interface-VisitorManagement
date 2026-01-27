import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { VisitorAggConsume } from "@4eplatform/shared/apis/visitor_agg";
import { Pagination } from "@4eplatform/shared/models/Pagination";
import { RequestStatus } from "@4eplatform/shared/enums/enums";
import { ResponseModel } from "../partials/response-model";
import { ViolationModel } from "../model/violation-model";
import {VisitorConsume} from "@4eplatform/shared/apis/visitor"
import { ControllerPermissionModel } from "../model/controller-permission-model";
import { VisitorModel } from "../model/visitor-model"; 
import { ControllerPermissionGroupModel } from "../model/controller-permission-group-model"; 
import { GroupPermissionDetailsModel } from "../model/group-permission-details-model"; 
import { GroupVisitorsPermissionModel } from "../model/visitor-permission-model";
import { ViolationGroupModel } from "../model/violation-group-model";
import { MembersViolationsGroupModel } from "../model/members-violations-group-model";
interface ViolationState {
  violations: ViolationModel[];
  violationsByVisitorId:ViolationModel[];
  visitorControllerPermissionList :ControllerPermissionModel[];
  visitorDetails :VisitorModel;
  groupsWithVisitors : ControllerPermissionGroupModel [];
  pagination: Pagination;
  status: RequestStatus;
  error: string | null;
  groupDetails : GroupPermissionDetailsModel;
  violationDetails :ViolationModel;
  groupViolations : ViolationGroupModel[]
  paginationForSingleViolations: Pagination;
  paginationForGroupViolations : Pagination;
  groupMembersViolation : MembersViolationsGroupModel [];
}

const initialState:ViolationState = {
    violations: [],
    violationsByVisitorId:[],
    visitorControllerPermissionList : [],
    visitorDetails : new VisitorModel(),
    groupsWithVisitors : [] ,
    status: RequestStatus.idle,
    pagination: new Pagination(),
    error: "",
    groupDetails : new GroupPermissionDetailsModel(),
    violationDetails : new ViolationModel(),
    groupViolations : [],
    paginationForSingleViolations : new Pagination(),
    paginationForGroupViolations :  new Pagination(),
    groupMembersViolation :[],
  };
  
 

  export const getAllViolation = createAsyncThunk<ResponseModel, any>(
    "Violation/getAllViolation",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getAllViolation(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const addViolation= createAsyncThunk<ResponseModel, any>(
    "Violation/addViolation",
    async (data, thunkApi) => {
      try {
        const response = await VisitorConsume.addViolation(data);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const getAllPermissionListController = createAsyncThunk<ResponseModel, any>(
    "Violation/getAllPermissionListController",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getAllPermissionList(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const getViolationsByVisitorID = createAsyncThunk<ResponseModel, any>(
    "Violation/getViolationsByVisitorID",
    async (id, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getViolationsByVisitorID(id);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  
  export const getPermissionbyVistorid = createAsyncThunk<ResponseModel, any>(
    "Violation/getPermissionbyVistorid",
    async (Id, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getPermissionbyVistorid(Id);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const getGroupsWithVisitors = createAsyncThunk<ResponseModel, any>(
    "Violation/getGroupsWithVisitors",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getGroupsWithVisitors(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  export const getGroupById= createAsyncThunk<ResponseModel, any>(
    "Violation/getGroupById",
    async (Id, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getGroupByID(Id);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const getAllViolationGroups = createAsyncThunk<ResponseModel, any>(
    "Violation/getAllViolationGroups",
    async (params = {}, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getAllViolationGroups(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const deleteViolationsByVistorId = createAsyncThunk<ResponseModel, any>(
    "Violation/deleteViolationsByVistorId",
    async (id,thunkApi) => {
      try {
        const response = await VisitorConsume.deleteViolations(id);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const editViolation= createAsyncThunk<ResponseModel, any>(
    "Violation/editViolation",
    async (data, thunkApi) => {
      try {
        const response = await VisitorConsume.editViolation(data);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const getOneViolationByViolationID = createAsyncThunk<ResponseModel, any>(
    "Violation/getOneViolationByViolationID",
    async (id, thunkApi) => {
      try {
        const response = await VisitorConsume.violationDetails(id);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const deleteOnlyViolationByViolationId = createAsyncThunk<ResponseModel, any>(
    "Violation/deleteOnlyViolationByViolationId",
    async (id,thunkApi) => {
      try {
        const response = await VisitorConsume.deleteViolation(id);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );

  export const getGroupMembersViolationByGroupID= createAsyncThunk<ResponseModel, any>(
    "Violation/getGroupMembersViolationByGroupID",
    async (params, thunkApi) => {
      try {
        const response = await VisitorAggConsume.getViolationsByGroupId(params);
        return response;
      } catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    }
  );
  const violationSlice = createSlice({
    name: "Violation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllViolation.pending, handlePending)
        .addCase(getAllViolation.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.violations = action.payload.result as ViolationModel[];
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
          state.paginationForSingleViolations.totalPages = action.payload.totalPages;
          state.paginationForSingleViolations.totalItems = action.payload.totalItems;
          state.paginationForSingleViolations.pageIndex = action.payload.pageIndex;
          state.paginationForSingleViolations.pageSize = action.payload.pageSize;
        })
        .addCase(getAllViolation.rejected, handleRejected)
        .addCase(addViolation.pending, handlePending)
        .addCase(addViolation.rejected, handleRejected)
        .addCase(addViolation.fulfilled, handleFulfilled)
        .addCase(getAllPermissionListController.pending, handlePending)
        .addCase(getAllPermissionListController.rejected, handleRejected)
        .addCase(getAllPermissionListController.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.visitorControllerPermissionList = action.payload.result as ControllerPermissionModel[];
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
        })
        .addCase(getPermissionbyVistorid.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.visitorDetails = (action as PayloadAction<ResponseModel>)
            .payload.result as VisitorModel;
        })
        .addCase(getPermissionbyVistorid.pending, handlePending)
        .addCase(getPermissionbyVistorid.rejected, handleRejected)
        .addCase(getGroupsWithVisitors.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.groupsWithVisitors = (action as PayloadAction<ResponseModel>)
            .payload.result as ControllerPermissionGroupModel[];
        })
        .addCase(getGroupsWithVisitors.pending, handlePending)
        .addCase(getGroupsWithVisitors.rejected, handleRejected)
        .addCase(getViolationsByVisitorID.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.violationsByVisitorId = (action as PayloadAction<ResponseModel>)
            .payload.result as ViolationModel[];
        })
        .addCase(getViolationsByVisitorID.pending, handlePending)
        .addCase(getViolationsByVisitorID.rejected, handleRejected)
        .addCase(getGroupById.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.groupDetails = (action as PayloadAction<ResponseModel>)
            .payload.result as GroupPermissionDetailsModel;
        })
        .addCase(getGroupById.pending, handlePending)
        .addCase(getGroupById.rejected, handleRejected)
       
        .addCase(getAllViolationGroups.pending, handlePending)
        .addCase(getAllViolationGroups.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.groupViolations = action.payload.result as ViolationGroupModel[];
          state.pagination = (action as PayloadAction<ResponseModel>).payload;
          state.paginationForGroupViolations.totalPages = action.payload.totalPages;
          state.paginationForGroupViolations.totalItems = action.payload.totalItems;
          state.paginationForGroupViolations.pageIndex = action.payload.pageIndex;
          state.paginationForGroupViolations.pageSize = action.payload.pageSize;
        })
        .addCase(getAllViolationGroups.rejected, handleRejected)
        .addCase(deleteViolationsByVistorId.rejected, handleRejected)
        .addCase(deleteViolationsByVistorId.pending, handlePending)
        .addCase(deleteViolationsByVistorId.fulfilled, handleFulfilled)
        .addCase(editViolation.pending, handlePending)
        .addCase(editViolation.rejected, handleRejected)
        .addCase(editViolation.fulfilled, handleFulfilled)
        .addCase(getOneViolationByViolationID.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.violationDetails = (action as PayloadAction<ResponseModel>)
            .payload.result as ViolationModel;
        })
        .addCase(getOneViolationByViolationID.pending, handlePending)
        .addCase(getOneViolationByViolationID.rejected, handleRejected)
        .addCase(deleteOnlyViolationByViolationId.rejected, handleRejected)
        .addCase(deleteOnlyViolationByViolationId.pending, handlePending)
        .addCase(deleteOnlyViolationByViolationId.fulfilled, handleFulfilled)


        .addCase(getGroupMembersViolationByGroupID.pending, handlePending)
        .addCase(getGroupMembersViolationByGroupID.fulfilled, (state, action) => {
          state.status = RequestStatus.succeeded;
          state.groupMembersViolation = action.payload.result as MembersViolationsGroupModel[];
        })
        .addCase(getGroupMembersViolationByGroupID.rejected, handleRejected)
    },
  });


  const handlePending = (state: ViolationState) => {
    state.status = RequestStatus.loading;
  };
  
  const handleFulfilled = (state: ViolationState) => {
    state.status = RequestStatus.succeeded;
  };
  
  const handleRejected = (state: ViolationState, action: any) => {
    state.status = RequestStatus.failed;
    state.error = action.error.message ?? "An error occurred";
  };
  
  export default violationSlice.reducer;