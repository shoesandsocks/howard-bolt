const listenToEvents = (app) => {
  app.event("app_home_opened", async ({ event, context }) => {
    console.log("ahoy");
    try {
      /* view.publish is the method that your app uses to push a view to the Home tab */
      const result = await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
        view: {
          type: "home",
          callback_id: "home_view",
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*Welcome to your _App's Home_* :tada:",
              },
            },
            {
              type: "divider",
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "This button won't do much.",
              },
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: {
                    type: "plain_text",
                    text: "Click me!",
                  },
                },
              ],
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
};

export default listenToEvents;
