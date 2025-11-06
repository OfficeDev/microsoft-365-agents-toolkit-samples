using System.ComponentModel;
using Microsoft.Agents.Builder.App;
using Microsoft.Agents.M365Copilot.Beta;
using Microsoft.Agents.M365Copilot.Beta.Copilot.Retrieval;
using Microsoft.Kiota.Abstractions.Authentication;
using Microsoft.Kiota.Http.HttpClientLibrary;
using Microsoft.Agents.M365Copilot.Beta.Models;

namespace TravelAgent.Bot.Plugins
{
    public class RetrievalPlugin(AgentApplication app)
    {
        AgentApplication _app = app;

        /// <summary>
        /// Retrieve travel policies about expenses use graph API.
        /// </summary>
        /// <param name="userquery">The user query as a string</param>
        /// <returns></returns>
        [Description("This function talks to Microsoft 365 Copilot Retrieval API and gets travel policies about expenses and reimbursements, flight booking, ground transportation, hotel accommodations which are nicely formatted. It accepts user query as input and send out a chunk of relevant text and a link to the file in the results.")]
        public async Task<string> BuildRetrievalAsync(string userquery)
        {
#pragma warning disable CS0618 // Type or member is obsolete
            string accessToken = _app.UserAuthorization.GetTurnToken("graph");
#pragma warning restore CS0618 // Type or member is obsolete
            var tokenProvider = new StaticTokenProvider(accessToken);
            var authProvider = new BaseBearerTokenAuthenticationProvider(tokenProvider);
            var requestAdapter = new HttpClientRequestAdapter(authProvider);
            requestAdapter.BaseUrl = "https://graph.microsoft.com/beta";
            var apiClient = new AgentsM365CopilotBetaServiceClient(requestAdapter);

            try
            {
                var response = await apiClient.Copilot.Retrieval.PostAsync(new RetrievalPostRequestBody()
                {
                    QueryString = userquery,
                    DataSource = RetrievalDataSource.OneDriveBusiness,
                    FilterExpression = "(path:\"https://{tenant}-my.sharepoint.com/personal/{user}/Documents/{foldername}\")", // replace with actual OneDrive URL
                    ResourceMetadata = [string.Empty],
                    MaximumNumberOfResults = 1,
                });

                return System.Text.Json.JsonSerializer.Serialize(response);
            }
            catch (Exception ex)
            {
                // Log or inspect the exception and return details for debugging
                return $"Exception: {ex.GetType().Name} - {ex.Message}\nStackTrace: {ex.StackTrace}";
            }
        }
    }
}
