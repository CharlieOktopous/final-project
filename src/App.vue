<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.js";
import { ref } from "vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

//When the app starts/mounts this function is called
onMounted(async () => {
  const appReady = ref(null);
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not logged in / doesn't have a session in the localStorage
      appReady.value = true;
      router.push({ path: "/auth/login" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<style>

</style>
