<template>
  <div class="w-full">
    {{ cnt }}
    <a-button @click="up">Up</a-button>
    <a-input v-model="cnt.s" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/runtime-core";

class Tmp {
  cnt: number = 0;
  s: string = "";

  up() {
    console.log("up");
    this.cnt++;
  }
}

export default defineComponent({
  setup() {
    const cnt = reactive(new Tmp());
    const cnt2 = ref("0");

    const up = () => {
      cnt.cnt++;
      cnt2.value;
      cnt.s += "-";
    };

    return {
      cnt,
      cnt2,
      up,
    };
  },
});
</script>

<style></style>
