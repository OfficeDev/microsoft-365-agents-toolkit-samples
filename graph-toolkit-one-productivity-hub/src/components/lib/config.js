const env = import.meta.env;

const config = {
  initiateLoginEndpoint:
    env.REACT_APP_START_LOGIN_PAGE_URL || env.VITE_START_LOGIN_PAGE_URL,
  clientId: env.REACT_APP_CLIENT_ID || env.VITE_CLIENT_ID,
};

export default config;
