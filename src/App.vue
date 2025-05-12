<template>
  <v-app>
    <div class="home">
      <div class="top-home">
        <h1 class="home-title">Todo List</h1> 
      </div>
      <TodoList />
    </div> 
  </v-app>
 </template>

<script> 
import TodoList from './components/TodoList.vue'; 
export default { components: { TodoList } }; 
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  .top-home {
    display: flex;
    width: 100%;
    height: 300px;
    justify-content: center;
    background-color: #C68EFD;

    .home-title {
      color: white;
    }
  }
}
</style> 