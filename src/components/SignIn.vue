<!-- COMPONENTE BOILERPLATE -->

<template>
  <div
    class="flex flex-col h-screen w-screen items-center justify-center bg-gray-200 align-middle"
  >
    <h2 class="mb-6 text-lg">Login</h2>
    <form
      @submit.prevent="signIn"
      class="max-w-500 rounded-lg bg-white p-10 shadow-xl flex flex-col gap-6"
    >
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-5 text-gray-700"
          >E-mail</label
        >
        <input
          type="email"
          class="form-input focus:shadow-outline-blue block w-full rounded-md border border-gray-300 py-2 px-3 leading-5 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
          placeholder="example@gmail.com"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div>
        <label
          for="password"
          class="block text-sm font-medium leading-5 text-gray-700"
          >Password</label
        >
        <input
          type="password"
          class="form-input focus:shadow-outline-blue block w-full rounded-md border border-gray-300 py-2 px-3 leading-5 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
          placeholder="**********"
          id="password"
          v-model="password"
          required
        />
      </div>
      <button
        class="focus:shadow-outline-indigo rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 focus:border-indigo-700 focus:outline-none active:bg-indigo-700"
        type="submit"
      >
        Sign In
      </button>
      <p>
        New member?
        <PersonalRouter
          :route="route"
          :buttonText="buttonText"
          class="text-blue-500 underline hover:text-blue-700 active:text-blue-800"
        />
      </p>
    </form>
    <div v-show="errorMsg">{{ errorMsg }}</div>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { ref, computed } from "vue";
const redirect = useRouter();

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/home" });
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  errorMsg.value = "error";
};
</script>

<style></style>
