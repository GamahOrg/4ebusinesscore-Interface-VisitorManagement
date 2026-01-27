import { Route, Routes } from "react-router";
import { lazy } from "react";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { DynamicWorkSpace } from "@npm-react/react-redux-routing";
const VisitorSystemSettings = lazy(
  () => import("./app/pages/system-settings/visitor-system-settings")
);
const ServicesSettingsCardDetails = lazy(
  () => import("./app/pages/system-settings/card-details")
);
const VisitorSystemSettingsAddCard = lazy(
  () => import("./app/pages/system-settings/add-card")
);
const VisitorSystemSettingsEditCard = lazy(
  () => import("./app/pages/system-settings/edit-card")
);
const PermitApplications = lazy(
  () => import("./app/pages/permit-applications/permit-applications")
);
const RequestAnEntryPermit = lazy(
  () => import("./app/pages/request-entry-permit/request-entry-permit")
);
const RequestAnInternalPermit = lazy(
  () => import("./app/pages/request-internal-permit/request-internal-permit")
);
const SecurityAndBreaches = lazy(
  () => import("./app/pages/security-and-breaches/security-and-breaches")
);
const Permitslist = lazy(() => import("./app/pages/permits-list/permits-list"));
const MyPermits = lazy(() => import("./app/pages/my-permits/my-permits"));
const ViewPermit = lazy(() => import("./app/pages/permits-list/view-permit"));
const ViewPermitForArchive = lazy(
  () => import("./app/pages/archives/view-permit")
);
const ViewPermitForFollow = lazy(
  () => import("./app/pages/permits-follow-up/view-permit")
);
const ViewPermit2 = lazy(() => import("./app/pages/my-permits/view-permit"));
const ViewPermitForArchive2 = lazy(
  () => import("./app/pages/archives/view-permit")
);
const ViewPermitForFollow2 = lazy(
  () => import("./app/pages/permits-follow-up/view-permit")
);
const ViewPermitApplication = lazy(
  () => import("./app/pages/permit-applications/view-permit")
);
const ViewGroup = lazy(() => import("./app/pages/permits-list/view-group"));
const ViewGroup2 = lazy(() => import("./app/pages/my-permits/view-group"));
const ViewGroupForArchive = lazy(
  () => import("./app/pages/archives/view-group")
);
const ViewGroupForFollow = lazy(
  () => import("./app/pages/permits-follow-up/view-group")
);
const ViewGroupApplication = lazy(
  () => import("./app/pages/permit-applications/view-group")
);
const VisitorIndicators = lazy(
  () => import("./app/pages/visitor-indicators/visitor-indicators")
);
const AddViolation = lazy(
  () => import("./app/pages/security-and-breaches/components/AddViolation")
);
const Favorites = lazy(() => import("./app/pages/favorites/favorites"));
const Archive = lazy(() => import("./app/pages/archives/archive"));
const ViewViolation = lazy(
  () => import("./app/pages/security-and-breaches/view-violation")
);
const EditViolation = lazy(
  () => import("./app/pages/security-and-breaches/components/EditViolation")
);
const AddSubViolation = lazy(
  () => import("./app/pages/security-and-breaches/components/AddSubViolation")
);
const VisitorReports = lazy(
  () => import("./app/pages/visitor-reports/visitor-reports")
);
const PermitsFollow = lazy(
  () => import("./app/pages/permits-follow-up/permits-follow")
);
const PermitsFollowLogs = lazy(
  () => import("./app/pages/permits-follow-up/permits-follow-logs")
);

