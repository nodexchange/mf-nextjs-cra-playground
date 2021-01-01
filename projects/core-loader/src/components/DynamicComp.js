import * as React from 'react';
/* 3003 */
import {
  ModuleFederationFactory,
  ModuleFederationProvider,
} from './ModuleProvider';
const DynamicComp = () => (
  // <ModuleFederationProvider
  //   hosts={[
  //     'http://localhost:2100/_next/static/runtime/designsystem.js',
  //   ]}>
  //   <h1>Client consumes nextjs</h1>
  //   <div>
  //     <ModuleFederationFactory
  //       host={{ name: 'designsystem', module: './home' }}
  //       props={{ title: 'use Design System Component!' }}
  //     />
  //     {/* <EMPFactory host={{name: 'nextHost', module: './home'}} /> */}
  //   </div>
  // </ModuleFederationProvider>
  <div>
    {/* <ModuleFederationProvider
      hosts={[
        'http://localhost:3003/emp.js', // static host
      ]}>
      <h1>Client consumes static 3003 client</h1>
      <div>
        <ModuleFederationFactory
        host={{ name: 'staticHost', module: './home' }}
        props={{ title: 'use EMPFactory Component!' }}
      />
      </div>
    </ModuleFederationProvider>
    <ModuleFederationProvider
      hosts={[
        // 'http://localhost:3003/emp.js', // static host
        'http://localhost:3002/_next/static/runtime/emp.js', // next host
      ]}>
      <h1>Client consumes nextjs port 3002</h1>
      <div>
        <ModuleFederationFactory
          host={{ name: 'nextHost', module: './home' }}
        />
      </div>
    </ModuleFederationProvider> */}
    <ModuleFederationProvider
      hosts={[
        // 'http://localhost:3003/emp.js', // static host
        'http://localhost:3005/_next/static/remoteEntryMerged.js', // next host
      ]}>
      <h1>Client consumes nextjs (mf plugin) port 3005</h1>
      <div>
        <ModuleFederationFactory
          host={{ name: 'nextClient', module: './nav' }}
        />
      </div>
    </ModuleFederationProvider>
  </div>
);
export default DynamicComp;
