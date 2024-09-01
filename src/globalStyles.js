import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat SemiBold', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;



export const Input = styled.input`
  height: 20px;
  width: 250px;
  font-size: 15px;
`;

export const Button = styled.button``;