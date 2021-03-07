import React, { useEffect, useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import api from '../../services/api';
import Notifications from '../Notifications';
import InputContainer from './style';

// import { Container } from './styles';

const UploadCv = () => {

  useEffect(() => {
        localStorage.setItem('cv', `false`)
  }, [])
   const [notification, setNotification] = useState({
    message: "",
    background: "red",
    then: false,
  });
  const [uploadOk, setUploadOk] = useState({
    then : false,
    file : ''
  })
    const UploadFile = (e) => {
    const { permissions = null } = { ...sessionStorage };
    const credentials = JSON.parse(permissions);

    const headers = {
      headers: { Authorization: `Bearer ${credentials.token}`,  userid : credentials.user   },

    };
    e.persist();
    const formData = new FormData();
    formData.append("resume_url", e.target.files[0]);
    api
      .post("/user_resume", formData, headers)
      .then((success) => {
        const data = success.data;
        setUploadOk({
          then : true,
          file : `${e.target.files[0].name} foi inserido com sucesso ! `
        })
        localStorage.setItem('cv', `true`)
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
        const { err } = error.response.data
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
      }
     );
  };

    

  return (
    <>
    <InputContainer>
      {uploadOk.then && <p>{uploadOk.file}</p>}
      {uploadOk.then ? '' : (
        <>
        <input type="file" name="resume_url" onChange={UploadFile} />
        <MdFileUpload size={60}/>
        </>
      ) 
      }
    </InputContainer>
    {notification.then && (
        <Notifications
          message={notification.message}
          background={notification.background}
        />
      )}
    </>
  );
}

export default UploadCv;