<template>
  <nav
    class="navbar px-16 w-full flex justify-between items-center bg-blue-500 text-white h-16"
  >
    <div class="flex gap-10">
      <router-link to="/" class="router-link font-semibold">Task Manager</router-link>
      <router-link to="/account" class="router-link font-semibold">Your Account</router-link>
    </div>
    <div class="flex items-center gap-20">
      <p class="flex gap-4" v-if="useUserStore().user">
        <span> Welcome</span>
        <span class="font-bold">{{ useUserStore().user.email }}</span>
      </p>
      <button @click="signOut" class="button button-log-out">
        <span class="mb-1">Logout</span>
      </button>
    </div>
    <!-- Aplication hamburguer -->
    <!-- <button @click="toggle" class="toggle"> </button>
      <div v-show="changeBoolean" class="hamburger">
        <ul>
        <li>
          <router-link to="/" class="router-link-mobile">Task Manager</router-link>
        </li>

        <li>
          <router-link to="/account" class="router-link-mobile">Your Account</router-link>
        </li>
        <li>
          <button @click="signOut" class="button-log-out-mobile">Log out</button>
        </li>
        </ul>
      </div>
   -->
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed, readonly } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    await useUserStore().signOut();
    redirect.push({ path: "/auth/login" });
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  return;
  errorMsg.value = "error";
};

//Logica para el Hamburguer
const changeBoolean = ref(false);
const toggle = () => {
  changeBoolean.value = !changeBoolean.value;
};
</script>

<style>
/* .navbar-img {
  width: 190px;
} */
</style>
