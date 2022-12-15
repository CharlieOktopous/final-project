<template>
  <nav class="navbar w-full">
    <div
      class="desktop-menu w-full flex justify-between items-center text-white h-16"
    >
      <div class="flex gap-10">
        <router-link to="/" class="router-link font-semibold"
          >Task Manager</router-link
        >
        <router-link to="/account" class="router-link font-semibold"
          >Your Account</router-link
        >
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
    </div>

    <div class="burger-menu">
      <div class="hamburger-icon" @click="actionShowBurger">
        <svg
          class="h-8 w-8 midnight-blue"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </div>
      <div class="mobile-navbar" v-show="showBurger">
        <div class="mobile-link">
          <router-link to="/">Task Manager</router-link>
        </div>

        <div class="mobile-link">
          <router-link to="/account">Your Account</router-link>
        </div>

        <div class="mobile-logout">
          <button @click="signOut" class="font-bold">
            Log out
          </button>
        </div>
      </div>
    </div>
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

const showBurger = ref(false);
const actionShowBurger = () => {
  showBurger.value = !showBurger.value;
};

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
