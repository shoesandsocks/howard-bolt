export default {
  welcome_app_home: {
    type: "modal",
    title: {
      type: "plain_text",
      text: "Howard Chicken, mark III",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Howard 🐔 here. I pop off in #debug all the time, and in #testing half the time. Elsewhere you can control how likely I am to interject. Zero is effectively *off*.",
        },
        accessory: {
          action_id: "mouth_select",
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Select a percentage",
          },
          options: [
            {
              text: {
                type: "plain_text",
                text: "0%",
              },
              value: "0",
            },
            {
              text: {
                type: "plain_text",
                text: "15%",
              },
              value: "15",
            },
            {
              text: {
                type: "plain_text",
                text: "30%",
              },
              value: "30",
            },
            {
              text: {
                type: "plain_text",
                text: "45%",
              },
              value: "45",
            },
            {
              text: {
                type: "plain_text",
                text: "60%",
              },
              value: "60",
            },
            {
              text: {
                type: "plain_text",
                text: "75%",
              },
              value: "75",
            },
            {
              text: {
                type: "plain_text",
                text: "90%",
              },
              value: "90",
            },
          ],
        },
      },
    ],
  },
  welcome_channel: {
    text:
      "Hi there! Bolt is a simple App that forwards messages to another channel by reacting to a message with the :zap: emoji.",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Hi there! \n\n Bolt is a simple App that forwards messages from this channel to <#{{channelId}}|{{channelName}}> by reacting to a message with the :zap: emoji.",
        },
      },
    ],
  },
  added_to_channel: {
    text: "Bolt has been invited to channel",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":zap: Bolt has been invited to *<#{{channelId}}|{{channelName}}>*",
        },
      },
    ],
  },
  channel_configured: {
    text: "The default channel for Bolt has been configured",
    replace_original: true,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            ":tada: The default channel for Bolt has been configured for *<#{{channelId}}|{{channelName}}>*",
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "You can now invite Bolt to a channel by typing `/invite` in any of your channels or simply select one channel from the dropdown below.",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Invite Bolt to a channel*",
        },
        accessory: {
          action_id: "add_to_channel",
          type: "channels_select",
          placeholder: {
            type: "plain_text",
            text: "Select channel",
            emoji: true,
          },
        },
      },
    ],
  },
};
