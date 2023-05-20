import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";

const ManageUsersPage = () => {

  const { users, setUsers, UsersAcionTypes } = useContext(UsersContext);
  
  return (
    <main>
      {
        users.map(user => 
          user.role === 'user' &&
          <div
            key={user.id}
            style={{
              border: '1px solid black',
              display: 'flex',
              gap: '10px'
            }}
          >
            <img
              style={{ width:'30px', height:'30px' }}
              src={user.avatarURL}
              alt="user avatar"
            />
            <p>{user.userName}</p>
            <button
              onClick={() => setUsers({
                type: UsersAcionTypes.changeStatus,
                id: user.id
              })}
            >
              {
                user.isBlocked ? 'Unblock' : 'Block'
              }
            </button>
          </div>  
        )
      }
    </main>
  );
}
 
export default ManageUsersPage;