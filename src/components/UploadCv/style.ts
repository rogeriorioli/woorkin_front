import styled from 'styled-components';

const InputContainer = styled.div`
  width : 100%;
  height: 100px;
  border : 1px dashed rgba(0, 0, 0, 0.8);
  padding : 20px;
  position: relative;
  text-align : center;
  input[type="file"] {
      width : 100%;
      height : 100%;
      position:absolute;
      top:0;
      left:0;
      opacity:0;
      cursor:pointer;
  }
`;
export default InputContainer