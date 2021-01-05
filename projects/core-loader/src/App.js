import React from 'react'
import Dynamic from './components/DynamicComp'
import NextComp from './components/NextComp'

const App = () => (
  <div>
    <Dynamic />
    <NextComp scope="nextClient" module="./nav" />
    {/* <NextComp scope="nextClient" module="./home" /> */}
    <h1>I am the CORE LOADER</h1>
  </div>
)

export default App
