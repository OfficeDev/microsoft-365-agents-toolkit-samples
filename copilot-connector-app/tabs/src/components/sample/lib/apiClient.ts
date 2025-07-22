import config from "./config";
import axios, { AxiosInstance } from "axios";
import { TeamsUserCredential } from "./TeamsUserCredential";

export async function getApiClient(): Promise<AxiosInstance> {
  const authConfig = {
    clientId: config.clientId!,
    initiateLoginEndpoint: config.initiateLoginEndpoint!,
  };
  const credential = new TeamsUserCredential(authConfig);
  const ssoToken = (await credential.getToken(""))!.token
  const apiBaseUrl = config.apiEndpoint + "/api/";
  const apiClient = axios.create({ baseURL: apiBaseUrl });
  apiClient.interceptors.request.use(async (config) => {
      config.headers["Authorization"] = `Bearer ${ssoToken}`;
      return config;
    });
  return apiClient;
}
