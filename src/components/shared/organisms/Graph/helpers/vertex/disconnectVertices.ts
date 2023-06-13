import { TDisconnectVertices } from '../types'

export const disconnectVertices: TDisconnectVertices = ({
  beforeState,
  verticesIndexes
}) =>
  beforeState.map(stateVertex => {
    if (stateVertex.index === verticesIndexes[0])
      return {
        ...stateVertex,
        connections: stateVertex.connections.filter(
          ({ index }) => index !== verticesIndexes[1]
        )
      }
    else if (stateVertex.index === verticesIndexes[1])
      return {
        ...stateVertex,
        connections: stateVertex.connections.filter(
          ({ index }) => index !== verticesIndexes[0]
        )
      }

    return stateVertex
  })
