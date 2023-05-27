import { getUpdatedEdgePath } from './getUpdatedEdgePath'

import { RefObject } from 'react'

import {
  IForwardVertex,
  IVertex
} from 'src/components/shared/atoms/Vertex/types'
import { IEdge } from 'src/components/shared/molecules/Edges/types'

type TCreateEdge = (params: {
  prev?: IEdge[]
  vertices: IVertex[]
  refs: RefObject<IForwardVertex[]>
}) => IEdge[]

export const createEdge: TCreateEdge = ({ refs, vertices, prev }) => {
  const edgeAlreadyExists = prev?.find(
    edge =>
      (edge.vertices[0].index === vertices[0].index &&
        edge.vertices[1].index === vertices[1].index) ||
      (edge.vertices[1].index === vertices[0].index &&
        edge.vertices[0].index === vertices[1].index)
  )

  if (edgeAlreadyExists || !refs.current) return prev ? prev : []

  const newEdge: IEdge = {
    vertices,
    path: getUpdatedEdgePath({
      refs: [refs.current[vertices[0].index], refs.current[vertices[1].index]]
    })
  }

  return prev ? [...prev, newEdge] : [newEdge]
}
