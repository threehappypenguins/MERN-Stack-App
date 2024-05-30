import { useEffect } from "react"
import { useUsersContext } from "../hooks/useUsersContext"

// Components
import UserDetails from '../components/UserDetails'
import UserForm from '../components/UserForm'

const Users = () => {
  const {users, dispatch} = useUsersContext()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users')
      const json = await response.json()

      if(response.ok) {
        dispatch({type: 'SET_USERS', payload: json})
      }
    }

    fetchUsers()
  }, [dispatch])

  return (
    <div className="home">
      <div className="users">
        {users && users.map((user) => (
          <UserDetails key={users._id} user={user} />
        ))}
      </div>
      <UserForm />
    </div>
  )
}

export default Users