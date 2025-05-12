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
      localFilter: this.selectedFilter,
    };
  },
  watch: {
    selectedFilter(newValue) {
      this.localFilter = newValue; 
    },
  },
  methods: {
    updateFilter(value) {
      this.$emit('filter-changed', value);
    },
  },
};
</script>