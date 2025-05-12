<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <h2>{{ todo ? 'Edit todo' : 'Add todo' }}</h2>
      <div class="wrapper-inputName">
        <v-text-field 
          label="Name:"
          id="taskName" 
          type="text" 
          v-model="taskName" 
          :placeholder="'New name todo'"
        >
        </v-text-field>
      </div>
      <div>
        <span>Status: </span>
        <v-checkbox
          label="Completed"
          v-model="isCompleted"
          color="success"
        ></v-checkbox>
        <v-checkbox
          label="Rejected"
          v-model="isNotCompleted"
          color="red"
        ></v-checkbox>
      </div>
      <div>
        <span>Creation date: {{ creationDate }}</span>
        <v-btn class="editButton" @click="editDate">Edit</v-btn>
        <v-date-picker v-if="isEditingDate" v-model="creationDate"></v-date-picker>
      </div>
      <div class="wrapper-buttons">
        <v-btn @click.prevent="save">Save</v-btn>
        <v-btn @click.prevent="$emit('close')">Close</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todo'],
  data() {
    return {
      taskName: this.todo ? this.todo.todo : '',
      isCompleted: this.todo ? this.todo.completed : false,
      isNotCompleted: this.todo ? !this.todo.completed : false,
      creationDate: this.todo ? this.todo.time : '', // Инициализируем дату
      isEditingDate: false, // Состояние для управления видимостью редактора даты
    };
  },
  watch: {
    isCompleted(newValue) {
      // Если задача выполнена, то "не выполнено" должно быть false
      if (newValue) {
        this.isNotCompleted = false;
      }
    },
    isNotCompleted(newValue) {
      // Если задача не выполнена, то "выполнено" должно быть false
      if (newValue) {
        this.isCompleted = false;
      }
    },
  },
  methods: {
    editDate() {
      this.isEditingDate = !this.isEditingDate; // Переключаем состояние редактирования даты
    },
    save() {
      const updatedTodo = {
        ...this.todo,
        todo: this.taskName,
        completed: this.isCompleted,
        time: this.creationDate,
      };
      
      this.$emit('save', updatedTodo, 'update');
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Прозрачный черный фон */
  display: flex;
  justify-content: center; /* Центрирование по горизонтали */
  align-items: center; /* Центрирование по вертикали */
}

.modal-content {
  width: 500px;
  background-color: white; /* Цвет фона модального окна */
  padding: 20px;
  border-radius: 8px; /* Закругленные углы */
  box-shadow: 0px 4px 15px rgba(0,0,0,0.3); /* Тень для модального окна */
  display: flex;
  flex-direction: column;
  align-items: start;

  .wrapper-inputName {
    width: 100%;
  }
}

.input-name {
  width: 350px;
  height: 35px;
}

.editButton {
  padding: 2px 20px;
  border: 1px solid;
  border-radius: 5px;
  margin-left: 15px;
}

.wrapper-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>