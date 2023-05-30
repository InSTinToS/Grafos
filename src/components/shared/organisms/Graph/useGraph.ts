import { IGraphContext } from './types'

import { IEdge } from './Edges/types'
import { IVertex } from './Vertices/Vertex/types'

import { createContext, useRef, useState } from 'react'

import colors from 'src/styles/custom/colors'

import { TInput } from 'src/types/react.types'

import { welshPowell } from 'src/utils/graph/colorize'
import { addVertex } from 'src/utils/graph/vertex/addVertex'
import { deleteVertex } from 'src/utils/graph/vertex/deleteVertex'
import { updateVertex } from 'src/utils/graph/vertex/updateVertex'

import { useMotionValue } from 'framer-motion'

export const GraphContext = createContext<IGraphContext>({
  vertexSize: 32,
  edgeColor: colors.secondary[500]
})

const resetColors = (prevState: IVertex[]): IVertex[] => {
  let updatedVertices: IVertex[] = [...prevState]

  for (let i = 0; i < updatedVertices.length; i++)
    updatedVertices = updateVertex({
      prevState: updatedVertices,
      newVertex: {
        color: undefined,
        index: updatedVertices[i].index,
        label: updatedVertices[i].label,
        connections: updatedVertices[i].connections
      }
    })

  return [...updatedVertices]
}

export const useGraph = () => {
  const [label, setLabel] = useState('')
  const edges = useMotionValue<IEdge[]>([])
  const graphRef = useRef<HTMLDivElement>(null)
  const [vertices, setVertices] = useState<IVertex[]>([])

  const onColorizeClick = () => {
    setVertices([...welshPowell({ prevState: resetColors(vertices) })])
  }

  const onResetColorsClick = () => {
    setVertices([...resetColors(vertices)])
  }

  const onResetClick = () => {
    setVertices([])
    edges.set([])
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    setVertices(addVertex({ prevState: vertices, label }))
  }

  const onLabelChange: TInput['onChange'] = event => {
    setLabel(event.target.value.toUpperCase())
  }

  const onRemoveClick = (index: number) => {
    setVertices(deleteVertex({ prevState: vertices, index }))
  }

  const context = { graphRef, edges, vertices, setVertices }

  return {
    context,
    onSubmit,
    onResetClick,
    onLabelChange,
    onRemoveClick,
    onColorizeClick,
    onResetColorsClick
  }
}
