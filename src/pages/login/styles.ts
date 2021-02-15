import styled from "styled-components";


const LoginContainer = styled.div`
    max-width: 310px;
    margin : auto;
    .box-login {
      text-align : center;
      h2 {
        font-size : 25px;
      }
      &-choose {
        display : flex;
        justify-content: space-between;
        &-user{
          border : 1px solid rgba(0, 0, 0, 0.12);
          width : 150px;
          height : 150px;
          background : #f5f5f8;
          position: relative;
          cursor : pointer;
          &:focus {
            outline : none;
            &:after {
              width : 30px;
              height : 30px;
              background-color : green;
              border-radius : 50%;
              content: '';
              background-image : url('./static/images/login/tick.svg');
              background-repeat : no-repeat;
              background-position : center center ;
              background-size : 50%;
              color : #fff;
              position : absolute;
              right : -10px;
              bottom : -10px;
            }
          }
     
        }
        
      }
    }
`;

export default LoginContainer