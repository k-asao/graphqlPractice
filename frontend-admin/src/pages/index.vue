<template>
  <v-btn @click="clicked()"> ユーザー一覧 </v-btn>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    clicked() {
      this.$router.push('/users')
    },
  },
})
</script>
