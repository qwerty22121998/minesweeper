import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "game",
    path: "/game",
    component: () => import("@/pages/Game/Game.vue"),
    meta: {
      layout: "Default",
    },
  },
];

export default routes;
