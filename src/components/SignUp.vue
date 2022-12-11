<template>
  <div class="container">

    <div class="header">
      <div class="header-description">
        <h3 class="header-title">Register to ToDo App</h3>
        <p class="header-subtitle">Start organizing your tasks!</p>
      </div>
    </div>

    <form @submit.prevent="signUp" class="max-w-500 rounded-lg bg-white p-10 shadow-xl">
      <div class="form">
     
          <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Email:</label><br />
          <input
            type="email"
            class="form-input focus:shadow-outline-blue block w-full rounded-md rounded-md border border-gray-300 py-2 px-3 leading-5 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5" 
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
   
          <label class="block text-sm font-medium leading-5 text-gray-700">Password</label>
          <input
            type="password"
            class="form-input focus:shadow-outline-blue block w-full rounded-md rounded-md border border-gray-300 py-2 px-3 leading-5 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5" 
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
      

          <label class="block text-sm font-medium leading-5 text-gray-700">Confirm password</label>
          <input 
            type="password"
            class="form-input focus:shadow-outline-blue block w-full rounded-md rounded-md border border-gray-300 py-2 px-3 leading-5 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
            placeholder="**********"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
  
        <button class="button" type="submit">Sign Up</button>
        <p>
          Have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </form>

    <div v-show="errorMsg">{{errorMsg}}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style></style>
