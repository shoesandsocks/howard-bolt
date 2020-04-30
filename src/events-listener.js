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

      say(`hello for the first time, ${user}`);
    }
    say(`hello again ${user}`);
  });
};

export default listenToEvents;
