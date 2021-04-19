<template>
  <section name="screen">
    <div v-for="(_, x) in modelValue.setting.width" :key="x">
      <span v-for="(_, y) in modelValue.setting.height" :key="`${x}-${y}`">
        <el-button>
          {{ modelValue.get({ x, y })?.square.nMineDisplay }}
        </el-button>
      </span>
    </div>
  </section>
</template>
<script lang="ts">
import { IGameService } from "@/logic/service/game.service";
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<IGameService>,
      required: true,
    },
  },

  setup(props) {},
});
</script>
