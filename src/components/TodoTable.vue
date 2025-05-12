<template>
  <table>
    <thead>
      <tr>
        <th class="title">Name</th>
        <th>Status</th>
        <th class="date">Creation date</th>
        <th class="settings">Editing</th>
      </tr>
    </thead>
    <tbody>
      <TodoItem 
        v-for="todo in todos" 
        :key="todo.id" 
        :todo="todo" 
        @toggle="onToggle" 
        @delete="onDelete" 
      />
    </tbody>
  </table>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  components: {
    TodoItem,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onToggle(todo) {
      this.$emit('toggle', todo);
    },
    onDelete(todo) {
      this.$emit('delete', todo);
    },
  },
};
</script>

<style lang="scss" scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 50px;

    thead {
      height: 45px;

      th {
        text-align: start;
        background-color: white;
        padding: 20px;
      }

      .title {
        border-top-left-radius: 10px;
      }
      
      .settings {
        border-top-right-radius: 10px;
      }
    }

    tbody {
      background-color: white;
    }
  }
</style>