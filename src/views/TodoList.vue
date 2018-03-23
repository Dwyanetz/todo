<template>
  <section>
    <h1>Todo List</h1>
    <todo-add></todo-add>
    <div class="todos">
      <TodoItem v-if="data" v-for="(item, index) in data" :key="index"></TodoItem>
    </div>
  </section>
</template>

<script>
import TodoAdd from '@/components/TodoAdd';
import TodoItem from '@/components/TodoItem';

export default {
  name: 'TodoList',
  data() {
    return {
      data: null,
    };
  },
  created() {
    const data = localStorage.getItem('todoData');
    this.data = data ? JSON.parse(data) : null;
  },
  methods: {
    addTodo() {
    },
  },
  components: {
    TodoAdd,
    TodoItem,
  },
};
</script>

<style scoped>
.todos{
  background: #e5e5e5;
}
</style>
