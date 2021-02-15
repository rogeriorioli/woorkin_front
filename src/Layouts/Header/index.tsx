import React from "react";
import HeaderUserNav from "../../components/HeaderUserNav";
import Logo from "../../components/Logo";
import HeaderContainer from "./styles";

const Header = () => {
  return (
    <HeaderContainer>
      <div className="container">
        <div className="row flex">
          <div className="column column-20">
            <Logo />
          </div>
          <>
            <div className="column column-60"></div>
            <div className="column column-20">
              <HeaderUserNav />
            </div>
          </>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
