<template>
  <section name="game" :key="game.seed">
    <el-row>
      <!-- <el-col class="text-center" :span="8">
        <div v-for="(line, x) in game.cells" :key="`${x}`">
          <span v-for="(cell, y) in line" :key="`${x}-${y}`" class="cell">
            <el-button
              class="mono rounded-none text-center"
              :type="cell.btnType"
              @contextmenu.prevent="game.rightClick(x, y)"
              :disabled="game.gameOver"
              plain
            >
              <span :class="[cell.class, 'm-0 cell']">
                {{ cell.number }}
              </span>
            </el-button>
          </span>
        </div>
      </el-col> -->
      <el-col class="text-center" :span="8">
        <div v-for="(line, x) in game.cells" :key="`${x}`">
          <span v-for="(cell, y) in line" :key="`${x}-${y}`" class="cell">
            <el-button
              @click="game.leftClick(x, y)"
              @contextmenu.prevent="game.rightClick(x, y)"
              class="mono rounded-none text-center"
              :type="cell.btnType"
              :disabled="game.gameOver"
              plain
            >
              <span :class="[cell.class, 'm-0 cell']">
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

          <el-form-item>
            <el-input-number v-model="x" />
            <el-input-number v-model="y" />
            <el-button @click="genNumb">G</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "@vue/runtime-core";

import { IGame, Game } from "@/model/game";
import Cell from "@/model/cell";

export default defineComponent({
  setup() {
    const debug = ref(true);
    const game = reactive(new Game(9, 9, 10));
    game.start();
    const x = ref<number>(0);
    const y = ref<number>(0);

    const genNumb = () => {
      console.log(x.value, y.value);
      game.placeBomb(game.cord(x.value, y.value));
    };

    return { debug, game, x, y, genNumb };
  },
});
</script>

<style>
.mono {
  font-family: "Courier New", Courier, monospace;
  width: 50px;
  height: 50px;
}
.cell {
  /* width: 14px; */
  /* height: 14px; */
  line-height: 1;
}
</style>
