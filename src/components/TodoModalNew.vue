<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <h2>Add todo</h2>
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="wrapper-inputName">
          <v-text-field 
            label="Name:"
            id="taskName" 
            type="text" 
            v-model="taskName" 
            :placeholder="'Name todo'"
            :rules="[rules.required]"
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
        <div class="wrapper-date">
          <span class="date-title">Creation date: {{ creationDate }}</span>
          <v-date-picker v-model="creationDate"></v-date-picker>
        </div>
        <div class="wrapper-buttons">
          <v-btn @click.prevent="save">Save</v-btn>
          <v-btn @click.prevent="$emit('close')">Close</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskName: '',
      isCompleted: null,
      isNotCompleted: false,
      creationDate: '',
      isEditingDate: false,
      valid: false,
      rules: {
        required: value => !!value || 'Required.',
      },
    };
  },
  watch: {
    isCompleted(newValue) {
      if (newValue) {
        this.isNotCompleted = false;
      }
    },
    isNotCompleted(newValue) {
      if (newValue) {
        this.isCompleted = false;
      }
    },
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) { // Проверяем валидность формы
        const todos = JSON.parse(localStorage.getItem('todos')) || [];

        const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
        
        const newTodo = {
          id: maxId + 1,
          todo: this.taskName,
          completed: this.isCompleted,
          time: this.creationDate,
        };
        
        this.$emit('save', newTodo, 'add');
        
        // Сбрасываем поля после сохранения
        this.taskName = '';
        this.isCompleted = false;
        this.isNotCompleted = false;
        this.creationDate = '';
      }
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

  .v-form {
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

.wrapper-date {
  display: flex;
  flex-direction: column;

  .date-title {
    margin-bottom: 25px;
  }
}

.wrapper-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>