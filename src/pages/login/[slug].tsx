import router, { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import Login from "../../components/Login";
import api from "../../services/api";

const loginType = ({ slug }) => {
  const [credentials, setCredentials] = useState({});
  const [message, setMessage] = useState<string>("");
  const [register, setResgister] = useState<boolean>(false);
  const getInputData = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setCredentials((credentials) => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handeleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (slug === "candidate") {
      await api
        .post("authcandidate", credentials)
        .then((success) => {
          const { permissions } = success.data;
          sessionStorage.setItem("permissions", JSON.stringify(permissions));
          api
            .get(`candidate/${permissions.user}`, {
              headers: {
                Authorization: "Bearer " + permissions.token,
                userid: permissions.user,
              },
            })
            .then((success) => {
              const { data } = success;
              console.log(success.data);

              if (data[0] === null) {
                setMessage(
                  "por favor complete seu perfil para poder ver vagas "
                );
                setTimeout(() => {
                  router.push(`/user/profile/create/${permissions.user}`);
                }, 3000);
              } else {
                router.push(`/`);
              }
            });
        })

        .catch(function (error) {
          if (error.response) {
            const { err } = error.response.data;
            setMessage(err);
          }
          sessionStorage.removeItem("permissions");
        });
    }
    if (slug === "recruiter") {
      await api
        .post("authrecruiter", credentials)
        .then((success) => {
          const { permissions } = success.data;
          sessionStorage.setItem("permissions", JSON.stringify(permissions));
          api
            .get(`corporate/${permissions.user}`, {
              headers: {
                Authorization: "Bearer " + permissions.token,
              },
            })
            .then((success) => {
              const { data } = success;
              console.log(success.data);

              if (data[0] === null) {
                setMessage(
                  "por favor complete seu perfil para poder publicar vagas"
                );
                setTimeout(() => {
                  router.push("/");
                }, 3000);
              } else {
                router.push("/");
              }
            });
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response);
            const { err } = error.response.data;
            setMessage(err);
          }
        });
    }
  };

  const handleCreateRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (slug === "candidate") {
      await api
        .post("candidate", credentials)
        .then((success) => {
          const { data } = success;
          setMessage(data.message);
          setTimeout(() => {
            handeleLogin(e);
          }, 2000);
        })

        .catch(function (error) {
          if (error.response) {
            const { err } = error.response.data;
            setMessage(err);
            setTimeout(() => {
              setMessage("");
            }, 2000);
          }
        });
    }
    if (slug === "recruiter") {
      await api
        .post("recruiter", credentials)
        .then((success) => {
          const { data } = success;
          setMessage(data.message);
          setTimeout(() => {
            handeleLogin(e);
          }, 2000);
        })

        .catch(function (error) {
          if (error.response) {
            const { err } = error.response.data;
            setMessage(err);
            setTimeout(() => {
              setMessage("");
            }, 2000);
          }
        });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setResgister(!register);
  };
  return (
    <Login>
      <div className="form-container">
        {slug === "recruiter" ? (
          <div className="welcome">
            Olá {`Recrutador(a) ! `} <br />
            Preencha os campos abaixo e começe a recrutar talentos
          </div>
        ) : (
          <div className="welcome">
            Olá {`Candidato(a) ! `} <br />
            Preencha os campos abaixo e começe e encontre empresas
          </div>
        )}
        <div className="form-container-login">
          {register && (
            <>
              <fieldset>
                <legend>Username</legend>
                <input type="text" name="username" onChange={getInputData} />
              </fieldset>
            </>
          )}
          <fieldset>
            <legend>Email</legend>
            <input type="email" name="email" onChange={getInputData} />
          </fieldset>
          <fieldset>
            <legend>Senha</legend>
            <input type="password" name="password" onChange={getInputData} />
          </fieldset>
        </div>
        <div className="form-container-sign">
          <div className="register">
            não tem conta ? <button onClick={handleRegister}>Registre</button>
          </div>
          {register ? (
            <div className="enter">
              <button onClick={handleCreateRegister}>Registrar</button>
            </div>
          ) : (
            <div className="enter">
              <button onClick={handeleLogin}>entrar</button>
            </div>
          )}
        </div>
        {message}
      </div>
    </Login>
  );
};

export default loginType;
loginType.getInitialProps = ({ query: { slug } }) => {
  return { slug };
};
