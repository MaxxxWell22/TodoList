<template>
  <div class="todo-list">
    <TodoFilter 
      :selectedFilter="selectedFilter" 
      @filter-changed="selectedFilter = $event" 
    />
    <TodoSearch 
      v-model="searchText"
    />
    <BaseButton class="add-new" color="green" @click="openModalNew">
      Add todo
    </BaseButton>
    <BaseButton class="delete-all" color="red" @click="deleteAllCompleted">
      Delete all completed todos
    </BaseButton>
    <TodoTable 
      :todos="filteredTodos" 
      @toggle="openModal" 
      @delete="deleteTodo"
    />
    <TodoModal
      v-if="isModalOpen"
      @close="closeModal"
      @save="saveTodo"
      :todo="selectedTodo"
    />
    <TodoModalNew
      v-if="isModalOpenNew"
      @close="closeModalNew"
      @save="saveTodo"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TodoItem from './TodoItem.vue';
import TodoModal from './TodoModal.vue';
import TodoModalNew from './TodoModalNew.vue';
import TodoFilter from './TodoFilter.vue';
import TodoSearch from './TodoSearch.vue';
import BaseButton from './BaseButton.vue';
import TodoTable from './TodoTable.vue';

export default {
  components: {
    TodoItem,
    TodoModal,
    TodoModalNew,
    TodoFilter,
    TodoSearch,
    BaseButton,
    TodoTable,
  },
  data() {
    return {
      isModalOpen: false,
      selectedTodo: null,
      selectedFilter: 'All',
      searchText: '',
      isModalOpenNew: false,
    };
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos() {
      let filtered = this.todos.todos;

      if (this.selectedFilter === 'Completed') {
        filtered = filtered.filter(todo => todo.completed);
      } else if (this.selectedFilter === 'Rejected') {
        filtered = filtered.filter(todo => !todo.completed);
      }

      if (this.searchText) {
        const searchTextLower = this.searchText.toLowerCase();
        filtered = filtered.filter(todo => 
          todo.todo.toLowerCase().includes(searchTextLower)
        );
      }

      return filtered;
    },
  },
  methods: {
    openModal(todo) {
      this.selectedTodo = todo;
      this.isModalOpen = true;
    },
    openModalNew() {
      this.isModalOpenNew = true;
    },
    closeModalNew() {
      this.isModalOpenNew = false;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedTodo = null;
    },
    deleteAllCompleted() {
      if (confirm('Вы уверены, что хотите удалить все завершенные задачи?')) {
        this.$store.dispatch('todos/deleteAllCompleted');
      }
    },
    saveTodo(newTodo, text) {
       if (text == 'update') {
         this.$store.dispatch('todos/updateTodo', newTodo);
       } else {
         this.$store.dispatch('todos/addTodo', newTodo);
       }
       
       this.closeModal();
       this.closeModalNew(); // Закрываем модальное окно добавления нового todo
     },
     deleteTodo(todo) {
       if (confirm(`Вы уверены, что хотите удалить задачу "${todo.todo}"?`)) {
         this.$store.dispatch('todos/deleteTodo', todo.id);
       }
     },
   },
};
</script>

<style lang="scss" scoped>
.todo-list {
  position: absolute;
  width: 600px;
  top: 130px;

  .add-new, .delete-all {
    color: white;
    width: 100%;
  }

  .delete-all {
    margin-top: 13px;
  }
}
</style>