// const VisitorWorkspace = lazy(
//   () => import("../src/app/pages/work-space/visitor-workspace")
// );
const EditPermitForExternalSingle = lazy(
  () => import("./app/pages/permits-list/edit-permit-for-external-single")
);
const EditPermitForInternalSingle = lazy(
  () => import("./app/pages/permits-list/edit-permit-for-internal-single")
);
const EditPermitForExternalSingle2 = lazy(
  () => import("./app/pages/my-permits/edit-permit-for-external-single")
);
const EditPermitForInternalSingle2 = lazy(
  () => import("./app/pages/my-permits/edit-permit-for-internal-single")
);
const ViewGroupViolations = lazy(
  () => import("./app/pages/security-and-breaches/view-group-violations")
);
const LoginLogoutData = lazy(
  () => import("./app/pages/login-logout/LoginLogoutData")
);

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<DynamicWorkSpace />} />
        <Route
          path="/visitor-system-settings/:workspaceName"
          element={<VisitorSystemSettings />}
        />
        <Route
          path="/visitor-system-settings/card-details/:workspaceName"
          element={<ServicesSettingsCardDetails />}
        />
        <Route
          path="/visitor-system-settings/add-service/:workspaceName"
          element={<VisitorSystemSettingsAddCard />}
        />
        <Route
          path="/visitor-system-settings/edit-service/:workspaceName"
          element={<VisitorSystemSettingsEditCard />}
        />
        <Route path="/permissions-Permits" element={<PermitApplications />} />

        <Route
          path="request-internal-permit"
          element={<RequestAnInternalPermit />}
        />
        <Route path="/visitor-indicators" element={<VisitorIndicators />} />
        <Route
          path="/request-entry-permit"
          element={<RequestAnEntryPermit />}
        />
        <Route
          path="/security-and-breaches"
          element={<SecurityAndBreaches />}
        />
        <Route path="/visitor-reports" element={<VisitorReports />} />
        <Route
          path="/security-and-breaches/view-violation/:id"
          element={<ViewViolation />}
        />
        <Route
          path="/security-and-breaches/edit-violation/:id"
          element={<EditViolation />}
        />
        <Route
          path="/security-and-breaches/add-sub-violation/:id"
          element={<AddSubViolation />}
        />
        <Route
          path="/security-and-breaches/add-violation"
          element={<AddViolation />}
        />
        <Route path="/permits-list" element={<Permitslist />} />
        <Route path="/my-permits" element={<MyPermits />} />
        <Route
          path="/permits-list/view-permit/:workspaceName/:permissionId/:visitorId"
          element={<ViewPermit />}
        />
        <Route
          path="/permits-list/view-permit-for-archive/:workspaceName/:permissionId/:visitorId"
          element={<ViewPermitForArchive />}
        />
        <Route
          path="/permits-list/view-permit-for-follow/:workspaceName/:permissionId/:visitorId"
          element={<ViewPermitForFollow />}
        />
        <Route
          path="/my-permits/view-permit/:workspaceName/:permissionId/:visitorId"
          element={<ViewPermit2 />}
        />
        <Route
          path="/my-permits/view-permit-for-archive/:workspaceName/:permissionId/:visitorId"
          element={<ViewPermitForArchive2 />}
        />
        <Route
          path="/my-permits/view-permit-for-follow/:workspaceName/:permissionId/:visitorId"
          element={<ViewPermitForFollow2 />}
        />
        <Route
          path="/:tabName/view-permit/:workspaceName/:id"
          element={<ViewPermitApplication />}
        />
        <Route
          path="/permits-list/view-group/:workspaceName/:groupId"
          element={<ViewGroup />}
        />
        <Route
          path="/my-permits/view-group/:workspaceName/:groupId"
          element={<ViewGroup2 />}
        />
        <Route
          path="/permits-list/view-group-for-archive/:workspaceName/:groupId"
          element={<ViewGroupForArchive />}
        />
        <Route
          path="/permits-list/view-group-for-follow/:workspaceName/:groupId"
          element={<ViewGroupForFollow />}
        />
        <Route
          path=":tabName/view-group/:workspaceName/:groupId"
          element={<ViewGroupApplication />}
        />
        <Route path="/visitor-favorites" element={<Favorites />} />
        <Route path="/archive-favorites" element={<Archive />} />
        <Route
          path="/permits-list/edit-external-permit/single/:visitorId"
          element={<EditPermitForExternalSingle />}
        />
        <Route
          path="/permits-list/edit-internal-permit/single/:visitorId"
          element={<EditPermitForInternalSingle />}
        />
        <Route
          path="/my-permits/edit-external-permit/single/:visitorId"
          element={<EditPermitForExternalSingle2 />}
        />
        <Route
          path="/my-permits/edit-internal-permit/single/:visitorId"
          element={<EditPermitForInternalSingle2 />}
        />
        <Route path="/permits-follow" element={<PermitsFollow />} />
        <Route
          path="/permits-follow/permits-follow-logs/:permitNumber/:permitId"
          element={<PermitsFollowLogs />}
        />
        <Route
          path="/security-and-breaches/view-group-violations/:groupId"
          element={<ViewGroupViolations />}
        />
        <Route path="/login-logout-data" element={<LoginLogoutData />} />
      </Routes>
    </Provider>
  );
}

export default App;
