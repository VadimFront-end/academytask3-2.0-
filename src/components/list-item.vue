<template>
  <div class="list-item" @click="openList(indexList)">
    <div
        class="status-list"
        @mouseout="showStatus=false"
        @mousemove="showStatus=true">
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
    <router-link :to="'/tasks'" v-if="!editting">
      <div style="display: flex">
        <div class="list-title">{{ name }}</div>
      </div>
    </router-link>
    <input
        type="text"
        v-else
        v-model.trim="newName">
    <div style="display: flex;flex-direction: column">
      <div @click="deleteDo(indexList)">&#10008;</div>
      <div
          @click="editting=true;newName=name"
          style="margin: auto"
          v-if="!editting">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4.19201C16.0006 4.08673 15.9804 3.98236 15.9406 3.88489C15.9008 3.78742 15.8421 3.69877 15.768 3.62401L12.376 0.232013C12.3012 0.157868 12.2126 0.0992081 12.1151 0.0593964C12.0176 0.0195847 11.9133 -0.000595343 11.808 1.33714e-05C11.7027 -0.000595343 11.5983 0.0195847 11.5009 0.0593964C11.4034 0.0992081 11.3147 0.157868 11.24 0.232013L8.97598 2.49601L0.231983 11.24C0.157838 11.3148 0.0991776 11.4034 0.0593659 11.5009C0.0195542 11.5984 -0.000625861 11.7027 -1.71461e-05 11.808V15.2C-1.71461e-05 15.4122 0.0842683 15.6157 0.234297 15.7657C0.384327 15.9157 0.58781 16 0.799983 16H4.19198C4.30393 16.0061 4.4159 15.9886 4.52064 15.9486C4.62538 15.9087 4.72055 15.8471 4.79998 15.768L13.496 7.02401L15.768 4.80001C15.841 4.72248 15.9005 4.63324 15.944 4.53601C15.9517 4.47225 15.9517 4.40778 15.944 4.34401C15.9477 4.30677 15.9477 4.26925 15.944 4.23201L16 4.19201ZM3.86398 14.4H1.59998V12.136L9.54398 4.19201L11.808 6.45601L3.86398 14.4ZM12.936 5.32801L10.672 3.06401L11.808 1.93601L14.064 4.19201L12.936 5.32801Z" fill="#889ABD"/>
        </svg>
      </div>
      <div
          @click="editList(indexList)"
          style="margin: auto"
          v-else>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM8 14.4C4.4712 14.4 1.6 11.5288 1.6 8C1.6 4.4712 4.4712 1.6 8 1.6C11.5288 1.6 14.4 4.4712 14.4 8C14.4 11.5288 11.5288 14.4 8 14.4Z" fill="#2CCF11"/>
          <path d="M6.39922 9.26938L4.56002 7.43338L3.43042 8.56618L6.40082 11.5302L11.7656 6.16538L10.6344 5.03418L6.39922 9.26938Z" fill="#2CCF11"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {maxLength, required} from "vuelidate/lib/validators";

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
      showStatus: false,
      newName: '',
      editting: false
    }
  },
  validations: {
    newName: {
      required,
      maxLength: maxLength(40),
      isExists(creatList) {
        for(let i=0;i<this.LISTS.length;i++) {
          if((this.LISTS[i].list.toLowerCase()===creatList.toLowerCase())&&(i!==this.indexList)) return false;
        }
        return true;
      }
    }
  },
  methods: {
    openList(indexList) {
      this.$store.commit('changeOpenedList', indexList);
    },
    async deleteDo(indexList) {
      if (confirm(`Точно удалить список ${this.name}?`))
        await this.$store.dispatch('deleteList', indexList);
    },
    editList(indexList) {
      if(!this.$v.newName.$invalid) {
        const newName = {
          name: this.newName,
          indexList
        }
        this.editting = false;
        this.$store.dispatch('editList', newName);
      }
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