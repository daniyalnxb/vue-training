<script setup lang="ts">
  import { ref, computed } from 'vue';
  
    import Button from './components/Button.vue';
    import InputField from './components/InputField.vue';
    import TodoItem from './components/TodoItem.vue';

  export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    editable: boolean;
  }

  const todos = ref<Todo[]>([]);
  const todosCount = computed<number>(() => todos.value.length);
  const activeTodosCount = computed<number>(() => todos.value.filter((todo: Todo) => todo.completed === false)?.length);
  const todoInput = ref<string>('');
  const id = ref<number>(0);
  const todosToEdit = ref<Record<number, string>>({});
  const filter = ref<string>('all');
  const filteredTodos = computed<Todo[]>(() => {
    if(filter.value === 'completed') {
      return todos.value.filter((todo: Todo) => todo.completed === true);
    } else if(filter.value === 'active') {
      return todos.value.filter((todo: Todo) => todo.completed === false);
    } else {
      return todos.value
    }
  });
  const clearCompletedTodos = () => todos.value = todos.value.filter((todo: Todo) => !todo.completed);

  const handleAddTodo = () => {
    if(todoInput.value.trim() === '') {
      alert('Please enter a todo first!');
      return;
    }
    const newTodo: Todo = {
      id: id.value++,
      title: todoInput.value,
      completed: false,
      editable: false,
    };
    todos.value.push(newTodo);
    todoInput.value = '';
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if(event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (id: number) => {
    todos.value = todos.value.filter((todo: Todo) => todo.id !== id);
  };

  const handleEditToggle = (id: number) => {
    todos.value.forEach((todo) => {
      if(todo.id === id) {
        todosToEdit.value[id] = todo.title;
        todo.editable = !todo.editable;
      }
    })
  };

  const handleEditTodo = (id: number) => {
    todos.value = todos.value.map((todo: Todo) => (
      todo.id === id ? { ...todo, title: todosToEdit.value[id]} :
      todo
    ));
    handleEditToggle(id);
  }
  
</script>

<template>
  <div class="todo-application">
    <h1>Todo App</h1>
    <div class="todo-input-container">
      <InputField
        :onKeyDown="handleKeyDown"
        v-model="todoInput"
        placeholder="Add Todo.."
        type="text"
      />
      <Button class="button" @click="handleAddTodo">Add</Button>
    </div>
    <div v-if="todosCount" class="todo-list-container">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        :todosToEdit="todosToEdit"
        :handleDeleteTodo="handleDeleteTodo"
        :handleEditTodo="handleEditTodo"
        :handleEditToggle="handleEditToggle"
      />
    </div>
    <p v-else class="empty-list-message">No todos in the list!</p>
    <div v-if="todosCount" class="todo-list-actions-bar">
      <p class="completed-count">{{ activeTodosCount }} {{ activeTodosCount < 2 ? 'item' : 'items' }} left</p>
      <div class="main-actions">
        <p :class="filter === 'all' ? 'active' : ''" @click="() => filter = 'all'">All</p>
        <p :class="filter === 'active' ? 'active' : ''" @click="() => filter = 'active'">Active</p>
        <p :class="filter === 'completed' ? 'active' : ''" @click="() => filter = 'completed'">Completed</p>
      </div>
      <p class="clear-completed" @click="clearCompletedTodos">Clear Completed</p>
    </div>
  </div>
</template>

<style scoped>
  .todo-application {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;

    h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .todo-input-container {
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 50%;
      margin-inline: auto;
      margin-bottom: 20px;
    }

    .todo-list-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 50%;
      margin-inline: auto;
      height: calc(100dvh - 240px);
      overflow-y: auto;
      scrollbar-width: thin;
    }

    .todo-list-actions-bar {
      max-width: 50%;
      margin-inline: auto;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        cursor: pointer;
        font-weight: 500;

        &.active {
          color: #007bff;
        }
      }

      .completed-count {
        cursor: default;
      }

      .main-actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    .empty-list-message {
      text-align: center;
    }
  }
</style>
