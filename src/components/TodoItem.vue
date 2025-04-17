<script setup lang="ts">
    import { Todo } from '@/App.vue';
import InputField from './InputField.vue';

    const { todo, todosToEdit, handleDeleteTodo, handleEditTodo, handleEditToggle} = defineProps<{
        todo: Todo;
        todosToEdit: {};
        handleDeleteTodo: (id: number) => void;
        handleEditTodo: (id: number) => void;
        handleEditToggle: (id: number) => void;
    }>();

    const handleKeyDown = (event: KeyboardEvent): void => {
        if(event.key === 'Enter') {
            handleEditTodo(todo.id);
        }
    } 
</script>

<template>
    <div class="todo-item">
        <input v-if="!todo.editable" v-model="todo.completed" type="checkbox" />
        <p v-if="!todo.editable" class="todo-title" :class="todo.completed ? 'complete' : ''">{{ todo.title }}</p>
        <div v-if="todo.editable" class="editable-view">
            <InputField
                type="text"
                v-model="todosToEdit[todo.id]"
                :placeholder="todo.title"
                :onKeyDown="handleKeyDown"
            />
            <div class="done" @click="handleEditTodo(todo.id)">☑️</div>
        </div>

        <div v-if="!todo.editable" class="actions-container">
            <div title="edit" class="edit" @click="handleEditToggle(todo.id)">🖊️</div>
            <div title="delete" class="delete" @click="handleDeleteTodo(todo.id)">🗑️</div>
        </div>
    </div>
</template>

<style scoped>
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
</style>
