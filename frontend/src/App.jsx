import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./components/common/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ModulesPage from "./pages/ModulesPage";

import "./styles/login.css";
import "./styles/dashboard.css";
import "./styles/responsive.css";
import "./styles/login-polish.css";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            index
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/beneficiaries"
            element={
              <ModulesPage module="beneficiaries" />
            }
          />

          <Route
            path="/schemes"
            element={
              <ModulesPage module="schemes" />
            }
          />

          <Route
            path="/applications"
            element={
              <ModulesPage module="applications" />
            }
          />

          <Route
            path="/approvals"
            element={
              <ModulesPage module="approvals" />
            }
          />

          <Route
            path="/dbt-monitoring"
            element={
              <ModulesPage module="dbt" />
            }
          />

          <Route
            path="/reports"
            element={
              <ModulesPage module="reports" />
            }
          />

          <Route
            path="/grievances"
            element={
              <ModulesPage module="grievances" />
            }
          />

          <Route
            path="/users"
            element={
              <ModulesPage module="users" />
            }
          />

          <Route
            path="/settings"
            element={
              <ModulesPage module="settings" />
            }
          />

          <Route
            path="/audit-trail"
            element={
              <ModulesPage module="audit" />
            }
          />
        </Route>
      </Route>

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;