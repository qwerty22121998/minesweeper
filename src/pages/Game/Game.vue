<template>
  <section name="game" :key="game.seed">
    <el-row>
      <el-col class="text-center" :span="16">
        <div v-for="(line, x) in game.field" :key="`${x}`">
          <span v-for="(cell, y) in line" :key="`${x}-${y}`">
            <el-button
              @click="game.trigger(x, y)"
              class="mono rounded-none"
              :type="cell.btnType"
              plain
              :disabled="game.gameOver"
            >
              <span :class="cell.class">
                {{ cell.display() }}
              </span>
            </el-button>
          </span>
        </div>
      </el-col>
      <el-col :span="8">
        <el-form>
          <el-form-item>
            Bomb:
            <el-input-number
              label="bomb"
              v-model="game.numberOfBomb"
              controls-position="right"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="game.start()">Start</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="danger" @click="game.reveal()">Reveal</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "@vue/runtime-core";

import { Game } from "@/model/game";
import Cell from "@/model/cell";

export default defineComponent({
  setup() {
    const game: Game = reactive(new Game(9, 9, 10));
    game.start();

    return { game };
  },
});
</script>

<style>
.mono {
  font-family: "Courier New", Courier, monospace;
}
</style>
