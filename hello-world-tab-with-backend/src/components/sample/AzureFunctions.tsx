import { useState } from "react";
import { Button, Spinner } from "@fluentui/react-components";
import { useData } from "./lib/useData";
import axios from "axios";
import config from "./lib/config";
import { app, authentication } from "@microsoft/teams-js";

const functionName = config.apiName || "myFunc";

async function callFunction(ssoToken: string) {
  try {
    const apiBaseUrl = config.apiEndpoint + "/api/";
    const apiClient = axios.create({baseURL: apiBaseUrl});
    apiClient.interceptors.request.use(async (config) => {
      config.headers["Authorization"] = `Bearer ${ssoToken}`;
      return config;
    });
    const response = await apiClient.get(functionName);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      let funcErrorMsg = "";

      if (err?.response?.status === 404) {
        funcErrorMsg = `There may be a problem with the deployment of Azure Function App, please deploy Azure Function (Run command palette "Teams: Deploy") first before running this App`;
      } else if (err.message === "Network Error") {
        funcErrorMsg =
          "Cannot call Azure Function due to network error, please check your network connection status and ";
        if (err.config?.url && err.config.url.indexOf("localhost") >= 0) {
          funcErrorMsg += `make sure to start Azure Function locally (Run "npm run start" command inside api folder from terminal) first before running this App`;
        } else {
          funcErrorMsg += `make sure to provision and deploy Azure Function (Run command palette "Teams: Provision" and "Teams: Deploy") first before running this App`;
        }
      } else {
        funcErrorMsg = err.message;
        if (err.response?.data?.error) {
          funcErrorMsg += ": " + err.response.data.error;
        }
      }

      throw new Error(funcErrorMsg);
    }
    throw err;
  }
}

export function AzureFunctions(props: { codePath?: string; docsUrl?: string }) {
  const [needConsent, setNeedConsent] = useState(false);
  const { codePath, docsUrl } = {
    codePath: `api/${functionName}/index.ts`,
    docsUrl: "https://aka.ms/teamsfx-azure-functions",
    ...props,
  };
  const { loading, data, error, reload } = useData(async () => {
    await app.initialize();
    let ssoToken: string | undefined;
    if (needConsent) {
      const scopes = ["User.Read"];
      const params = {
        url: `${
          config.initiateLoginEndpoint ? config.initiateLoginEndpoint : ""
        }?clientId=${config.clientId ? config.clientId : ""}&scope=${encodeURI(
          scopes.join(" ")
        )}`,
        width: 600,
        height: 535,
      } as authentication.AuthenticatePopUpParameters;
      try {
        await authentication.authenticate(params);
        ssoToken = await authentication.getAuthToken({
          resources: scopes
        });
      } catch (error) {
        console.error("Authentication failed:", error);
        setNeedConsent(true);
        return;
      }
      setNeedConsent(false);
    }
    if (!ssoToken) {
      setNeedConsent(true);
      return;
    }
    try {
      const functionRes = await callFunction(ssoToken);
      return functionRes;
    } catch (error: any) {
      if (error.message.includes("The application may not be authorized.")) {
        setNeedConsent(true);
      }
    }
  });
  return (
    <div>
      <h2>Call your Azure Function</h2>
      <p>
        An Azure Functions app is running. Authorize this app and click below to call it for a
        response:
      </p>
      {!loading && (
        <Button appearance="primary" disabled={loading} onClick={reload}>
          Authorize and call Azure Function
        </Button>
      )}
      {loading && (
        <pre className="fixed">
          <Spinner />
        </pre>
      )}
      {!loading && !!data && !error && <pre className="fixed">{JSON.stringify(data, null, 2)}</pre>}
      {!loading && !data && !error && <pre className="fixed"></pre>}
      {!loading && !!error && <div className="error fixed">{(error as any).toString()}</div>}
      <h4>How to edit the Azure Function</h4>
      <p>
        See the code in <code>{codePath}</code> to add your business logic.
      </p>
      {!!docsUrl && (
        <p>
          For more information, see the{" "}
          <a href={docsUrl} target="_blank" rel="noreferrer">
            docs
          </a>
          .
        </p>
      )}
    </div>
  );
}
