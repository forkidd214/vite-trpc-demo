import { trpc, type ReactQueryOptions, type RouterInputs } from '../lib/trpc'

type UserOptions<T extends keyof ReactQueryOptions['user']> =
  ReactQueryOptions['user'][T]
type UserInputs<T extends keyof RouterInputs['user']> = RouterInputs['user'][T]

const useUserList = (opts?: UserOptions<'list'>) =>
  trpc.user.list.useQuery(undefined, opts)

const useUserById = (input: UserInputs<'byId'>, opts?: UserOptions<'byId'>) =>
  trpc.user.byId.useQuery(input, opts)

const useUserCreate = (opts?: UserOptions<'create'>) =>
  trpc.user.create.useMutation(opts)

const useUserUpdate = (opts?: UserOptions<'update'>) =>
  trpc.user.update.useMutation(opts)

const useUserDelete = (opts?: UserOptions<'delete'>) =>
  trpc.user.delete.useMutation(opts)

export { useUserList, useUserById, useUserCreate, useUserUpdate, useUserDelete }
