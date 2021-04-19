<template>
  <section name="screen">
    <div v-for="(_, x) in modelValue.setting.width" :key="x">
      <span v-for="(_, y) in modelValue.setting.height" :key="`${x}-${y}`">
        <el-button>
          {{ modelValue.get({ x, y })?.nMine }}
        </el-button>
      </span>
    </div>
  </section>
</template>
<script lang="ts">
import { GameService } from "@/logic/service/game.service";
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<GameService>,
      required: true,
    },
  },

  setup(props) {},
});
</script>
