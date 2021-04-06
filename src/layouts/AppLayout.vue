<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts">
import { DefineComponent, defineComponent, markRaw, watch } from "vue";

import Default from "@/layouts/Default.vue";
import { RouteMeta, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const layout: DefineComponent = markRaw(Default);
    const route = useRoute();

    watch(
      () => route.meta,
      async (meta: RouteMeta) => {
        try {
          // @vite-ignore
          const component = await import(`@/layouts/${meta.layout}.vue`);
          layout.value = component?.default || Default;
        } catch (e) {
          layout.value = Default;
        }
      }
    );

    return { layout };
  },
});
</script>

<style></style>
