import { z } from 'zod'
import { randomUUID } from 'crypto'

import { router, publicProcedure } from '../trpc'
import { users } from './db'

export const userRouter = router({
  list: publicProcedure.query(() => {
    return users
  }),

  byId: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts
    const foundUser = users.find((user) => user.id === input)
    if (foundUser) return foundUser
    throw new Error(`User of {id:'${input}'} not found`)
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().trim().min(1, 'Name should be filled in'),
      })
    )
    .mutation((opts) => {
      const { input } = opts
      const newUser = {
        ...input,
        id: randomUUID(),
      }
      users.push(newUser)
      return users.at(-1)
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().trim().min(1, 'Name should be filled in'),
      })
    )
    .mutation((opts) => {
      const {
        input: { id, name },
      } = opts
      const userToUpdate = users.find((user) => user.id === id)
      if (userToUpdate) {
        Object.assign(userToUpdate, { id, name })
        return userToUpdate
      }
      throw new Error(`User of {id:'${id}'} not found`)
    }),

  delete: publicProcedure
    .input(
      z
        .object({
          id: z.string(),
          name: z.string(),
        })
        .partial()
        .refine(
          (input) => !!input.id || !!input.name,
          'Either id or name should be filled in.'
        )
    )
    .mutation((opts) => {
      const {
        input: { id, name },
      } = opts
      const indexToDelete = users.findIndex(
        (user) => user.id === id || user.name === name
      )
      if (indexToDelete !== -1) {
        return users.splice(indexToDelete, 1)
      }
      throw new Error(
        `User of ${id ? `{id: '${id}'}` : `{name: '${name}'}`} not found`
      )
    }),
})
