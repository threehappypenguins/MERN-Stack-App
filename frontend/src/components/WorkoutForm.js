import { useState, useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [userId, setUserId] = useState('')
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, load, reps, userId}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setUserId('')
      setError(null)
      setEmptyFields([])
      console.log('New workout added', json)
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      
      <label>Exercise Title:</label>
      <input
        type="text" 
        onChange={(e => setTitle(e.target.value))}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input
        type="number" 
        onChange={(e => setLoad(e.target.value))}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input
        type="number" 
        onChange={(e => setReps(e.target.value))}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <label>User:</label>
      <select onChange={(e) => setUserId(e.target.value)} value={userId}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm