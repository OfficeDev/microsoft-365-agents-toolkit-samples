import { createContext } from "react";

export const TeamsFxContext = createContext<{
  themeString: string;
}>({
  themeString: "",
});
