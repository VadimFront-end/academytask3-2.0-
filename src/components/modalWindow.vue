<template>
  <transition name="modalWinClose">
    <div class="modal-window">
      <slot></slot>
      <div style="display:flex;justify-content:flex-end">
        <button style="display:block;" @click="modalWinIsVisibleF">OK</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modalWinClose',
  methods: {
    modalWinIsVisibleF() {
      this.$emit('modalWinIsVisibleF');
    }
  }
}
</script>

<style>
.modal-window {
  padding: 2%;
  position: absolute;
  z-index: 3;
  top: 2%;
  left: 30%;
  right: 30%;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
}

@media (max-width: 500px) {
  .modal-window {
    left: 10%;
    right: 10%;
  }
}

.modalWinClose-leave-active {
  opacity: 0;
  transition: 1.5s;
}
</style>