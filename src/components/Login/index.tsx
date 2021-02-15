import React from "react";
import UserLogin from "../../components/UserLogin";
import Layouts from "../../Layouts";
import LoginContainer from "./styles";

const Login = ({ children }) => {
  const users = [
    {
      type: "Recrutador",
      avatar: "/static/images/login/recruiter.svg",
      query: "recruiter",
      slug: "recruiter",
      id: Math.random(),
    },
    {
      type: "Candidato",
      avatar: "/static/images/login/dev.svg",
      query: "candidate",
      slug: "candidate",
      id: Math.random(),
    },
  ];

  return (
    <Layouts>
      <div className="container">
        <LoginContainer>
          <div className="box-login">
            <div className="box-login-title">
              <h2>escolha seu tipo de conta </h2>
            </div>
            <div className="box-login-choose">
              <UserLogin users={users} />
            </div>
          </div>
          {children}
        </LoginContainer>
      </div>
    </Layouts>
  );
};

export default Login;
