import "./styles/App.css";

import { useEffect } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  FluentProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import { app } from "@microsoft/teams-js";

import { TeamsFxContext } from "./internal/context";
import { useTeams } from "./internal/useTeams";
import Tab from "./Tab";

export default function App() {
  const [{ loading, themeString }] = useTeams();
  
  useEffect(() => {
    // Notify Teams that the app is ready once loading is complete
    // app.initialize() is already called in useTeams hook, don't call it again
    if (loading === false) {
      app.notifySuccess();
    }
  }, [loading]);
  return (
    <TeamsFxContext.Provider value={{ themeString }}>
      <FluentProvider
        id="fluent-provider"
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
              <Route path="/tab" element={<Tab />} />
              <Route path="*" element={<Navigate to={"/tab"} />} />
            </Routes>
          </Router>
        )}
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
