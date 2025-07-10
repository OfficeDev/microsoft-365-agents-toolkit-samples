// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from "react";
import "./App.css";
import "./Tab.css";
import { Button } from "@fluentui/react-components";

import { Providers, ProviderState } from "@microsoft/mgt-element";
import {
  Person,
  PersonViewType,
  PersonCardInteraction
} from "@microsoft/mgt-react";
import { CacheService, ProxyProvider } from "@microsoft/mgt";
import config from "./lib/config";

import axios from "axios";
import { app, authentication } from "@microsoft/teams-js";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    const cacheId = Providers.getCacheId();
    CacheService.clearCacheById(cacheId);

    this.state = {
      showLoginPage: undefined,
    };
  }

  async componentDidMount() {
    await this.initTeamsFx();
    await this.initGraphToolkit();
    await this.checkIsConsentNeeded();
  }

  async initGraphToolkit() {
    Providers.globalProvider = new ProxyProvider(
      `${config.apimEndpoint}/${config.apimGraphProxy}`,
      async () => {
        const ssoToken = await authentication.getAuthToken({
          resources: config.scope
        });
        return {
          Authorization: `Bearer ${ssoToken}`,
        }
      }
    );
  }

  async initTeamsFx() {
    await app.initialize();
    this.scope = config.scope;
  }

  async loginBtnClick() {
    try {
      const params = {
        url: `${
          config.initiateLoginEndpoint ? config.initiateLoginEndpoint : ""
        }?clientId=${config.clientId ? config.clientId : ""}&scope=${encodeURI(
          config.scope.join(" ")
        )}`,
        width: 600,
        height: 535,
      };
      await authentication.authenticate(params);
      Providers.globalProvider.setState(ProviderState.SignedIn);
      this.setState({
        showLoginPage: false,
      });
    } catch (err) {
      alert("Login failed: " + err);
      return;
    }
  }

  async checkIsConsentNeeded() {
    let consentNeeded = false;
    const ssoToken = await authentication.getAuthToken({
      resources: config.scope
    });
    try {
      await axios.get(
        `${config.apimEndpoint}/${config.apimCheckConsent}`,
        {
          headers: {
            Authorization: `Bearer ${ssoToken}`,
          }
        }
      );
    } catch (error) {
      consentNeeded = true;
    }
    this.setState({
      showLoginPage: consentNeeded,
    });
    Providers.globalProvider.setState(
      consentNeeded ? ProviderState.SignedOut : ProviderState.SignedIn
    );
    return consentNeeded;
  }

  render() {
    return (
      <div>
        {this.state.showLoginPage === false && (
          <div className="flex-container">
            <div className="features-col">
              <div className="features">
                <div className="header">
                  <div className="title">
                    <h2>Current Login Account</h2>
                  </div>
                </div>

                <div className="my-account-area">
                  <Person
                    personQuery="me"
                    view={PersonViewType.threelines}
                    personCardInteraction={PersonCardInteraction.hover}
                  ></Person>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.showLoginPage === true && (
          <div className="auth">
            <h2>SSO Enabled Tab via APIM proxy</h2>
            <Button appearance="primary" onClick={() => this.loginBtnClick()}>
              Consent and log in
            </Button>
          </div>
        )}
      </div>
    );
  }
}
export default Tab;
