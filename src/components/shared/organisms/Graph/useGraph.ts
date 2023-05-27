import { IGraphContext } from './types'

import { IVertex } from '../../atoms/Vertex/types'
import { IEdge } from '../../molecules/Edges/types'

import { createContext, useRef, useState } from 'react'

import colors from 'src/styles/custom/colors'

import { useMotionValue } from 'framer-motion'

export const GraphContext = createContext<IGraphContext>({
  vertexSize: 32,
  edgeColor: colors.secondary[500]
})

export const useGraph = () => {
  const [label, setLabel] = useState('')
  const edges = useMotionValue<IEdge[]>([])
  const graphRef = useRef<HTMLDivElement>(null)
  const [vertices, setVertices] = useState<IVertex[]>([])

  const onSubmit = (e: any) => {
    e.preventDefault()

    setVertices(prev => [
      ...prev,
      {
        label,
        connections: [],
        index: vertices[0]
          ? vertices.reduce(
              (prev, curr) => (prev.index > curr.index ? prev : curr),
              vertices[0]
            ).index + 1
          : 0
      }
    ])
  }

  const onLabelChange = (e: any) => {
    e.preventDefault()

    const label: string = e.target.value

    setLabel(label.toUpperCase())
  }

  const onRemoveClick = (index: number) => {
    setVertices(prev => prev.filter(prevVertex => prevVertex.index !== index))
  }

  const context = { graphRef, edges, vertices, setVertices }

  console.log({ vertices })

  return { context, onLabelChange, onSubmit, onRemoveClick }
}
