<template>
  <div>
    <input type="text" class="input" placeholder="添加事项" v-model="todo" @keyup.enter="addTodo">
    <button type="button" name="button" @click="addTodo">
      添加
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoAdd',
  data() {
    return {
      todo: '',
    };
  },
  methods: {
    addTodo() {
      if (this.todo) {
        this.$emit('add', this.todo);
        this.todo = '';
      } else {
        alert('内容不能为空');
      }
    },
  },
};
</script>

<style scoped>
  input {
  min-width: 300px;
  padding: 5px;
}
</style>

