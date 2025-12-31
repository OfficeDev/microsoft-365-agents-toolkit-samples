import { useEffect, useState } from "react";
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";
import { app, pages } from "@microsoft/teams-js";
import {
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Theme,
} from "@fluentui/react-components";
const getTheme = (): string | undefined => {
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get("theme");
  return theme == null ? undefined : theme;
};
/**
 * Microsoft Teams React hook
 * @param options optional options
 * @returns A tuple with properties and methods
 * properties:
 *  - inTeams: boolean = true if inside Microsoft Teams
 *  - fullscreen: boolean = true if in full screen mode
 *  - theme: Fluent UI Theme
 *  - themeString: string - representation of the theme (default, dark or contrast)
 *  - context - the Microsoft Teams JS SDK context
 * methods:
 *  - setTheme - manually set the theme
 */
export function useTeams(options?: {
  initialTheme?: string;
  setThemeHandler?: (theme?: string) => void;
}): [
  {
    inTeams?: boolean;
    fullScreen?: boolean;
    theme: Theme;
    themeString: string;
    context?: app.Context;
    loading?: boolean;
  },
  {
    setTheme: (theme: string | undefined) => void;
  },
] {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [inTeams, setInTeams] = useState<boolean | undefined>(undefined);
  const [fullScreen, setFullScreen] = useState<boolean | undefined>(undefined);
  const [theme, setTheme] = useState<Theme>(teamsLightTheme);
  const [themeString, setThemeString] = useState<string>("default");
  const [initialTheme] = useState<string | undefined>(
    options && options.initialTheme ? options.initialTheme : getTheme(),
  );
  const [context, setContext] = useState<app.Context | undefined>(undefined);
  const themeChangeHandler = (theme: string | undefined) => {
    setThemeString(theme || "default");
    switch (theme) {
      case "dark":
        setTheme(teamsDarkTheme);
        break;
      case "contrast":
        setTheme(teamsHighContrastTheme);
        break;
      case "default":
      default:
        setTheme(teamsLightTheme);
    }
  };
  const overrideThemeHandler = options?.setThemeHandler
    ? options.setThemeHandler
    : themeChangeHandler;
  useEffect(() => {
    // Intentionally run only once on mount to initialize Teams SDK and register event handlers.
    // Teams SDK initialization and event registration should not be repeated on re-renders.
    // The initial theme is captured once via useState, so it won't cause stale closure issues.

    // Set initial theme based on options or query string
    if (initialTheme) {
      overrideThemeHandler(initialTheme);
    }

    app
      .initialize()
      .then(() => {
        app
          .getContext()
          .then((context) => {
            batchedUpdates(() => {
              setInTeams(true);
              setContext(context);
              setFullScreen(context.page.isFullScreen);
            });
            overrideThemeHandler(context.app.theme);
            app.registerOnThemeChangeHandler(overrideThemeHandler);
            pages.registerFullScreenHandler((isFullScreen) => {
              setFullScreen(isFullScreen);
            });
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
            setInTeams(false);
          });
      })
      .catch(() => {
        setLoading(false);
        setInTeams(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    { inTeams, fullScreen, theme, context, themeString, loading },
    { setTheme: overrideThemeHandler },
  ];
}