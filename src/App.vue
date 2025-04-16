<script setup lang="ts">
  import { ref, computed } from 'vue';

  import Button from './components/Button.vue';
  import InputField from './components/InputField.vue';

  interface Todo {
    id: number;
    title: string;
    completed: boolean;
    editable: boolean;
  }

  const todos = ref<Todo[]>([]);
  const todosCount = computed<number>(() => todos.value.length);
  const todoInput = ref<string>('');
  const id = ref<number>(0);
  const todosToEdit = ref({});

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
    todos.value = todos.value.filter((todo) => todo.id !== id);
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
    todos.value = todos.value.map((todo) => (
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
        v-model:todoInput="todoInput"
        placeholder="Add Todo.."
        type="text"
      />
      <Button class="button" @click="handleAddTodo">Add</Button>
    </div>
    <div v-if="todosCount" class="todo-list-container">
      <div v-for="todo in todos" :key="todo.id" class="todo-item">
        <input v-if="!todo.editable" v-model="todo.completed" type="checkbox" />
        <p v-if="!todo.editable" class="todo-title" :class="todo.completed ? 'complete' : ''">{{ todo.title }}</p>
        <div v-if="todo.editable" class="editable-view">
          <input type="text" v-model="todosToEdit[todo.id]" :placeholder="todo.title" />
          <div class="done" @click="handleEditTodo(todo.id)">☑️</div>
        </div>

        <div v-if="!todo.editable" class="actions-container">
          <div title="edit" class="edit" @click="handleEditToggle(todo.id)">🖊️</div>
          <div title="delete" class="delete" @click="handleDeleteTodo(todo.id)">🗑️</div>
        </div>
      </div>
    </div>
    <p v-else class="empty-list-message">No todos in the list!</p>
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

      .todo-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        input[type="checkbox"] {
        }

        .editable-view {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;

          input[type="text"] {
            width: 100%;
            border-radius: 10px;
            border: 1px solid #ccc;
            width: 100%;
            padding: 10px;
  
            &:focus {
              outline: none;
            }
          }

          .done {
            cursor: pointer;
          }
        }


        .todo-title {
          width: 100%;

          &.complete {
            text-decoration: line-through;
          }
        }

        .actions-container {
          display: flex;
          align-items: center;
          gap: 5px;

          .edit, .delete {
            cursor: pointer;
            font-size: 14px;
          }
        }
      }
    }

    .empty-list-message {
      text-align: center;
    }
  }
</style>
