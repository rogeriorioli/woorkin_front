import React, { useEffect, useState } from "react";
import UserArea from "../../../Layouts/UserArea";
import "suneditor/dist/css/suneditor.min.css";
import api from "../../../services/api";
import UploadCv from "../../../components/UploadCv";
import AddSkill from "../../../components/AddSkill";
import Card from "../../../components/Card";
import Notifications from "../../../components/Notifications";

const Resume = ({ id }) => {
  const [title, setTitle] = useState({});
  const [Userpermissions, setUserPermissions] = useState({});
  const [send, setSend] = useState<boolean>(false);
  const [notification, setNotification] = useState({
    message: "",
    background: "red",
    then: false,
  });

  useEffect(() => {
    const { permissions = null || undefined } = { ...sessionStorage };
    const credentials = JSON.parse(permissions);

    setUserPermissions(credentials);
  }, []);

  const gettitle = (e) => {
    e.persist();
    setTitle({ [e.target.name]: e.target.value });
  };

  const sendResume = async (e) => {
    e.preventDefault();
    const { skills = null || undefined, cv = null || undefined } = {
      ...localStorage,
    };
    const trueCv = JSON.parse(cv);
    if ((skills && title[`title`] !== null) || undefined) {
      const dataForm = {
        title: title[`title`],
        skills: JSON.parse(skills),
      };
      await api
        .post("resume", dataForm, {
          headers: {
            Authorization: `Bearer ${Userpermissions["token"]}`,
            userid: Userpermissions["user"],
          },
        })
        .then((sucess) => {
          localStorage.removeItem("skills");
          localStorage.removeItem("cv");
          const { data } = sucess;
          setNotification({
            message: data.message,
            background: "green",
            then: true,
          });
          setTimeout(() => {
            setNotification({
              message: "",
              background: "",
              then: false,
            });
          }, 2000);
        })

        .catch((error) => {
          const { err } = error.response.data;
          setNotification({
            message: err,
            background: "red",
            then: true,
          });
          setTimeout(() => {
            setNotification({
              message: "",
              background: "",
              then: false,
            });
          }, 2000);
        });
    } else {
      setNotification({
        message: `Verifique os campos`,
        background: "red",
        then: true,
      });
      setTimeout(() => {
        setNotification({
          message: "",
          background: "",
          then: false,
        });
      }, 2000);
    }
  };

  return (
    <>
      <UserArea id={id}>
        <div className="row">
          <div className="column">
            <h2>Crie ou edite seu Curiculum</h2>
          </div>
        </div>

        <Card>
          <div className="row">
            <div className="column">
              <h2>Sua Principal Atividade</h2>
              <label>Titulo</label>
              <input
                type="text"
                name="title"
                placeholder="ex: Desenvolvedor Full Stack"
                onChange={gettitle}
              />
            </div>
          </div>
        </Card>
        <AddSkill />
        <Card>
          <div className="row">
            <div className="column">
              <h2>Enviar seu curriculum</h2>
              <p>* aceito apenas arquivos no formato PDF</p>
              <UploadCv />
            </div>
          </div>
        </Card>
        <button className="float-right" onClick={sendResume}>
          Salvar Curriculum
        </button>
      </UserArea>
      {notification.then && (
        <Notifications
          message={notification.message}
          background={notification.background}
        />
      )}
    </>
  );
};

export default Resume;

Resume.getInitialProps = ({ query: { id } }) => {
  return { id };
};
