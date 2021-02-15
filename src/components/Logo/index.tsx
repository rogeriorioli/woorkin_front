import React from "react";
import Link from "next/link";
// import { Container } from './styles';

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a>
        <img src="/static/images/logo.svg" alt="woorkin" />
      </a>
    </Link>
  );
};

export default Logo;
