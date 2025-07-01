import "./App.css";
import { useEffect } from "react";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import {
  FluentProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import { app } from "@microsoft/teams-js";
import { useTeams } from "./lib/useTeams";
import SampleDashboard from "./dashboards/SampleDashboard";
import { TeamsFxContext } from "./internal/context";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const [{ loading, themeString, theme }] = useTeams();
  useEffect(() => {
    loading &&
      app.initialize().then(() => {
        // Hide the loading indicator.
        app.notifySuccess();
      });
  }, [loading]);
  return (
    <TeamsFxContext.Provider value={{ theme, themeString }}>
      <FluentProvider
        id="App"
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : teamsLightTheme
        }
      >
        {!loading && (
          <Router>
            <Routes>
              <Route path="/tab" element={<SampleDashboard />} />
              <Route path="*" element={<Navigate to={"/tab"} />} />
            </Routes>
          </Router>
        )}
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
