import { profile } from "console";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdOpenInBrowser } from "react-icons/md";
import Card from "../../components/Card";
import Cards from "../../components/Cards";
import Avatar from "../../components/UserAvatar/Avatar";
import Layouts from "../../Layouts";
import PageHeader from "../../Layouts/PageHeader";
import Modal from "../../Modal";
import api from "../../services/api";

// import { Container } from './styles';

interface ResumeData {
  resume: string;
  title: string;
  skills: [];
  file_url: string;
}

const Candidate = ({ id }) => {
  const [profile, setProfile] = useState([]);
  const [avatar, setAvatar] = useState({});
  const [resume, setResume] = useState<ResumeData>();
  const [resumeFile, setResumeFile] = useState<ResumeData>();
  const [modal, setModal] = useState(false);
  const modalToogle = () => {
    setModal(!modal);
  };
  useEffect(() => {
    const { permissions = null } = { ...sessionStorage };
    const credentials = JSON.parse(permissions);
    const headers = {
      headers: {
        Authorization: `Bearer ${credentials.token}`,
        userid: credentials.user,
      },
    };
    Promise.all([
      api.get(`candidate/${id}`, headers),
      api.get(`avatar_url/${id}`, headers),
      api.get<ResumeData>(`resume/${id}`, headers),
      api.get<ResumeData>(`user_resume/`, headers),
    ]).then((results) => {
      setProfile(results[0].data);
      setAvatar(results[1].data);
      setResume(results[2].data);
      setResumeFile(results[3].data!);
    });
  }, []);

  console.log(resumeFile);

  return (
    <Layouts>
      <PageHeader
        background="../static/images/profile-bg.jpeg"
        title={`${profile[0]?.name}`}
        height={"400"}
      />
      <div className="container">
        <div className="row">
          <div className="column">
            <Avatar background={avatar[0]?.avatar_url} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="column">
            {profile &&
              profile.map((user) => {
                return (
                  <Cards
                    key={user.user_id}
                    name={user.name}
                    description={resume && resume.title}
                    website={user.website}
                    linkedin={user.linkedin}
                    github={user.github}
                    phone={user.phone}
                  />
                );
              })}
          </div>
        </div>
        <Card>
          <div className="row">
            <div className="column">
              <h2>Curriculum</h2>
              <div>{resume && resume.resume}</div>

              <button onClick={modalToogle}>
                <MdOpenInBrowser size={22} /> Ver Curriculum
              </button>
            </div>
          </div>
        </Card>
        <Card>
          <div className="row">
            <div className="column">
              <h2>Habilidades</h2>
              <div>
                {resume &&
                  resume.skills.map((skill) => (
                    <div className="label" key={skill}>
                      {skill}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
      {modal && (
        <Modal
          onClick={modalToogle}
          stateClass={modal ? `fade-in` : `fade-out`}
        >
          {resumeFile && (
            <embed src={resumeFile[0].file_url} width="100%" height="100%;" />
          )}
        </Modal>
      )}
    </Layouts>
  );
};

export default Candidate;

Candidate.getInitialProps = ({ query: { id } }) => {
  return { id };
};
