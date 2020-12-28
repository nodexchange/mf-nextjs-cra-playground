import React from 'react'
import D2Dynamic from './DynamicComp'
// eslint-disable-next-line react/prop-types
const App = props => (
  <div>
    <D2Dynamic />
    <h2>Hot reloaded EMP {props.title}</h2>
  </div>
)

export default App
