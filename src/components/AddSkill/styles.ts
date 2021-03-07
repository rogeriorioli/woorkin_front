import styled from "styled-components";

const SkillContainer = styled.div`
  .label {
    background: rgba(0, 0, 0, 0.12);
    display: inline-block;
    margin: 10px 10px 10px 0;
    padding: 5px;
    border-radius: 10px;
    vertical-align: bottom;
    cursor: pointer;
  }
  .input-group {
    display: flex;
    button {
      margin: 0 10px;
      line-height: 1;
      background: rgba(0, 0, 0, 0.12);
      border-color: #606c76;
      padding: 0 10px;
      color: #606c76;
    }
  }
`;
export default SkillContainer;
