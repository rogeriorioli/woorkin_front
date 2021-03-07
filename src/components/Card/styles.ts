import styled from "styled-components";

const CardContainer = styled.div`
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  margin: 20px 0;

  .label {
    background: rgba(0, 0, 0, 0.12);
    display: inline-block;
    margin: 10px 10px 10px 0;
    padding: 5px;
    border-radius: 10px;
    vertical-align: bottom;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    svg {
      margin-right: 10px;
    }
  }
`;

export default CardContainer;
