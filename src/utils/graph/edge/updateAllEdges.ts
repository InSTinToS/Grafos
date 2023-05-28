import { IEdge } from '../../../components/shared/organisms/Graph/Edges/types'
import {
  IForwardVertex,
  IVertex
} from '../../../components/shared/organisms/Graph/Vertices/Vertex/types'
import { getUpdatedEdgePath } from './getUpdatedEdgePath'

import { MutableRefObject } from 'react'

type TUpdateAllEdges = (params: {
  prevState: IEdge[]
  index: IVertex['index']
  refs: MutableRefObject<IForwardVertex[]>
}) => IEdge[]

export const updateAllEdges: TUpdateAllEdges = ({ prevState, index, refs }) => {
  const allEdgesOfVertex = prevState?.filter(({ vertices }) =>
    vertices.find(vertex => vertex.index === index)
  )

  const updatedAllEdgesOfVertex = allEdgesOfVertex?.map(
    ({ vertices, path }) => {
      const newPath = getUpdatedEdgePath({
        refs: [refs.current[vertices[0].index], refs.current[vertices[1].index]]
      })

      return { path: newPath || path, vertices }
    }
  )

  const otherEdges = prevState?.filter(({ vertices }) =>
    vertices.every(vertex => vertex.index !== index)
  )

  return [...otherEdges, ...updatedAllEdgesOfVertex]
}
