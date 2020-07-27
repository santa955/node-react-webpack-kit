import React from 'react'
import Loadable from 'react-loadable'

export default Component => props => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  )
}

export const ReactLoadable = loader => {
  return Loadable({
    loader,
    loading: () => {
      return <div>Loading...</div>
    }
  })
}