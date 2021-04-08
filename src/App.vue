<template>
  <div class="app">
    <app-layout>
      <router-view />
    </app-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "@/layouts/AppLayout.vue";

export default defineComponent({
  name: "App",
  components: { AppLayout },
});
</script>
