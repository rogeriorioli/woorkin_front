import styled from 'styled-components';

export const ModalContainer = styled.div`
    .overlay {
      position : fixed;
      z-index: 9999999;
      background : rgba(0, 0, 0, 0.8);
      top : 0 ;
      left :  0;
      display : flex; 
      align-items: center;
      justify-content: center;
      transition : all 0.5s;
      width : 100%;
      height : 100%;
      &.fade-in {
        opacity : 1;
          transition : all 0.5s;
      }
      &.fade-out {
        opacity : 0;
          transition : all 0.5s;
      }
      .modal {
        overflow: hidden;
        width: 80vw;
        height : 100%;
        background : #fff;
        padding : 20px 20px 40px ;
        &-header {
          
          button {
            background : none;
            border : none;
            color : #000;
            float : right;
            padding : 10px;
          }
        }  
      }
    }
`;
