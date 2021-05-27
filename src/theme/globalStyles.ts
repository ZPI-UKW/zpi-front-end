import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 62.5%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  button,
  input {
    margin: 0;
    padding: 0;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100vh;
  }

  button,
  input,
  textarea {
    font-family: 'Roboto', sans-serif;
  }
  
  a {
    text-decoration: none;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  body .MuiPickersModal-dialog + .MuiDialogActions-root button {
    font-size: 1.4rem;
  }
  body .MuiPickerDTTabs-tabs * {
    font-size: 2.2rem;
  }
`;
export default GlobalStyles;
