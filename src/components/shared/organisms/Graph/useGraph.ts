import { IEdge } from '../../molecules/Edges/types'

import { createContext, useRef } from 'react'

import colors from 'src/styles/custom/colors'

import { useMotionValue } from 'framer-motion'

export const GraphContext = createContext({
  vertexSize: 32,
  edgeColor: colors.secondary[500]
})

export const useGraph = () => {
  const graphRef = useRef<HTMLDivElement>(null)
  const edges = useMotionValue<IEdge[]>([])

  return { edges, graphRef }
}
