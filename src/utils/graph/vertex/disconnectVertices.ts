import { IVertex } from '../../../components/shared/organisms/Graph/Vertices/Vertex/types'

type TDisconnectVertices = (params: {
  beforeState: IVertex[]
  verticesIndexes: number[]
}) => IVertex[]

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
