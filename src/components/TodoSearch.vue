<template>
  <v-text-field 
    label="Search" 
    v-model="searchText" 
    @input="updateSearch"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchText: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.searchText = newValue; // Обновляем локальное состояние при изменении пропа
    },
  },
  methods: {
    updateSearch() {
      this.$emit('input', this.searchText); // Эмитируем событие при изменении текста
    },
  },
};
</script>
