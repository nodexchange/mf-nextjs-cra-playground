import * as React from 'react'

const loadComponent = (remote, module) => {
  setTimeout(() => {
    console.log('delayed', module, remote, window[remote]);
    console.log(window);
  }, 1000);

  return async () => {
    try {
      global[remote].init(
        Object.assign(
          {
            react: {
              get: () => Promise.resolve(() => require("react")),
              loaded: true,
            },
            React: {
              get: () => Promise.resolve(() => require("react")),
              loaded: true,
            }
          },
          global.__webpack_require__ ? global.__webpack_require__.o : {}
        )
      );
      const factory = await window[remote].get(module);
      return factory()
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
const remoteHosts = {}
const registerHost = url => {
  remoteHosts[url] = {}
  remoteHosts[url].element = document.createElement('script')
  remoteHosts[url].element.src = url
  remoteHosts[url].element.type = 'text/javascript'
  remoteHosts[url].element.async = true
  document.head.appendChild(remoteHosts[url].element)
  return new Promise((resolve, reject) => {
    remoteHosts[url].element.onload = () => {
      console.log(')_)_)_ module loaded');
      resolve(true)
    }
    remoteHosts[url].element.onerror = () => {
      reject(false)
    }
  })
}
const unregisterAllHost = () => {
  for (const url in remoteHosts) {
    if (remoteHosts[url].element && remoteHosts[url].element.src) document.head.removeChild(remoteHosts[url].element)
  }
}

const useDynamicScript = hosts => {
  const [ready, setReady] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    const registerAllhost = hosts.map(url => registerHost(url))
    Promise.all(registerAllhost)
      .then(rs => {
        const isFail = rs.includes(false)
        if (isFail) {
          setFailed(true)
        } else {
          setReady(true)
        }
      })
      .catch(e => console.error(e))

    return () => {
      unregisterAllHost()
    }
  }, [hosts])

  return {
    ready,
    failed,
  }
}
const NoHostComp = () => <>No Host.</>
const LoadComp = () => <>Loading...</>
const LoadFailComp = () => <>Loading failed</>

export const ModuleFederationProvider = ({
  hosts,
  children,
  scope,
  tips = {
    noHost: <NoHostComp />,
    failed: <LoadFailComp />,
    loading: <LoadComp />,
  },
}) => {
  const {ready, failed} = useDynamicScript(hosts)
  if (hosts.length === 0) {
    return <div>{tips.noHost}</div>
  }

  if (failed) {
    return <div>{tips.failed}</div>
  }

  if (!ready) {
    return <div>{tips.loading}</div>
  }
  
  return children
}

export function ModuleFederationFactory({host, props}) {
  const Component = React.lazy(loadComponent(host.name, host.module))
  return (
    <React.Suspense fallback="Loading Button">
      <Component {...props} />
    </React.Suspense>
  )
}

export function ModuleFederationImport({mod, props}) {
  const Component = React.lazy(() => mod())
  return (
    <React.Suspense fallback="Loading Button">
      <Component {...props} />
    </React.Suspense>
  )
}
