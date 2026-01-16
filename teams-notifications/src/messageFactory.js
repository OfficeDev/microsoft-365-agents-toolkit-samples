const ACData = require("adaptivecards-templating");
const notificationTemplate = require("./adaptiveCards/notification-default.json");

/**
 * Sends a notification to a specific user.
 * If an adaptive card is enabled, the message is sent as an adaptive card;
 * otherwise, it is sent as a plain text message.
 *
 * @async
 * @param {Object} member - The Teams member object representing the user.
 * @param {boolean} adaptiveCard - Indicates whether to send an adaptive card.
 * @param {string} message - The notification message content.
 * @param {string} [userName] - Optional user name to include in the card description.
 * @returns {Promise<void>}
 */
async function sendToUser(member, adaptiveCard, message, userName) {
    if (adaptiveCard) {
        await member.sendAdaptiveCard(createCardPayload(message, userName));
    } else {
        await member.sendMessage(message);
    }
}

/**
 * Sends a notification to a Teams channel.
 * If an adaptive card is enabled, the message is sent as an adaptive card;
 * otherwise, it is sent as a plain text message.
 *
 * @async
 * @param {Object} channel - The Teams channel object.
 * @param {boolean} adaptiveCard - Indicates whether to send an adaptive card.
 * @param {string} message - The notification message content.
 * @param {string} [userName] - Optional user name to include in the card description.
 * @returns {Promise<void>}
 */
async function sendToChannel(channel, adaptiveCard, message, userName) {
    if (adaptiveCard) {
        await channel.sendAdaptiveCard(createCardPayload(message, userName));
    } else {
        await channel.sendMessage(message);
    }
}

/**
 * Creates and expands an Adaptive Card payload using the predefined template.
 * Optionally appends the user name to the message description.
 *
 * @param {string} message - The main notification message.
 * @param {string} [userName] - Optional user name to personalize the message.
 * @returns {Object} The expanded Adaptive Card payload.
 */
function createCardPayload(message, userName){
    return new ACData.Template(notificationTemplate).expand({
        $root: {
            title: "New Event Occurred!",
            appName: "Contoso App Notification",
            description: (userName) ? `${message} for user: ${userName}` : message,
            notificationUrl: "https://aka.ms/teamsfx-notification-new",
        },
    })
}

module.exports = { sendToUser, sendToChannel };
