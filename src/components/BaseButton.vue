<template>
  <button 
    :class="['base-button', buttonClass]" 
    @click="$emit('click')"
    :style="{ backgroundColor: color }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    buttonClass: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'transparent',
    },
  },
};
</script>

<style scoped>
.base-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>