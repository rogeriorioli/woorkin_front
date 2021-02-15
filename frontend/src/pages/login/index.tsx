import React, { useState } from 'react';
import UserLogin from '../../components/UserLogin';
import Layouts from '../../Layouts'
import LoginContainer  from './styles';

const login  = () => {
  const [checkUser , setCheckUser] = useState<boolean>(false)

  const selectedUser = (id) => {
    setCheckUser(!checkUser)
  }
 const users = [
 {
   id : 0,
   type : 'Recruiter',
   avatar : 'static/images/login/recruiter.svg'
 },
 {
    id : 1,
   type : 'Candidate',
   avatar : 'static/images/login/dev.svg'
 }
]
 return(
    <Layouts>
      <div className="container">
          <LoginContainer >
              <div className="box-login">
                  <div className="box-login-title">
                      <h2>escolha seu tipo de conta </h2>
                  </div>
                  <div className="box-login-choose">
                    <UserLogin users={users} />
                  
                    </div>
              </div>
          </LoginContainer >
      </div>
    </Layouts>
  );
}

export default login;

