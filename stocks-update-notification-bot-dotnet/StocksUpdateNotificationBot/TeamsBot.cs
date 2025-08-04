using Microsoft.Agents.Builder;
using Microsoft.Agents.Builder.App;
using Microsoft.Agents.Builder.State;
using Microsoft.Agents.Core.Models;

namespace StocksUpdateNotificationBot
{
    /// <summary>
    /// Bot handler.
    /// You can add your customization code here to extend your bot logic if needed.
    /// </summary>
    public class TeamsBot : AgentApplication
    {
        public TeamsBot(AgentApplicationOptions options) : base(options)
        {
            OnConversationUpdate(ConversationUpdateEvents.MembersAdded, OnMembersAddedAsync);
        }

        private async Task OnMembersAddedAsync(ITurnContext turnContext, ITurnState turnState, CancellationToken cancellationToken)
        {
            var welcomeText = "Welcome to the Stocks Update Notification Bot! I am designed to send you stock updates using Adaptive Cards triggered by timer schedules. " +
              "Please note that I am a notification-only bot and you can't interact with me. Stay tuned for stock notifications!";
            foreach (ChannelAccount member in turnContext.Activity.MembersAdded)
            {
                if (member.Id != turnContext.Activity.Recipient.Id)
                {
                    await turnContext.SendActivityAsync(MessageFactory.Text(welcomeText), cancellationToken);
                }
            }
        }
    }
}
