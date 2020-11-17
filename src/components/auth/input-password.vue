<template>
  <div class="password-input">
    <div
        class="title-for-input"
        :style="{visibility: password ? 'visible': '',
                  color: error ? '#EC1B1B': ''}">{{ placeHolder }}
    </div>
    <div class="form-item">
      <div :style="{visibility: error ? 'visible': 'hidden'}">
        <div class="sign-error">!</div>
      </div>
      <input
          class="input-form"
          type="password"
          :style="{borderBottom: error ? '1px solid #EC1B1B': ''}"
          :placeholder="placeHolder"
          v-model.trim="password">
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              class="log-svg"
              clip-rule="evenodd"
              :fill="error ? '#EC1B1B': ''"
              d="M3.0001 4C3.0001 1.7944 4.7945 0 7.0001 0C9.2057 0 11.0001 1.7944 11.0001 4V5.6H11.8001C12.6825 5.6 13.4001 6.3176 13.4001 7.2V14.4C13.4001 15.2824 12.6825 16 11.8001 16H2.2001C1.3177 16 0.600098 15.2824 0.600098 14.4V7.2C0.600098 6.3176 1.3177 5.6 2.2001 5.6H3.0001V4ZM7.0001 1.6C5.6769 1.6 4.6001 2.6768 4.6001 4V5.6H9.4001V4C9.4001 2.6768 8.3233 1.6 7.0001 1.6ZM7.8001 14.4H11.8017L11.8001 7.2H2.2001V14.4H6.2001H7.8001Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>

export default {
  name: "input-password",
  props: {
    confirm: {
      type: Boolean,
      default() {
        return false;
      }
    },
    placeHolder: {
      type: String,
      default() {
        return 'Пароль';
      }
    },
    error: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      password: ''
    }
  },
  watch: {
    password() {
      this.$emit('pushPassword', this.password);
    }
  }
}
</script>

<style>

</style>