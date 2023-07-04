import * as React from 'react'
import { useUserList, useUserCreate, useUserDelete } from '../../hooks/useUser'

export default function UserList() {
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useUserList({ refetchOnWindowFocus: false })
  const { mutate: createUser } = useUserCreate({ onSuccess: () => refetch() })
  const { mutate: deleteUser } = useUserDelete({ onSuccess: () => refetch() })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement & {
      username: { value: string }
    }

    const newUser = { name: target.username.value }
    createUser(newUser)
    target.reset()
  }

  if (isLoading) return <span>Loading...</span>
  if (isError) throw new Error(error.message)

  return (
    <>
      <section>
        <h1>User List</h1>
        <form onSubmit={handleSubmit}>
          <label>
            username: <input type="text" name="username" />
          </label>
          <button type="submit">Create User</button>
        </form>

        <ul>
          {users.map(({ id, name }) => (
            <li key={id}>
              {name}{' '}
              <button type="button" onClick={() => deleteUser({ id, name })}>
                x
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
