import React, { ChangeEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { MdAdd, MdClose } from "react-icons/md";
import SkillContainer from "./styles";

import Card from "../Card";
import Notifications from "../Notifications";

const AddSkill = () => {
  const [skills, setSkills] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [skillname, setSkillname] = useState({});
  const [mySkill, setMySkill] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    background: "red",
    then: false,
  });
  useEffect(() => {
    const { permissions = null } = { ...sessionStorage };
    const credentials = JSON.parse(permissions);
    const headers = {
      headers: {
        Authorization: `Bearer ${credentials.token}`,
        userid: credentials.user,
      },
    };
    setPermissions(headers);

    api.get(`/resume/skills`, headers).then((success) => {
      const { data } = success;
      setSkills(data);
    });
  }, []);

  const addNewSkill = (event) => {
    event.persist();
    setSkillname({ [event.target.name]: event.target.value });
  };

  const addSkill = () => {
    const existskill = mySkill.indexOf(skillname[`skillname`])
      ? setMySkill([skillname[`skillname`], ...mySkill])
      : alert("ja existe");

    localStorage.setItem(
      "skills",
      JSON.stringify([skillname[`skillname`], ...mySkill])
    );

    return existskill;
  };

  const createSkill = () => {
    api
      .post(`resume/skills`, skillname, permissions)
      .then((success) => {
        const { data } = success;
        setSkills([skillname, ...skills]);
        addSkill();
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
        }, 3000);
      })
      .catch((error) => {
        const { err } = error.response.data;
        console.log(err);
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
        }, 3000);
      });
  };

  const removeSkill = (item) => {
    setMySkill(mySkill && mySkill.filter((skill) => skill !== item));
    localStorage.setItem("skills", JSON.stringify(mySkill));
  };
  return (
    <>
      <SkillContainer>
        <Card>
          <div className="row">
            <div className="column">
              <h2>Suas Habilidades</h2>
              {mySkill.map((skill) => {
                return (
                  <div className="label" key={skill}>
                    {skill} <MdClose onClick={() => removeSkill(skill)} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="column">
            <div>
              <label>Adicionar competencia:</label>
              <div className="input-group">
                <input
                  list="skills"
                  name="skillname"
                  id="skill"
                  type="search"
                  onChange={addNewSkill}
                />
                <datalist id="skills">
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.skillname} />
                  ))}
                </datalist>
                <button onClick={createSkill} title="Criar skill">
                  <MdAdd size={22} />
                </button>
              </div>
            </div>

            <button onClick={addSkill}>Addicionar Em minhas habilidades</button>
          </div>
        </Card>
      </SkillContainer>
      {notification.then && (
        <Notifications
          message={notification.message}
          background={notification.background}
        />
      )}
    </>
  );
};

export default AddSkill;
