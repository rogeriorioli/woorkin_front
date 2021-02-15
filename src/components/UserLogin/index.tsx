import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEvent, useState } from "react";

// import { Container } from './styles';

interface UserLogin {
  users: Array<{
    avatar: string;
    type: string;
    id: number;
    query: string;
  }>;
}

const UserLogin = ({ users }: UserLogin) => {
  const router = useRouter();

  return (
    <>
      {users.map((user, index) => {
        return (
          <div
            key={user.id}
            className={`box-login-choose-user ${
              router.query.slug === user.query && "selected"
            }`}
          >
            <div>
              <Link href={`/login/${user.query}`}>
                <a>
                  <img src={user.avatar} alt={user.type} />
                </a>
              </Link>
              {user.type}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default UserLogin;
