import { createSlice } from "@reduxjs/toolkit";

const chatData = JSON.parse(localStorage.getItem("chatData")) || [];

const updateLocalStorage = (data) => {
  localStorage.setItem("chatData", JSON.stringify(data));
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    mainData: chatData,
    chatNum: 0,
    chatActive: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.mainData.push(action.payload);
      updateLocalStorage(state.mainData);
    },

    deleteUser: (state, action) => {
      const user = action.payload;
      state.mainData = state.mainData.filter((i) => i.number !== user.number);

      state.mainData.forEach((i) => {
        i.contacts = i.contacts.filter((e) => e.number !== user.number);
      });

      updateLocalStorage(state.mainData);
    },

    addContactToUser: (state, action) => {
      const { user, contact } = action.payload;
      state.mainData.forEach((i) => {
        if (i.number === user.number) {
          i.contacts.push({
            name: contact.name,
            number: contact.number,
            chat: [],
          });
        }
        if (i.number === contact.number) {
          i.contacts.push({ name: user.name, number: user.number, chat: [] });
        }
      });

      updateLocalStorage(state.mainData);
    },

    addMsg: (state, action) => {
      const { user, msg } = action.payload;
      const id = Math.random();

      state.mainData.forEach((i) => {
        if (i.number === user.number) {
          i.contacts.forEach((e) => {
            if (e.number === state.chatNum) {
              if (!Array.isArray(e.chat)) {
                e.chat = [];
              }
              e.chat.push({ content: msg, id, sender: "me" });
            }
          });
        }

        if (i.number === state.chatNum) {
          i.contacts.forEach((e) => {
            if (e.number === user.number) {
              if (!Array.isArray(e.chat)) {
                e.chat = [];
              }
              e.chat.push({ content: msg, id, sender: "user" });
            }
          });
        }
      });

      updateLocalStorage(state.mainData);
    },

    deleteChat: (state, action) => {
      const user = action.payload;

      state.mainData.forEach((i) => {
        if (i.number === user.number) {
          i.contacts.forEach((e) => {
            if (e.number === state.chatNum) {
              e.chat = [];
            }
          });
        }

        if (i.number === state.chatNum) {
          i.contacts.forEach((e) => {
            if (e.number === user.number) {
              e.chat = [];
            }
          });
        }
      });

      updateLocalStorage(state.mainData);
    },

    deleteContact: (state, action) => {
      const user = action.payload;

      state.mainData.forEach((i) => {
        if (i.number === user.number) {
          return (i.contacts = i.contacts.filter(
            (e) => e.number !== state.chatNum
          ));
        }

        if (i.number === state.chatNum) {
          return (i.contacts = i.contacts.filter(
            (e) => e.number !== user.number
          ));
        }
      });

      state.chatNum = 0;

      updateLocalStorage(state.mainData);
    },

    deleteMsg: (state, action) => {
      const { user, msg } = action.payload;

      state.mainData.forEach((i) => {
        if (i.number === user.number) {
          i.contacts.forEach((e) => {
            if (e.number === state.chatNum) {
              return (e.chat = e.chat.filter((x) => x.id !== msg.id));
            }
          });
        }

        if (i.number === state.chatNum) {
          i.contacts.forEach((e) => {
            if (e.number === user.number) {
              return (e.chat = e.chat.filter((x) => x.id !== msg.id));
            }
          });
        }
      });

      updateLocalStorage(state.mainData);
    },

    selectChat: (state, action) => {
      state.chatNum = action.payload;
    },

    openChat: (state) => {
      state.chatActive = !state.chatActive;
    },
  },
});

export const {
  addUser,
  deleteUser,
  addContactToUser,
  addMsg,
  deleteChat,
  deleteContact,
  deleteMsg,
  selectChat,
  openChat,
} = chatSlice.actions;
export default chatSlice.reducer;
