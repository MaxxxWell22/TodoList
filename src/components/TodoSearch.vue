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
      this.searchText = newValue;
    },
  },
  methods: {
    updateSearch() {
      this.$emit('input', this.searchText);
    },
  },
};
</script>
