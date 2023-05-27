import { IEdge } from './types'

import { useRef } from 'react'

import { useMotionValue } from 'framer-motion'

export const useGraph = () => {
  const graphRef = useRef<HTMLDivElement>(null)
  const edges = useMotionValue<IEdge[]>([])

  return { edges, graphRef }
}
