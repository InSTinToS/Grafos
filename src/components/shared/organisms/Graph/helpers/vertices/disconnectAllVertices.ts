import { TDisconnectAllVertices } from '../types'

export const disconnectAllVertices: TDisconnectAllVertices = ({
  index,
  prevState
}) =>
  prevState.map(prevVertex => ({
    ...prevVertex,
    connections:
      prevVertex.index === index
        ? []
        : prevVertex.connections.filter(
            connection => connection.index !== index
          )
  }))
