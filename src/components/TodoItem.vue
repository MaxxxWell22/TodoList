<template>
  <tr class="todo-item" 
    :class="{ 
      completed: todo.completed === true, 
      rejected: todo.completed === false, 
      notInstalled: todo.completed === null 
    }"
  >
    <td><span>{{ todo.todo }}</span></td>
    <td class="status-item">        
      <img 
        class="status-image"
        :src="todo.completed === null ? require('../assets/unknown.svg') : (todo.completed ? require('../assets/complete.svg') : require('../assets/reject.svg'))" 
        :alt="todo.completed === null ? 'Unknown status icon' : (todo.completed ? 'Completed icon' : 'Rejected icon')" 
      />
    </td>
    <td class="date-item"><span>{{ todo.time ? todo.time : 'not installed' }}</span></td>
    <td class="delete-and-settings-item">
      <div class="icon-wrapper">
        <img class="settings-ico" src="../assets/settings.svg" alt="settings-ico" @click.prevent="toggle" />
      </div>
      <div class="icon-wrapper">
        <img class="delete-ico" src="../assets/delete.svg" alt="delete-ico" @click.prevent="remove" />
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['todo'],
  methods: {
    toggle() {
      this.$emit('toggle', this.todo);
    },
    remove() {
      this.$emit('delete', this.todo);
    },
  },
};
</script>

<style lang="scss" scoped>
.completed {
  background-color: rgba(4, 255, 0, 0.26);
}
.rejected {
  background-color: #E55050;
  color: white;
}
.notInstalled {
  background-color: #DDDDDD
}
td {
  padding: 10px 20px;

  .icon-wrapper {
    display: inline-block;

    .delete-ico, .settings-ico {
      width: 45px;
      height: 45px;
      transition: transform 0.3s ease; 
    }

    .delete-ico:hover, .settings-ico:hover {
      cursor: pointer;
    }

    .settings-ico:hover {
      animation: rotate 1s linear infinite;
    }

    .delete-ico:hover {
      transform: scale(1.2); 
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg); /* Начальное состояние */
  }
  to {
    transform: rotate(360deg); /* Конечное состояние */
  }
}

.status-image {
  width: 45px;
  height: 45px;
}

.delete-and-settings-item {
  display: flex;
  justify-content: space-between;
}
</style>