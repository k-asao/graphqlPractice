import { actionTree, getterTree, mutationTree } from 'typed-vuex'
import { getClient } from '~/graphql/client'
import { CreateUserInput, User } from '~/graphql/generated/types'

const defaultState = () => {
  return {
    _users: [] as User[],
  }
}

export const state = () => defaultState()

export const getters = getterTree(state, {
  users: (state) => state._users,
})

export const mutations = mutationTree(state, {
  setUsers(state, val) {
    state._users = val
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getUsers() {
      return await getClient()
        .users()
        .then((data) => data.users)
    },
    async createUser(_, input: CreateUserInput): Promise<User> {
      const user = await getClient()
        .createUser({ input })
        .then((data) => data.createUser)
      return user
    },
  }
)

export type RootState = ReturnType<typeof state>
