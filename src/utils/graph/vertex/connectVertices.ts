import { IVertex } from '../../../components/shared/organisms/Graph/Vertices/Vertex/types'

type TConnectVertex = (params: {
  beforeState: IVertex[]
  firstIndex: number
  secondVertex: IVertex
}) => IVertex[]

type TConnectVertices = (params: {
  beforeState: IVertex[]
  vertices: IVertex[]
}) => IVertex[]

const connectVertex: TConnectVertex = ({
  beforeState,
  firstIndex,
  secondVertex
}) => {
  const afterState = beforeState

  let firstVertexConnections = afterState
    ?.find(({ index }) => index === firstIndex)
    ?.connections.filter(({ index }) => index !== firstIndex)

  const alreadyConnected = firstVertexConnections?.find(
    ({ index }) => index === secondVertex.index
  )

  if (alreadyConnected) return afterState

  const secondVertexConnection = {
    index: secondVertex.index,
    label: secondVertex.label
  }

  firstVertexConnections
    ? firstVertexConnections.push(secondVertexConnection)
    : (firstVertexConnections = [secondVertexConnection])

  afterState[firstIndex] = {
    ...afterState[firstIndex],
    connections: firstVertexConnections
  }

  return afterState
}

export const connectVertices: TConnectVertices = ({
  vertices,
  beforeState
}) => {
  let newState = [...beforeState]

  newState = connectVertex({
    beforeState: newState,
    firstIndex: vertices[0].index,
    secondVertex: vertices[1]
  })

  newState = connectVertex({
    beforeState: newState,
    firstIndex: vertices[1].index,
    secondVertex: vertices[0]
  })

  return newState
}
