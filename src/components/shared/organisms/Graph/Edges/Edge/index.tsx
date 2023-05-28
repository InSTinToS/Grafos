import { IEdgeProps } from './types'

import { motion } from 'framer-motion'

export const Edge = ({ d, stroke }: IEdgeProps) => (
  <motion.path d={d} strokeWidth={2} stroke={stroke} />
)
