import { IVertex } from 'src/components/shared/atoms/Vertex/types'

type TConnectVertices = (params: {
  beforeState: IVertex[]
  firstIndex: number
  secondVertex: IVertex
}) => IVertex[]

export const connectVertices: TConnectVertices = ({
  beforeState,
  firstIndex,
  secondVertex
}) => {
  const afterState = beforeState
  let firstVertexConnections = afterState[firstIndex].connections

  const alreadyConnected = firstVertexConnections.find(
    ({ index }) => index === secondVertex.index
  )

  if (alreadyConnected) return afterState

  const secondVertexConnection = {
    index: secondVertex.index,
    label: secondVertex.label
  }

  if (firstVertexConnections)
    firstVertexConnections.push(secondVertexConnection)
  else firstVertexConnections = [secondVertexConnection]

  afterState[firstIndex] = {
    ...afterState[firstIndex],
    connections: firstVertexConnections
  }

  return afterState
}
