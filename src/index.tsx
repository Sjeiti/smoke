// import './service/css'
import React from 'react'
import {createRoot} from 'react-dom/client'
// import 'core-js/stable'
// import 'regenerator-runtime/runtime' // these fix async await for babel
import { App } from './App'

console.log('init')

const root = createRoot(document.getElementById('app'))
root.render(<App />)

export interface IProps {
  [key:string]: any
}
