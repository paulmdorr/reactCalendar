import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const element = document.getElementById('app')

ReactDOM.render(<App />, element)

if (module.hot) {
  module.hot.accept();
}