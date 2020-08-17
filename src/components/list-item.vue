<template>
  <div class="list-item">
    <router-link :to="{name: 'cases'}">
    <div
      class="list-title"
      @click="openList(index)"
      >{{name}}
    </div>
    </router-link>
    <div 
      class="cancle"
      @click="deleteDo(index)"
      >&#10008;
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'list-item',
  props: {
      name: {
          type: String,
          default() {
              return ''
          }
      },
      index: {
          type: Number,
          default() {
              return 0
          }
      }
  },
  methods: {
    openList(index) {
       this.$store.commit('changeOpenedList',index);
    },
    async deleteDo(index) {
      if(confirm(`Точно удалить список ${this.name}?`))
        await this.$store.dispatch('deleteList',index);
    }
  },
  computed: {
    ...mapGetters([
        'CASE'
    ])
  }
}
</script>

<style>
.list-item {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  word-break: break-all;
  border: 5px inset;
  border-radius: 10px;
  padding: 5% 1% 5% 5%;
  margin-top: 5%;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}
.cancle {
  text-align: center;
  font-size:1rem;
}
</style>