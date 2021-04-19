<template>
  <section name="game">
    <el-row>
      <el-col> </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <GameScreen v-model="game" />
      </el-col>
      <el-col :span="12">
        <el-form>
          <el-form-item>
            Size:
            <el-input-number size="mini" v-model="setting.width" />
            <el-input-number size="mini" v-model="setting.height" />
          </el-form-item>
          <el-form-item>
            <el-input-number size="mini" v-model="setting.numberOfMine" />
          </el-form-item>
          <el-form-item>
            <el-button @click="game.start(setting)">Start</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "@vue/runtime-core";
import { GameService, GameSetting } from "@/logic/service/game.service";
import SquareService from "@/logic/service/square.service";

import GameScreen from "@/pages/Game/GameScreen.vue";

export default defineComponent({
  components: {
    GameScreen,
  },

  setup() {
    const game = reactive<GameService>(new GameService());
    game.start({
      width: 3,
      height: 3,
      numberOfMine: 3,
    });
    const setting = reactive<GameSetting>({ ...game.setting });

    return {
      game,
      console,
      setting,
      SquareService,
    };
  },
});
</script>

<style>
.square {
  font-family: "Courier New", Courier, monospace;
  width: 50px;
  height: 50px;
}
</style>
