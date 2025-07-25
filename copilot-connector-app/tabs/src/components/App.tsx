// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from "@fluentui/react-components";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useTeams } from "./sample/lib/useTeams";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import TabConfig from "./TabConfig";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import { TeamsUserCredential } from "./sample/lib/TeamsUserCredential";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const teamsUserCredential = new TeamsUserCredential({
    initiateLoginEndpoint: config.initiateLoginEndpoint!,
    clientId: config.clientId!,
  });
  const [{ loading, themeString, theme }] = useTeams();
  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential }}
    >
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {loading ? (
            <Spinner style={{ margin: 100 }} />
          ) : (
            <Routes>
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route path="/tab" element={<Tab />} />
              <Route path="/config" element={<TabConfig />} />
              <Route path="*" element={<Navigate to={"/tab"} />}></Route>
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
