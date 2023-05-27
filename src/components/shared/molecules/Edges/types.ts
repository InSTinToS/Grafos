import { SVGProps } from 'react'

import { IEdge } from 'src/components/shared/organisms/Graph/types'

import { MotionValue } from 'framer-motion'

export interface IEdgesProps extends SVGProps<SVGElement> {
  edges: MotionValue<IEdge[]>
}
