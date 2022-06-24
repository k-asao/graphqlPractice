import { getAccessorType } from 'typed-vuex'
import * as users from './users'
// これらは型推論に必要のため、空でも定義しておく
export const state = () => ({})
export const getters = {}
export const mutations = {}
export const actions = {}

const modules = {
  users,
}

export const storeKeys = Object.keys(modules)
export const persistedKeys = []

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules,
})
