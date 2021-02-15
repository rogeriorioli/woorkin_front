import React, { MouseEvent, useState } from 'react';

// import { Container } from './styles';

interface UserLogin  {
    users : Array<{
    avatar : string;
    type : string
    id : number
  }>
}

const UserLogin = ({users }: UserLogin) => {
   const [checkUser , setCheckUser] = useState<boolean>(false)

  const selectedUser = () => {
    setCheckUser(!checkUser)
  }
  return (
      <>
        {users.map((user, index) => {
          return(
            <div key={user.id} tabIndex={user.id} className={`box-login-choose-user ${checkUser === true ? 'selected' : 'no-selected'}`} onClick={() => selectedUser()}>
              <div>
                <img src={user.avatar} alt={user.type}/>
                  {user.type}
              </div>
            </div>
          )
        })}
    </>
  );
}

export default UserLogin;