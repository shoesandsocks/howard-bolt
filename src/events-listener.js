import messages from "./messages";

const listenToEvents = (app, store) => {
  app.event("app_home_opened", ({ event, say }) => {
    let user = store.getUser(event.user);

    if (!user) {
      user = {
        user: event.user,
        channel: event.channel,
      };
      store.addUser(user);
      say(messages.welcome_app_home);
    }
  });

  app.action(
    { action_id: "mouthiness_select" },
    async ({ context, action, ack, say }) => {
      await ack();
      console.log(action);
      const newMouthiness = action.value + 0; // .value? coerced to num?
      store.setMouthiness(newMouthiness);
      await say(`Howard's mouthiness set to ${newMouthiness}%.`);
    }
  );
};

export default listenToEvents;
