<template>
  <section name="screen">
    <div v-for="(_, x) in value.setting.width" :key="x">
      <span v-for="(_, y) in value.setting.height" :key="`${x}-${y}`">
        <el-button>
          {{ value.get({ x, y })?.square.nMineDisplay }}
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
    value: {
      type: Object as PropType<GameService>,
      required: true,
    },
  },

  setup(props) {},
});
</script>
