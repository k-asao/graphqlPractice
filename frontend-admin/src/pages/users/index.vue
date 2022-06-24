<template>
  <div v-if="users">
    <div>社員一覧</div>
    <v-data-table :headers="tableHeader" :items="users"> </v-data-table>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      tableHeader: [
        {
          text: '名前',
          value: 'name',
        },
        {
          text: '年齢',
          value: 'age',
        },
      ],
      users: [] as any,
    }
  },
  async fetch() {
    this.users = await this.$accessor.users.getUsers()
  },
})
</script>
