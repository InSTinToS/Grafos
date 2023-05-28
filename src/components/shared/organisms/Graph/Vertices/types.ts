import { IEdge } from '../Edges/types'
import { IVertex } from './Vertex/types'

import { RefObject } from 'react'

import { MotionValue } from 'framer-motion'

export interface IVertexToConnect {
  vertex?: IVertex
}

export interface IVerticesProps {
  edges: MotionValue<IEdge[]>
  graphRef?: RefObject<HTMLDivElement>
}

export interface IUseVerticesParams {
  edges: IVerticesProps['edges']
}

export type TVertexRef = (ref: any, index: number) => void
