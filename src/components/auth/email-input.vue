<template>
  <div class="email-input">
    <div
        class="title-for-input"
        :style="{visibility: email ? 'visible': '',
                  color: error ? '#EC1B1B': ''}">E-mail
    </div>
    <div class="form-item">
      <div :style="{visibility: error ? 'visible': 'hidden'}">
        <div class="sign-error">!</div>
      </div>
      <input
          :style="{borderBottom: error ? '1px solid #EC1B1B': ''}"
          class="input-form"
          type="email"
          placeholder="Введите почту"
          v-model.trim="email">
      <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
        <path :fill="error ? '#EC1B1B': ''" d="M14.4 0.599976H1.6C0.7176 0.599976 0 1.31758 0 2.19998V11.8C0 12.6824 0.7176 13.4 1.6 13.4H14.4C15.2824 13.4 16 12.6824 16 11.8V2.19998C16 1.31758 15.2824 0.599976 14.4 0.599976ZM14.4 2.19998V2.60878L8 7.58718L1.6 2.60958V2.19998H14.4ZM1.6 11.8V4.63518L7.5088 9.23118C7.64889 9.34121 7.82186 9.40102 8 9.40102C8.17814 9.40102 8.35111 9.34121 8.4912 9.23118L14.4 4.63518L14.4016 11.8H1.6Z" />
      </svg>
    </div>
  </div>
</template>

<script>

export default {
  name: "email-input",
  props: {
    error: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      email: ''
    }
  },
  watch: {
    email() {
      this.$emit('pushEmail', this.email);
    }
  }
}
</script>

<style>
.input-form {
  padding: 4px 7px;
  margin: 0 4px;
  border-bottom: 1px solid #889ABD;
  width: 80%;
}
.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
}
.input-form:focus {
  border-bottom: 1px solid #4F8AFD;
}
.input-form + svg {
  fill: #889ABD;
}
.input-form:focus + svg {
  fill: #4F8AFD;
}
.sign-error {
  width: 16px;
  height: 16px;
  background: #EC1B1B;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
}
.title-for-input {
  font-size: 0.85rem;
  line-height: 14px;
  color: #889ABD;
  margin-left: 26px;
  visibility: hidden;
}
</style>