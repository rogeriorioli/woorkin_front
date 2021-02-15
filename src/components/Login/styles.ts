import styled from "styled-components";

const LoginContainer = styled.div`
  max-width: 350px;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 10px;
  border-radius: 20px;
  .form-container {
    .welcome {
      text-align: center;
    }
    &-login {
      margin: 20px 0;
      fieldset {
        margin: 10px 0;
        padding: 0;
        border: 1px solid rgba(0, 0, 0, 0.12);
        legend {
          padding: 0 5px;
          margin: 0;
        }
        input {
          border: none;
          margin: 0;
        }
      }
    }
    &-sign {
      display: flex;
      justify-content: space-between;
      .register {
        font-size: 12px;
        display: flex;
        align-items: center;
        button {
          background: none;
          padding: 0 3px;
          margin: 0 3px;
          color: blue;
          border: none;
        }
      }
      .enter {
        button {
          background: blue;
          border: none;
        }
      }
    }
  }
  .box-login {
    text-align: center;
    height: 250px;
    h2 {
      font-size: 23px;
      text-transform: capitalize;
    }
    &-choose {
      display: flex;
      justify-content: space-between;
      &-user {
        border: 1px solid rgba(0, 0, 0, 0.12);
        width: 150px;
        height: 150px;
        background: #f5f5f8;
        position: relative;
        cursor: pointer;
        transition: all 0.5s;
        &.selected {
          border: 5px solid rgba(0, 0, 0, 0.12);
          transition: all 0.5s;
          &:after {
            width: 30px;
            height: 30px;
            background-color: green;
            border-radius: 50%;
            content: "";
            background-image: url("../static/images/login/tick.svg");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 50%;
            color: #fff;
            position: absolute;
            right: -10px;
            bottom: -10px;
          }
        }
      }
    }
  }
`;

export default LoginContainer;
