import { IEdgeProps } from './types'

import colors from 'src/styles/custom/colors'

import { motion } from 'framer-motion'

export const Edge = ({ d }: IEdgeProps) => (
  <motion.path d={d} strokeWidth={2} stroke={colors.secondary[500]} />
)
