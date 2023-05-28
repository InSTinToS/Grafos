import { IEdge } from './Edges/types'
import { IVertex } from './Vertices/Vertex/types'

import { Dispatch, RefObject, SetStateAction } from 'react'

import { MotionValue } from 'framer-motion'

export interface IGraphProps {
  vertexSize?: number
  edgeColor?: string
}

export interface IGraphContext {
  edgeColor: string
  vertexSize: number
  vertices?: IVertex[]
  edges?: MotionValue<IEdge[]>
  graphRef?: RefObject<HTMLDivElement>
  setVertices?: Dispatch<SetStateAction<IVertex[]>>
}
