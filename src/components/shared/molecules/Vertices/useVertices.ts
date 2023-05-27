import { IUseVerticesParams, TVertexRef } from './types'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  IForwardVertex,
  IVertex,
  IVertexProps,
  TOnVertexMouseDown
} from 'src/components/shared/atoms/Vertex/types'
import {
  IEdge,
  TCreateVertexConnection,
  TUpdateEdge
} from 'src/components/shared/organisms/Graph/types'

const createVertexConnection: TCreateVertexConnection = (
  beforeState,
  firstIndex,
  secondVertex
) => {
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

export const useVertices = ({ edges }: IUseVerticesParams) => {
  const refs = useRef<IForwardVertex[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [vertices, setVertices] = useState<IVertex[]>([
    { label: 'A', connections: [], index: 0 },
    { label: 'B', connections: [], index: 1 },
    { label: 'C', connections: [], index: 2 }
  ])

  console.log({ selected })
  console.log({ vertices })
  console.log({ refs })

  const vertexRef: TVertexRef = (ref, index) => {
    if (ref) refs.current[index] = ref
  }

  const getUpdatedEdgePath: TUpdateEdge = (
    firstVertexIndex,
    secondVertexIndex
  ) => {
    const firstVertex = refs.current[firstVertexIndex]

    const secondVertex = refs.current[secondVertexIndex]

    if (!firstVertex || !secondVertex) return ''

    const firstPoint = firstVertex.getMotionValue().point
    const secondPoint = secondVertex.getMotionValue().point

    return `M${firstPoint.x},${firstPoint.y} L${secondPoint.x},${secondPoint.y}`
  }

  const onDrag: IVertexProps['onDrag'] = (_event, _info, vertex) => {
    const index = vertex.index
    const prev = edges.get()

    const edgesOfVertex = prev.filter(({ vertices }) =>
      vertices.find(vertex => vertex.index === index)
    )

    const updatedEdgesOfVertex: IEdge[] = edgesOfVertex.map(
      ({ vertices, path }) => {
        const newPath = getUpdatedEdgePath(vertices[0].index, vertices[1].index)

        return { path: newPath || path, vertices }
      }
    )

    const otherEdges = prev.filter(({ vertices }) =>
      vertices.every(vertex => vertex.index !== index)
    )

    return edges.set([...otherEdges, ...updatedEdgesOfVertex])
  }

  const onMouseDown: TOnVertexMouseDown = (event, vertex) => {
    if (event.ctrlKey)
      setSelected(prev => {
        const newSelected = vertex.index

        if (prev.length >= 2) return [newSelected]

        const alreadySelected = prev.find(index => index === vertex.index)

        return alreadySelected ? prev : [...prev, newSelected]
      })
  }

  const createEdge = useCallback(
    (firstVertex: IVertex, secondVertex: IVertex) => {
      const vertices = [
        { index: firstVertex.index, label: firstVertex.label },
        { index: secondVertex.index, label: secondVertex.label }
      ]
      const prev = edges.get()

      const edgeAlreadyExists = prev.find(
        edge =>
          (edge.vertices[0].index === vertices[0].index &&
            edge.vertices[1].index === vertices[1].index) ||
          (edge.vertices[1].index === vertices[0].index &&
            edge.vertices[0].index === vertices[1].index)
      )

      if (edgeAlreadyExists) edges.set(prev)

      edges.set([
        ...prev,
        {
          vertices: [vertices[0], vertices[1]],
          path: getUpdatedEdgePath(firstVertex.index, secondVertex.index)
        }
      ])
    },
    [edges]
  )

  const createVerticesConnection = useCallback(() => {
    setVertices(prevState => {
      const vertices: IVertex[] = []

      prevState.find(vertex => {
        if (vertex.index === selected[0]) vertices[0] = vertex
        if (vertex.index === selected[1]) vertices[1] = vertex
      })

      if (!vertices[0] || !vertices[1]) return prevState

      let newState = [...prevState]

      newState = createVertexConnection(
        newState,
        vertices[0].index,
        vertices[1]
      )

      newState = createVertexConnection(
        newState,
        vertices[1].index,
        vertices[0]
      )

      createEdge(vertices[0], vertices[1])

      return newState
    })
  }, [createEdge, selected])

  useEffect(() => {
    if (selected.length === 2) createVerticesConnection()
  }, [selected, createVerticesConnection])

  return { vertexRef, vertices, onDrag, onMouseDown }
}
