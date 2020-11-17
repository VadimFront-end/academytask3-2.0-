<template>
  <div class="list-item" @click="openList(indexList)">
    <div class="status-list" @mouseout="showStatus=false" @mousemove="showStatus=true">
      <svg v-if="status===2" width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 5.3444H9.50538L6.05604 1.87436L6.97752 0.947357L12 5.99999L6.97752 11.0526L6.05604 10.1256L9.50538 6.65558H0V5.3444Z"
            fill="#4F8AFD"/>
      </svg>
      <svg v-if="status===3" width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6 0C2.6916 0 0 2.6916 0 6C0 9.3084 2.6916 12 6 12C9.3084 12 12 9.3084 12 6C12 2.6916 9.3084 0 6 0ZM6 10.8C3.3534 10.8 1.2 8.6466 1.2 6C1.2 3.3534 3.3534 1.2 6 1.2C8.6466 1.2 10.8 3.3534 10.8 6C10.8 8.6466 8.6466 10.8 6 10.8Z"
            fill="#2CCF11"/>
        <path
            d="M4.79941 6.95213L3.42001 5.57513L2.57281 6.42473L4.80062 8.64773L8.82421 4.62413L7.97581 3.77573L4.79941 6.95213Z"
            fill="#2CCF11"/>
      </svg>
      <svg v-if="status===1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM8 14.4C4.4712 14.4 1.6 11.5288 1.6 8C1.6 4.4712 4.4712 1.6 8 1.6C11.5288 1.6 14.4 4.4712 14.4 8C14.4 11.5288 11.5288 14.4 8 14.4Z"
            fill="#889ABD"/>
      </svg>
      <div class="description-for-status" style="font-weight: 600" v-show="showStatus">
        <div
            v-show="status===3"
            style="color: #27B310"
        >Готово
        </div>
        <div
            v-show="status===2"
            style="color: #0356F6"
        >В работе
        </div>
        <div
            v-show="status===1"
            style="color: #576F9D"
        >Нужно сделать
        </div>
      </div>
    </div>
    <router-link :to="'/tasks'">
      <div style="display: flex">
        <div class="list-title">{{ name }}</div>
      </div>
    </router-link>
    <div @click="deleteDo(indexList)">&#10008;</div>
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
    indexList: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      status: 1,
      showStatus: false
    }
  },
  methods: {
    openList(indexList) {
      this.$store.commit('changeOpenedList', indexList);
    },
    async deleteDo(indexList) {
      if (confirm(`Точно удалить список ${this.name}?`))
        await this.$store.dispatch('deleteList', indexList);
    }
  },
  computed: {
    ...mapGetters([
      'LISTS'
    ])
  },
  mounted() {
    for (let j = 0; j < this.LISTS[this.indexList].tasks.length; j++) {
      if (!this.LISTS[this.indexList].tasks[j].complete)
        break;
      else if (j === this.LISTS[this.indexList].tasks.length - 1) {
        this.status = 3;
        return;
      }
    }
    if (this.LISTS[this.indexList].tasks.length) this.status = 2;
    else this.status = 1;
  }
}
</script>

<style>
.list-item {
  padding: 5px;
  height: 60px;
  background-color: white;
  cursor: pointer;
  justify-content: space-between;
  display: flex;
  box-shadow: 0 0 15px rgba(2, 57, 164, 0.05);
  word-break: break-all;
  margin-bottom: 2px;
  width: 310px;
}

.list-item:hover {
  box-shadow: 0 0 20px rgba(2, 57, 164, 0.2);
  position: relative;
  z-index: 2;
}

.status-list {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.list-title {
  margin: 5px 10px;
  font-size: .8rem;
}

.description-for-status {
  font-weight: 600;
  position: absolute;
  padding: 9px 16px;
  font-size: 0.85rem;
  box-shadow: 0 0 10px rgba(2, 57, 164, 0.2);
  white-space: nowrap;
  background: white;
  border-radius: 5px;
  top: 75%;
  z-index: 3;
}
</style>