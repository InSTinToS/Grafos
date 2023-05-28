import { TVertexRef } from './types'

import { GraphContext } from '../useGraph'
import {
  IForwardVertex,
  IVertex,
  IVertexProps,
  TOnVertexMouseDown
} from './Vertex/types'

import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { createEdge } from 'src/utils/graph/edge/createEdge'
import { deleteAllEdges } from 'src/utils/graph/edge/deleteAllEdges'
import { deleteEdge } from 'src/utils/graph/edge/deleteEdge'
import { updateAllEdges } from 'src/utils/graph/edge/updateAllEdges'
import { connectVertices } from 'src/utils/graph/vertex/connectVertices'
import { disconnectAllVertices } from 'src/utils/graph/vertex/disconnectAllVertices'
import { disconnectVertices } from 'src/utils/graph/vertex/disconnectVertices'

export const useVertices = () => {
  const refs = useRef<IForwardVertex[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const { edges, vertices, setVertices, graphRef } = useContext(GraphContext)

  const selectedTw = (index: number) =>
    selected.findIndex(selected => selected === index) + 1
      ? 'outline-secondary-500 outline-2 outline'
      : ''

  const vertexRef: TVertexRef = (ref, index) => {
    if (ref) refs.current[index] = ref
  }

  const onDrag: IVertexProps['onDrag'] = (_event, _info, vertex) => {
    edges?.set(
      updateAllEdges({
        refs,
        index: vertex.index,
        prevState: edges.get()
      })
    )
  }

  const onMouseDown: TOnVertexMouseDown = (event, vertex) => {
    event.ctrlKey &&
      setSelected(prev => {
        const newSelected = vertex.index

        const alreadySelected =
          prev.findIndex(index => index === vertex.index) === -1 ? false : true

        if (prev.length >= 2) return [newSelected]
        if (alreadySelected) return prev

        return [...prev, newSelected]
      })

    if (event.altKey) {
      setSelected([])

      setVertices &&
        vertices &&
        setVertices(
          disconnectAllVertices({ prevState: vertices, index: vertex.index })
        )

      edges?.set(deleteAllEdges({ prevState: edges, index: vertex.index }))
    }
  }

  const createVerticesConnection = useCallback(() => {
    setVertices &&
      setVertices(prevState => {
        const vertices: IVertex[] = []

        prevState.find(vertex => {
          if (vertex.index === selected[0]) vertices[0] = vertex
          if (vertex.index === selected[1]) vertices[1] = vertex
        })

        const verticesNotExists = !vertices[0] || !vertices[1]

        if (verticesNotExists || vertices[0].index === vertices[1].index)
          return prevState

        const alreadyConnected = !!vertices[0].connections.find(
          ({ index }) => index === vertices[1].index
        )

        if (alreadyConnected) {
          edges?.set(deleteEdge({ vertices, prev: edges?.get() }))

          return disconnectVertices({
            beforeState: prevState,
            verticesIndexes: [vertices[0].index, vertices[1].index]
          })
        }

        edges?.set(createEdge({ refs, vertices, prev: edges?.get() }))

        return connectVertices({ beforeState: prevState, vertices })
      })
  }, [edges, selected, setVertices])

  useEffect(() => {
    if (selected.length === 2) createVerticesConnection()
  }, [selected, createVerticesConnection])

  return { vertexRef, onDrag, onMouseDown, selectedTw, vertices, graphRef }
}
