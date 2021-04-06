import { createRouter, createWebHistory } from "vue-router";

import Index from "@/router/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [...Index],
});

export default router;
