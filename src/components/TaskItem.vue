<template>
  <div
    :class="{ 'task-completed': isComplete }"
    class="card rounded overflow-hidden flex flex-col"
  >
    <div class="px-6 py-4">
      <h3 class="font-bold text-xl mb-2">{{ task.title }}</h3>
      <p class="text-gray-700 text-base">
        {{ task.description }}
      </p>
    </div>
    <div class="flex justify-around px-6 pt-4 pb-2">
      <button @click="deleteTask">
        <svg
          class="h-8 w-8 midnight-blue"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
      <button @click="editTaskFunction">
        <svg
          class="h-8 w-8 midnight-blue"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      </button>
      <button @click="toggleTaskDone">
        <svg
          v-show="isComplete"
          class="h-8 w-8 midnight-blue"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        <svg
          v-show="!isComplete"
          class="h-8 w-8 midnight-blue"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        </svg>
      </button>
    </div>
    <div class="px-8" v-if="showErrorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>
    <div v-show="editTask" class="flex flex-col gap-4 p-8">
      <div class="input-field">
        <input
          class="input-edit input w-full"
          type="text"
          placeholder="Edit Title"
          v-model="title"
        />
      </div>
      <div class="input-field">
        <textarea
          class="input-edit input w-full"
          type="text"
          placeholder="Edit Description"
          v-model="description"
        />
      </div>

      <button
        @click="changeTask"
        class="button-change button font-bold add-task-button"
      >
        Change
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
// import { supabase } from '../supabase';

const taskStore = useTaskStore();
const showErrorMessage = ref(false);
const errorMessage = ref(null);

const props = defineProps({
  task: Object,
});

const isComplete = ref(props.task.is_complete);
console.log("is_complete", isComplete);

const toggleTaskDone = async () => {
  taskStore.toggleTaskDone(props.task.id);
  isComplete.value = !isComplete.value;
};

const editTask = ref(false);
const editTaskFunction = () => {
  editTask.value = !editTask.value;
};

const title = ref();
const description = ref();
const changeTask = async () => {
  if (title.value.length <= 3 || description.value.length === 0) {
    // Primero comprobamos que ning??n campo del input est?? vac??o y lanzamos el error con un timeout para informar al user.
    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is too short";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
    return;
  }
  editTaskFunction();
  await taskStore.editTask(props.task.id, {
    title: title.value,
    description: description.value,
  });
};
// Funci??n para borrar la tarea a trav??s de la store. El problema que tendremos aqu?? (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se ver??n reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ning??n page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
};
</script>

<style></style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
