<template>
  <el-container>
    <el-aside collapsible> </el-aside>
    <el-container>
      <el-header></el-header>
      <el-main> <slot /> </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({});
</script>

<style></style>
