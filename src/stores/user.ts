import { defineStore } from 'pinia';
import {ref} from "vue";

export const useUserStore = defineStore('user', {
  state: () => ({
    userNickname: ref<string>('')
  }),

  getters: {
    getUserNickname (state: { userNickname: string; }) {
      return state.userNickname
    }
  },

  actions: {
    setUserNickname (_userNickname: string) {
      this.userNickname = _userNickname
    }
  }
});
