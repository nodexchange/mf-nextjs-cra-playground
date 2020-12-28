import * as React from 'react'

import {EMPFactory, EMPHostsProvider} from './EMPDynamicHost'
const DynamicComp = () => (
  <EMPHostsProvider
    hosts={[
      'http://localhost:3003/emp.js', // static host
      'http://localhost:3002/_next/static/runtime/emp.js',
    ]}>
    <h1>Client consumes nextjs</h1>
    <div>
      <EMPFactory host={{name: 'staticHost', module: './home'}} props={{title: 'use EMPFactory Component!'}} />
    </div>
  </EMPHostsProvider>
)
export default DynamicComp
