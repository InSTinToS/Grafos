import { IVertex } from 'src/components/shared/atoms/Vertex/types'

type TDisconnectAllVertices = (params: {
  prevState: IVertex[]
  index: number
}) => IVertex[]

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
