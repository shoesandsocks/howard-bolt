let messages = {};
let users = {};
let me = undefined;
let defaultChannel = "C0C3VLD28"; // rotl
let mouthiness = 25;

const setMouthiness = (num) => {
  mouthiness = num;
};
const getMouthiness = (num) => {
  return mouthiness;
};
const getMessages = () => {
  return messages;
};

const addUser = (user) => {
  users[user.user] = user;
};

const getUser = (id) => {
  return users[id];
};

const setChannel = (channel) => {
  defaultChannel = channel;
};

const getChannel = () => {
  return defaultChannel;
};

const setMe = (id) => {
  me = id;
};

const getMe = () => {
  return me;
};

export default {
  getMouthiness,
  setMouthiness,
  getMessages,
  addUser,
  getUser,
  setChannel,
  getChannel,
  setMe,
  getMe,
};
