import { injectGlobal } from 'styled-components'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    background-image: url("/bg2.png") !important;
    height: 100% !important;
    width: 100% !important;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  .actionHeader {
    align: right;
  }

  .ant-modal-header {
      background-color: #658aff;
      border-bottom: none;
  }

  .ant-modal-title {
      color: white;
  }
`
