const state = {
  todos: JSON.parse(localStorage.getItem('todos')) || [
    {
      "id": 1,
      "todo": "Contribute code or a monetary donation to an open-source software project",
      "completed": false,
      "time": "2025-04-23"
    },
    {
      "id": 2,
      "todo": "Build a Vue.js application",
      "completed": false,
      "time": "2025-04-25"
    },
    {
      "id": 3,
      "todo": "Build a Vue.js application",
      "completed": false,
      "time": "2025-04-25"
    },
    {
      "id": 4,
      "todo": "Build a Vue.js application",
      "completed": false,
      "time": "2025-04-25"
    },
    {
      "id": 5,
      "todo": "Learn Vue.js",
      "completed": true,
      "time": "2025-04-24"
    },
    {
      "id": 6,
      "todo": "Build a Vue.js application",
      "completed": false,
      "time": "2025-04-25"
    }
  ],
};

const mutations = {
  SET_TODOS(state, todos) {
    state.todos = todos;
    localStorage.setItem('todos', JSON.stringify(todos));
  },
  
  UPDATE_TODO(state, updatedTodo) {
    const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
    
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  },

  DELETE_TODO(state, id) {
    const index = state.todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
      state.todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  },

  ADD_TODO(state, newTodo) {
    state.todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(state.todos));
  },
};

const actions = {
  updateTodo({ commit }, updatedTodo) {
    commit('UPDATE_TODO', updatedTodo);
  },

  deleteTodo({ commit }, todoId) {
    commit('DELETE_TODO', todoId);
  },

  addTodo({ commit }, newTodo) {
    commit('ADD_TODO', newTodo);
  },

  deleteAllCompleted({ commit, state }) {
    const updatedTodos = state.todos.filter(todo => !todo.completed);
    commit('SET_TODOS', updatedTodos);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};