import { IVertex } from '../../../components/shared/organisms/Graph/Vertices/Vertex/types'

type TUpdateVertex = (params: {
  newVertex: IVertex
  prevState: IVertex[]
}) => IVertex[]

export const updateVertex: TUpdateVertex = ({ newVertex, prevState }) => {
  let updatedVertices = [...prevState]

  const foundNewVertexIndex = updatedVertices.findIndex(
    ({ index }) => index === newVertex.index
  )

  updatedVertices[foundNewVertexIndex] = newVertex

  updatedVertices = updatedVertices.map(vertex => {
    const newVertexConnectionIndex = vertex.connections.findIndex(
      connection => connection.index === newVertex.index
    )

    if (newVertexConnectionIndex === -1) return vertex

    const newConnections = [...vertex.connections]

    newConnections[newVertexConnectionIndex] = {
      index: newVertex.index,
      label: newVertex.label,
      color: newVertex.color
    }

    return { ...vertex, connections: newConnections }
  })

  return updatedVertices
}
