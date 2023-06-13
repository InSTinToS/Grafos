import { IEdge } from '../../Edges/types'
import { TCreateEdge } from '../types'
import { getUpdatedEdgePath } from './getUpdatedEdgePath'

export const createEdge: TCreateEdge = ({ refs, vertices, prev }) => {
  const edgeAlreadyExists = prev?.find(
    edge =>
      (edge.vertices[0].index === vertices[0].index &&
        edge.vertices[1].index === vertices[1].index) ||
      (edge.vertices[1].index === vertices[0].index &&
        edge.vertices[0].index === vertices[1].index)
  )

  if (edgeAlreadyExists || !refs.current) return prev ? prev : []

  const newVertices: IEdge['vertices'] = vertices.map(vertex => {
    const newConnections = vertex.connections

    if (vertex.index == vertices[0].index)
      newConnections.push({
        index: vertices[1].index,
        label: vertices[1].label,
        color: vertices[1].color
      })
    else
      newConnections.push({
        index: vertices[0].index,
        label: vertices[0].label,
        color: vertices[0].color
      })

    return { ...vertex, connections: newConnections }
  })

  const newEdge: IEdge = {
    vertices: newVertices,
    path: getUpdatedEdgePath({
      refs: [refs.current[vertices[0].index], refs.current[vertices[1].index]]
    })
  }

  return prev ? [...prev, newEdge] : [newEdge]
}
