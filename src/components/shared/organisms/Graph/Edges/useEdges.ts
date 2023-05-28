import { IEdge } from './types'

import { GraphContext } from '../useGraph'

import { useContext, useEffect, useState } from 'react'

export const useEdges = () => {
  const { edges, edgeColor } = useContext(GraphContext)
  const [updated, setUpdated] = useState<IEdge[]>()

  useEffect(() => {
    edges?.on('change', latest => {
      setUpdated(latest)
    })
  }, [edges])

  return { edgeColor, updated }
}
