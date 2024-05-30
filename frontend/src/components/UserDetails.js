import { useUsersContext } from '../hooks/useUsersContext'

// date fns
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

const UserDetails = ({ user }) => {
  const { dispatch } = useUsersContext()

  const handleClick = async () => {
    const response = await fetch('/api/users/' + user._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_USER', payload: json})
    }
  }

  return (
    <div className="user-details">
      <h4>{user.name}</h4>
      <p><strong>Email: </strong>{user.email}</p>
      <p><strong>Date of Birth: </strong>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
      <p>{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default UserDetails