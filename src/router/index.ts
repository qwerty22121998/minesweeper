import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "index",
    path: "/",
    component: () => import("@/pages/Index.vue"),
    meta: {
      layout: "Default",
    },
  },
];

export default routes;
