import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type CreateSampleInput = {
  id: Scalars['String']
}

export type CreateUserInput = {
  name: Scalars['String']
  age: Scalars['Float']
}

export type Mutation = {
  createUser: User
  createSample: Sample
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationCreateSampleArgs = {
  input: CreateSampleInput
}

export type Query = {
  users: Array<User>
  sample: Sample
}

export type Sample = {
  id: Scalars['String']
}

export type User = {
  id: Scalars['String']
  name: Scalars['String']
  age: Scalars['Float']
}

export type UsersAttributeFragment = Pick<User, 'id' | 'name' | 'age'>

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput
}>

export type CreateUserMutation = { createUser: UsersAttributeFragment }

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = { users: Array<UsersAttributeFragment> }

export const UsersAttributeFragmentDoc = gql`
  fragment UsersAttribute on User {
    id
    name
    age
  }
`
export const CreateUserDocument = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UsersAttribute
    }
  }
  ${UsersAttributeFragmentDoc}
`
export const UsersDocument = gql`
  query users {
    users {
      ...UsersAttribute
    }
  }
  ${UsersAttributeFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    createUser(
      variables: CreateUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUserMutation>(CreateUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createUser'
      )
    },
    users(
      variables?: UsersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<UsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UsersQuery>(UsersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'users'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
