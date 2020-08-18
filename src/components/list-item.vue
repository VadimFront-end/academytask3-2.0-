<template>
  <div class="list-item"
    @mouseover="lala=i"
    @mouseout="lala=-1">
    <div 
      class="list-item-title"
      :style="bgList">
      <router-link :to="{name: 'cases'}">
      <div
        class="list-title"
        @click="openList(i)"
        >{{name}}
      </div>
      </router-link>
      <div 
        class="cancle"
        @click="deleteDo(i)"
        >&#10008;
      </div>
    </div>
    <div v-if="lala===i">
      <div>Дела:</div>
      <div v-show="!LISTS[lala].tasks.length">В этом списке нет дел!</div> 
      <div
        v-for="(caseItem,index) in LISTS[lala].tasks"
        :key="index"
        >{{index+1}} - {{caseItem.complate ? '&#10004;': '&#10065;'}} {{caseItem.name}} {{caseItem.important ? '(Важное)': ''}}
      </div>
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
      i: {
          type: Number,
          default() {
              return 0
          }
      }
  },
  data() {
    return {
      lala: -1
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
        'CASE',
        'LISTS'
    ]),
    bgList() {
      for(let j=0;j<this.LISTS[this.i].tasks.length;j++) {
        if(this.LISTS[this.i].tasks[j].complate) {
          if(j===this.LISTS[this.i].tasks.length-1) {
            return {
              backgroundColor: 'GreenYellow'
            }
          }  
        }
      }
      if(this.LISTS[this.i].tasks.length)
        return {
          backgroundColor: 'Gold'
        }
      else {
        return {
          backgroundColor: 'white'
        }
      }
      
    }
  }
}
</script>

<style>
.list-item-title {
  background-color:white;
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