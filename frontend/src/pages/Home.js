import { useEffect, useState }from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// Components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    fetchWorkouts()
  }, [dispatch])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users')
      const json = await response.json()
      if (response.ok) {
        setUsers(json)
      }
    }
    fetchUsers()
  }, [])

  const filteredWorkouts = selectedUser
  ? workouts.filter((workout) => workout.userId === selectedUser)
  : workouts

  return (
    <div className="home">
      <div className="filter-dropdown">
        <label>Filter by User:</label>
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="workouts">
        {filteredWorkouts && filteredWorkouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home