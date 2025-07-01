import { createContext } from "react";

import { TeamsUserCredential } from "./TeamsUserCredential";

export const TeamsFxContext = createContext<{
  themeString: string,
  credential?: TeamsUserCredential,
}>({
  themeString: "",
  credential: undefined
});
