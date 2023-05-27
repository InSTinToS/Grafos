import { IEdge, IUseEdgesParams } from './types'

import { GraphContext } from '../../organisms/Graph/useGraph'

import { useContext, useEffect, useState } from 'react'

export const useEdges = ({ edges }: IUseEdgesParams) => {
  const { edgeColor } = useContext(GraphContext)
  const [updated, setUpdated] = useState<IEdge[]>()

  useEffect(() => {
    edges.on('change', latest => {
      setUpdated(latest)
    })
  }, [edges])

  return { edgeColor, updated }
}
