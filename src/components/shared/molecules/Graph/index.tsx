'use client'

import {
  IEdge,
  ISelected,
  IVertexToConnect,
  TCreateVertexConnection,
  TUpdateEdge,
  TVertices
} from './types'

import { Vertex } from '../../atoms/Vertex'
import { IVertex, TOnVertexMouseDown } from '../../atoms/Vertex/types'

import { useCallback, useEffect, useRef, useState } from 'react'

import colors from 'src/styles/custom/colors'

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
    index: secondVertex.index
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

export const Graph = () => {
  const refs = useRef<any>([])
  const [edges, setEdges] = useState<IEdge[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<ISelected[]>([])

  const [vertices, setVertices] = useState<TVertices>([
    { label: 'A', connections: [], index: 0 },
    { label: 'B', connections: [], index: 1 },
    { label: 'C', connections: [], index: 2 }
  ])

  console.clear()
  console.log({ selected })
  console.log({ edges })
  console.log({ refs })
  console.log({ vertices })

  const getUpdatedEdgePath: TUpdateEdge = (firstVertex, secondVertex) => {
    const firstVertexGetMotion = refs.current[firstVertex.index].getMotionValue

    const secondVertexGetMotion =
      refs.current[secondVertex.index].getMotionValue

    if (!firstVertexGetMotion || !secondVertexGetMotion) return ''

    const firstPoint = firstVertexGetMotion().point
    const secondPoint = secondVertexGetMotion().point

    return `M${firstPoint.x},${firstPoint.y} L${secondPoint.x},${secondPoint.y}`
  }

  const onDrag = (index: number) => {
    console.log(index)
  }

  const onMouseDown: TOnVertexMouseDown = (event, vertex) => {
    if (event.ctrlKey)
      setSelected(prev => {
        const newSelected = { index: vertex.index }

        if (prev.length >= 2) return [newSelected]

        const alreadySelected = prev.find(({ index }) => index === vertex.index)

        return alreadySelected ? prev : [...prev, newSelected]
      })
  }

  const createEdge = useCallback(
    (firstVertex: IVertex, secondVertex: IVertex) => {
      const vertices = [firstVertex.index, secondVertex.index]

      setEdges(prev => {
        const edgeAlreadyExists = prev.find(
          edge =>
            (edge.vertices[0] === vertices[0] &&
              edge.vertices[1] === vertices[1]) ||
            (edge.vertices[1] === vertices[0] &&
              edge.vertices[0] === vertices[1])
        )

        if (edgeAlreadyExists) return prev

        return [
          ...prev,
          {
            vertices: [vertices[0], vertices[1]],
            path: getUpdatedEdgePath(firstVertex, secondVertex)
          }
        ]
      })
    },
    []
  )

  const createConnection = useCallback(() => {
    setVertices(prevState => {
      const firstVertex: IVertexToConnect = {}
      const secondVertex: IVertexToConnect = {}

      prevState.find(vertex => {
        if (vertex.index === selected[0].index) firstVertex.vertex = vertex
      })

      prevState.find(vertex => {
        if (vertex.index === selected[1].index) secondVertex.vertex = vertex
      })

      if (!firstVertex.vertex || !secondVertex.vertex) return prevState

      let newState = [...prevState]

      newState = createVertexConnection(
        newState,
        firstVertex.vertex.index,
        secondVertex.vertex
      )

      newState = createVertexConnection(
        newState,
        secondVertex.vertex.index,
        firstVertex.vertex
      )

      createEdge(firstVertex.vertex, secondVertex.vertex)

      return newState
    })
  }, [createEdge, selected])

  useEffect(() => {
    if (selected.length === 2) createConnection()
  }, [selected, createConnection])

  return (
    <section
      ref={sectionRef}
      className='w-full mx-auto relative border h-screen'
    >
      {edges.map(({ path, vertices }) => (
        <svg
          key={vertices.toString()}
          className='w-full h-full absolute -z-10 border border-red-500'
        >
          <path d={path} stroke={colors.secondary[500]} strokeWidth={2} />
        </svg>
      ))}

      {vertices.map(vertex => (
        <Vertex
          connections={[]}
          key={vertex.label}
          index={vertex.index}
          label={vertex.label}
          containerRef={sectionRef}
          onMouseDown={onMouseDown}
          onDrag={() => onDrag(vertex.index)}
          ref={ref => (refs.current[vertex.index] = ref)}
        />
      ))}
    </section>
  )
}
