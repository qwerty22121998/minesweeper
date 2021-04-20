<template>
  <section name="game">
    <el-row>
      <el-col class="text-center" :span="8">
        <div v-for="(line, x) in game.cells" :key="`${x}`">
          <span v-for="(cell, y) in line" :key="`${x}-${y}`" class="cell">
            <el-button
              class="mono rounded-none text-center"
              :type="cellService.GetButtonType(cell)"
              :disabled="game.gameOver"
              plain
            >
              <span :class="[cellService.GetTextColor(cell), 'm-0 cell']">{{
                cell.isMine ? "💣" : cell.nMine
              }}</span>
            </el-button>
          </span>
        </div>
      </el-col>
      <el-col class="text-center" :span="8">
        <div v-for="(line, x) in game.cells" :key="`${x}`">
          <span v-for="(cell, y) in line" :key="`${x}-${y}`" class="cell">
            <el-button
              class="mono rounded-none text-center"
              :type="cellService.GetButtonType(cell)"
              :disabled="game.gameOver"
              plain
            >
              <span :class="[cellService.GetTextColor(cell), 'm-0 cell']">{{
                cellService.GetDisplayString(cell)
              }}</span>
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
            <!-- <el-button type="success" @click="game.start()">Start</el-button> -->
          </el-form-item>

          <el-form-item>
            <!-- <el-button type="danger" @click="game.reveal()">Reveal</el-button> -->
          </el-form-item>

          <el-form-item>
            <el-input-number v-model="x" />
            <el-input-number v-model="y" />
            <!-- <el-button @click="genNumb">G</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "@vue/runtime-core";

import { GameService } from "@/logic/service/game.service";
import { CellService } from "@/logic/service/cell.service";

export default defineComponent({
  setup() {
    const debug = ref(false);
    const game = reactive(new GameService(9, 9, 10));
    game.start();
    const x = ref<number>(0);
    const y = ref<number>(0);
    const cellService: CellService = new CellService();

    return { debug, game, x, y, cellService };
  },
});
</script>

<style>
.mono {
  font-family: "Courier New", Courier, monospace;
  width: 50px;
  height: 50px;
}
</style>
