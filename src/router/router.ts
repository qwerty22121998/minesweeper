import { createRouter, createWebHistory } from "vue-router";

import Index from "@/router/index";
import Game from "@/router/game.route";

const router = createRouter({
  history: createWebHistory(),
  routes: [...Index, ...Game],
});

export default router;
