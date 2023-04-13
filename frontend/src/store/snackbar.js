import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore({
  id: 'snackbar',
  state: () => ({
    show: false,
    message: '',
    type: 'success',
    timeoutId: null,
  }),
  actions: {
    showSnackbar({ message, type }) {
      this.message = message;
      this.type = type;
      this.show = true;

      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.show = false;
        this.timeoutId = null;
      }, 5000);
    },
  },
});
