<template>
  <div
      class="list-item"
      :style="{border: caseItem.important ? '1px solid #EC1B1B': '1px solid #889ABD'}">
    <div class="main-case">
      <div
          class="status-list"
          style="width: 16px"
          @mouseout="showStatus=false"
          @mousemove="showStatus=true"
          @click="editStatus">
        <svg v-if="caseItem.complete" width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M6 0C2.6916 0 0 2.6916 0 6C0 9.3084 2.6916 12 6 12C9.3084 12 12 9.3084 12 6C12 2.6916 9.3084 0 6 0ZM6 10.8C3.3534 10.8 1.2 8.6466 1.2 6C1.2 3.3534 3.3534 1.2 6 1.2C8.6466 1.2 10.8 3.3534 10.8 6C10.8 8.6466 8.6466 10.8 6 10.8Z"
              fill="#2CCF11"/>
          <path
              d="M4.79941 6.95213L3.42001 5.57513L2.57281 6.42473L4.80062 8.64773L8.82421 4.62413L7.97581 3.77573L4.79941 6.95213Z"
              fill="#2CCF11"/>
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM8 14.4C4.4712 14.4 1.6 11.5288 1.6 8C1.6 4.4712 4.4712 1.6 8 1.6C11.5288 1.6 14.4 4.4712 14.4 8C14.4 11.5288 11.5288 14.4 8 14.4Z"
              fill="#889ABD"/>
        </svg>
        <div class="description-for-status" style="font-weight: 600" v-show="showStatus">
          <div
              v-if="caseItem.complete"
              style="color: #27B310"
          >Готово
          </div>
          <div
              v-else
              style="color: #576F9D"
          >Нужно сделать
          </div>
        </div>
        <div class="select-status-for-task" v-show="index===indexFocus">
          <div
              style="color: #576F9D"
              :style="{background: !caseItem.complete ? '#E5EBF3': ''}"
              class="container-for-statuses"
              @click="selectThisStatus(false)"
          >Нужно сделать
            <svg v-show="!caseItem.complete" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.43434 1.11228C8.60579 0.934339 8.83724 0.834197 9.07865 0.8335C9.32006 0.832802 9.55204 0.931606 9.72442 1.10855C9.89681 1.28549 9.99575 1.52636 9.99987 1.77908C10.004 2.03179 9.91293 2.27605 9.74641 2.45904L4.85587 8.85938C4.77182 8.95416 4.67038 9.03023 4.55761 9.08302C4.44483 9.13582 4.32305 9.16427 4.19954 9.16667C4.07602 9.16906 3.95332 9.14535 3.83876 9.09696C3.72419 9.04857 3.62013 8.97649 3.53278 8.88503L0.292438 5.49118C0.202165 5.40312 0.12976 5.29691 0.0795416 5.17891C0.029323 5.06091 0.0023197 4.93353 0.000142992 4.80436C-0.00203372 4.6752 0.0206608 4.5469 0.0668722 4.42712C0.113084 4.30733 0.181865 4.19852 0.269114 4.10717C0.356363 4.01583 0.460292 3.94381 0.5747 3.89543C0.689108 3.84705 0.811652 3.82329 0.935022 3.82557C1.05839 3.82785 1.18006 3.85612 1.29277 3.9087C1.40547 3.96127 1.50691 4.03708 1.59103 4.13159L4.15635 6.81614L8.41107 1.1405C8.41866 1.13056 8.42684 1.12113 8.43557 1.11228H8.43434Z" fill="#576F9D"/>
            </svg>
          </div>
          <div
              style="color: #27B310;border-radius: 0 0 5px 5px"
              :style="{background: caseItem.complete ? '#DFFCDB': ''}"
              @click="selectThisStatus(true)"
              class="container-for-statuses"
          >Готово
            <svg v-show="caseItem.complete" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.43434 1.11228C8.60579 0.934339 8.83724 0.834197 9.07865 0.8335C9.32006 0.832802 9.55204 0.931606 9.72442 1.10855C9.89681 1.28549 9.99575 1.52636 9.99987 1.77908C10.004 2.03179 9.91293 2.27605 9.74641 2.45904L4.85587 8.85938C4.77182 8.95416 4.67038 9.03023 4.55761 9.08302C4.44483 9.13582 4.32305 9.16427 4.19954 9.16667C4.07602 9.16906 3.95332 9.14535 3.83876 9.09696C3.72419 9.04857 3.62013 8.97649 3.53278 8.88503L0.292438 5.49118C0.202165 5.40312 0.12976 5.29691 0.0795416 5.17891C0.029323 5.06091 0.0023197 4.93353 0.000142992 4.80436C-0.00203372 4.6752 0.0206608 4.5469 0.0668722 4.42712C0.113084 4.30733 0.181865 4.19852 0.269114 4.10717C0.356363 4.01583 0.460292 3.94381 0.5747 3.89543C0.689108 3.84705 0.811652 3.82329 0.935022 3.82557C1.05839 3.82785 1.18006 3.85612 1.29277 3.9087C1.40547 3.96127 1.50691 4.03708 1.59103 4.13159L4.15635 6.81614L8.41107 1.1405C8.41866 1.13056 8.42684 1.12113 8.43557 1.11228H8.43434Z" fill="#27B210"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="case-title" @click="isImportant">{{caseItem.name}}</div>
    </div>
    <div class="date-case" @click="isImportant">
      <div class="date">{{caseItem.date}}</div>
    </div>
    <div 
      class="cancle"
      @click="deleteDo(index)"
      >&#10008;
    </div>
  </div>
</template>

<script>

export default {
  name: 'case',
  props: {
    caseItem: {
      type: Object,
      default() {
          return {}
      }
    },
    index: {
      type: Number,
      default() {
          return 0
      }
    },
    indexFocus: {
      type: Number,
      default() {
        return NaN
      }
    }
  },
  data() {
    return {
      showStatus: false
    }
  },
  methods: {
    async deleteDo(index) {
      if(confirm(`Точно удалить дело ${this.caseItem.name}?`))
        await this.$store.dispatch('deleteDo',index);
    },
    async isImportant() {  
        this.caseItem.important=!this.caseItem.important;
        await this.$store.dispatch('changeImport');
    },
    editStatus() {
      this.$emit('edittingStatus', this.index);
    },
    async selectThisStatus(status) {
      this.caseItem.complete=status;
      const newStatus= {
        indexTask: this.index,
        status
      }
      await this.$store.dispatch('isComplete',newStatus);
    }
  }
}
</script>

<style>
.date-case {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
}

.case-title {
  line-height: 16px;
  width: 100%;
  word-break: break-all;
  margin-left: 2%;
}
.date {
  margin-right: 3%;
}

.main-case {
  width: 70%;
  display: flex;
}
.select-status-for-task {
  font-weight: 600;
  position: absolute;
  top: 75%;
  box-shadow: 0 0 10px rgba(2, 57, 164, 0.2);
  border-radius: 5px;
  white-space: nowrap;
  background: #FFFFFF;
  z-index: 4;
  width: 134px;
}
.container-for-statuses {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  font-size: 0.85rem;
}
</style>