import { useState } from 'react'
import { useUsersContext } from '../hooks/useUsersContext'

const UserForm = () => {
  const { dispatch } = useUsersContext()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {name, email, password, dateOfBirth}

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
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
      setName('')
      setEmail('')
      setPassword('')
      setDateOfBirth('')
      setError(null)
      setEmptyFields([])
      console.log('New user added', json)
      dispatch({type: 'CREATE_USER', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New User</h3>
      
      <label>Name:</label>
      <input
        type="text"
        onChange={(e => setName(e.target.value))}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />
      
      <label>Email:</label>
      <input
        type="email"
        onChange={(e => setEmail(e.target.value))}
        value={email}
        className={emptyFields.includes('email') ? 'error' : ''}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e => setPassword(e.target.value))}
        value={password}
        className={emptyFields.includes('password') ? 'error' : ''}
      />

      <label>Date of Birth:</label>
      <input
        type="date"
        onChange={(e => setDateOfBirth(e.target.value))}
        value={dateOfBirth}
        className={emptyFields.includes('dateOfBirth') ? 'error' : ''}
      />

      <button>Add User</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default UserForm