<template>
  <div>
    <v-select
      label="Filter"
      :items="['All', 'Completed', 'Rejected']"
      v-model="localFilter"
      @change="updateFilter"
    />
  </div>
</template>

<script>
export default {
  props: {
    selectedFilter: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localFilter: this.selectedFilter, // Локальное состояние для фильтра
    };
  },
  watch: {
    selectedFilter(newValue) {
      this.localFilter = newValue; // Обновляем локальное состояние при изменении пропа
    },
  },
  methods: {
    updateFilter(value) {
      this.$emit('filter-changed', value);
    },
  },
};
</script>