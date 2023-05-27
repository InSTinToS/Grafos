import { IEdge } from '../../organisms/Graph/types'

import { RefObject } from 'react'

import { MotionValue } from 'framer-motion'

export interface IVerticesProps {
  edges: MotionValue<IEdge[]>
  graphRef: RefObject<HTMLDivElement>
}

export interface IUseVerticesParams {
  edges: IVerticesProps['edges']
}

export type TVertexRef = (ref: any, index: number) => void
