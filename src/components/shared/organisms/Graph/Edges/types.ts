import { IConnection } from '../Vertices/Vertex/types'

import { SVGProps } from 'react'

import { MotionValue } from 'framer-motion'

export interface IEdge {
  path: string
  vertices: IConnection[]
}

export interface IEdgesProps extends SVGProps<SVGElement> {
  edges: MotionValue<IEdge[]>
}

export interface IUseEdgesParams {
  edges: IEdgesProps['edges']
}
