<template>
  <div class="item" :class="{'done': item.isCompleted}">
    <input type="checkbox" @click="setStatus(index)">
    {{index+1}}. <span>{{item.text}}</span>
    <button @click="del(index)">删除</button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    setStatus(index) {
      this.$emit('changeStatus', index);
    },
    del(index) {
      if (this.sure()) {
        this.$emit('delStatus', index);
      }
    },
    sure() {
      return window.confirm('确认删除吗？');
    }
  },
};
</script>

<style scoped>
  .item{
    text-align: left;
    padding: 10px 0;
  }
  .done{
    text-decoration: line-through;
  }
</style>

