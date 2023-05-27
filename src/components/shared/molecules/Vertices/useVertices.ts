import { IUseVerticesParams, TVertexRef } from './types'

import { IEdge } from '../Edges/types'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  IForwardVertex,
  IVertex,
  IVertexProps,
  TOnVertexMouseDown
} from 'src/components/shared/atoms/Vertex/types'

import { connectVertices } from 'src/utils/graph/connectVertices'
import { createEdge } from 'src/utils/graph/createEdge'
import { deleteEdge } from 'src/utils/graph/deleteEdge'
import { disconnectVertices } from 'src/utils/graph/disconnectVertices'
import { getUpdatedEdgePath } from 'src/utils/graph/getUpdatedEdgePath'

export const useVertices = ({ edges }: IUseVerticesParams) => {
  const refs = useRef<IForwardVertex[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [vertices, setVertices] = useState<IVertex[]>([
    { label: 'A', connections: [], index: 0 },
    { label: 'B', connections: [], index: 1 },
    { label: 'C', connections: [], index: 2 }
  ])

  const vertexRef: TVertexRef = (ref, index) => {
    if (ref) refs.current[index] = ref
  }

  const onDrag: IVertexProps['onDrag'] = (_event, _info, vertex) => {
    const index = vertex.index
    const prev = edges.get()

    const edgesOfVertex = prev.filter(({ vertices }) =>
      vertices.find(vertex => vertex.index === index)
    )

    const updatedEdgesOfVertex: IEdge[] = edgesOfVertex.map(
      ({ vertices, path }) => {
        const newPath = getUpdatedEdgePath({
          refs: [
            refs.current[vertices[0].index],
            refs.current[vertices[1].index]
          ]
        })

        return { path: newPath || path, vertices }
      }
    )

    const otherEdges = prev.filter(({ vertices }) =>
      vertices.every(vertex => vertex.index !== index)
    )

    return edges.set([...otherEdges, ...updatedEdgesOfVertex])
  }

  const onMouseDown: TOnVertexMouseDown = (event, vertex) => {
    event.ctrlKey &&
      setSelected(prev => {
        const newSelected = vertex.index

        if (prev.length >= 2) return [newSelected]

        const alreadySelected = prev.find(index => index === vertex.index)

        return alreadySelected ? prev : [...prev, newSelected]
      })

    if (event.altKey) {
      setSelected([])

      setVertices(prev =>
        prev.map(prevVertex => ({
          ...prevVertex,
          connections:
            prevVertex.index === vertex.index
              ? []
              : prevVertex.connections.filter(
                  connection => connection.index !== vertex.index
                )
        }))
      )

      edges.set(
        edges
          .get()
          .filter(edge =>
            edge.vertices.every(({ index }) => index !== vertex.index)
          )
      )
    }
  }

  const createVerticesConnection = useCallback(() => {
    setVertices(prevState => {
      const vertices: IVertex[] = []

      prevState.find(vertex => {
        if (vertex.index === selected[0]) vertices[0] = vertex
        if (vertex.index === selected[1]) vertices[1] = vertex
      })

      const verticesNotExists = !vertices[0] || !vertices[1]

      if (verticesNotExists) return prevState

      const alreadyConnected = vertices[0].connections.find(
        ({ index }) => index === vertices[1].index
      )

      if (alreadyConnected) {
        edges.set(deleteEdge({ vertices, prev: edges.get() }))

        return disconnectVertices({
          beforeState: prevState,
          verticesIndexes: [vertices[0].index, vertices[1].index]
        })
      }

      edges.set(createEdge({ refs, vertices, prev: edges.get() }))

      return connectVertices({ beforeState: prevState, vertices })
    })
  }, [edges, selected])

  useEffect(() => {
    if (selected.length === 2) createVerticesConnection()
  }, [selected, createVerticesConnection])

  console.log(vertices)

  return { vertexRef, vertices, onDrag, onMouseDown }
}
