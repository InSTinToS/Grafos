import { TConnectVertex, TConnectVertices } from '../types'

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
