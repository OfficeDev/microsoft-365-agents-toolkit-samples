import { createContext } from "react";
import { Theme } from "@fluentui/react-components";

/**
 * This context provides a way to share data between components in the app.
 * It contains the theme, themeString, and teamsUserCredential.
 */
export const TeamsFxContext = createContext<{
  theme?: Theme;
  themeString: string;
}>({
  theme: undefined,
  themeString: "",
});
