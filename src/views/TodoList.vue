<template>
  <section>
    <h1>Todo List</h1>
    <todo-add @add="addTodo"></todo-add>
    <div class="todos" v-show="todos.length">
      <TodoItem v-for="(item, index) in todos" :key="index" :item="item" :index="index" @changeStatus="changeArr" @delStatus="delArr"></TodoItem>
    </div>
    <p v-show="todos.length">
      共 <strong>{{ todos.length }}</strong> 个待办事项。
      {{ completedCounts }} 个已完成，{{ notCompletedCounts }} 个未完成。
    </p>
  </section>
</template>

<script>
import TodoAdd from '@/components/TodoAdd';
import TodoItem from '@/components/TodoItem';

export default {
  name: 'TodoList',
  data() {
    return {
      todos: [],
    };
  },
  computed: {
    completedCounts() {
      return this.todos.filter(item => item.isCompleted).length;
    },
    notCompletedCounts() {
      return this.todos.filter(item => !item.isCompleted).length;
    },
  },
  created() {
    const todos = localStorage.getItem('todoData');
    if (todos) {
      this.todos = JSON.parse(todos);
    }
  },
  methods: {
    addTodo(todo) {
      this.todos.push({
        text: todo,
        isCompleted: false,
      });
      localStorage.setItem('todoData', JSON.stringify(this.todos));
    },
    changeArr(index) {
      this.todos[index].isCompleted = !this.todos[index].isCompleted;
      localStorage.setItem('todoData', JSON.stringify(this.todos));
    },
    delArr(index) {
      this.todos.splice(index, 1);
      localStorage.setItem('todoData', JSON.stringify(this.todos));
    }
  },
  components: {
    TodoAdd,
    TodoItem,
  },
};
</script>

<style scoped>
section{
  width: 400px;
  margin: 20px auto;
  text-align: left;
}
.todos{
  margin-top: 20px;
}
</style>
