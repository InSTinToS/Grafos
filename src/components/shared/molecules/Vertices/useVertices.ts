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

      let newState = [...prevState]

      newState = connectVertices({
        beforeState: newState,
        secondVertex: vertices[1],
        firstIndex: vertices[0].index
      })

      newState = connectVertices({
        beforeState: newState,
        secondVertex: vertices[0],
        firstIndex: vertices[1].index
      })

      edges.set(
        createEdge({
          refs,
          prev: edges.get(),
          vertices: [vertices[0], vertices[1]]
        })
      )

      return newState
    })
  }, [edges, selected])

  useEffect(() => {
    if (selected.length === 2) createVerticesConnection()
  }, [selected, createVerticesConnection])

  return { vertexRef, vertices, onDrag, onMouseDown }
}
