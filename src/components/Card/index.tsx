import React, { ReactNode } from "react";
import CardContainer from "./styles";

interface CardsProps {

  children?: ReactNode;
}

const Card = ({

  children,
}: CardsProps) => {
  return (
    <CardContainer>
        {children}
    
    </CardContainer>
  );
};

export default Card;
