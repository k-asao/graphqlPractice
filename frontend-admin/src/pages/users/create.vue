<template>
  <div>
    <div>ユーザー登録</div>
    <v-row>
      <v-col cols="12" md="2">名前</v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="userInput.name"
          placeholder="名前"
          label="名前"
          hide-details="true"
          outlined
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="2">年齢</v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="userInput.age"
          placeholder="年齢"
          label="年齢"
          hide-details="true"
          outlined
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-btn :loading="loading" @click="create()"> 作成 </v-btn>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { logger } from '~/utils/logger'
export default Vue.extend({
  data() {
    return {
      userInput: {
        name: '',
        age: 0 as number,
      },
      loading: false,
    }
  },
  methods: {
    async create() {
      try {
        this.loading = true
        await this.$accessor.users.createUser({
          name: this.userInput.name,
          age: Number(this.userInput.age),
        })
        this.$router.push('/users')
      } catch (err) {
        logger.info(err)
        throw logger
      } finally {
        this.loading = false
      }
    },
  },
})
</script>
