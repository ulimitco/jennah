import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'store'
import Routes from 'routes'

import registerServiceWorker from 'utils/registerServiceWorker'

import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

import 'antd/dist/antd.min.css'
import 'styles/global-styles'

render(
  <LocaleProvider locale={enUS}>
    <Provider store={configureStore()}>
      <Routes />
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
)

registerServiceWorker()
