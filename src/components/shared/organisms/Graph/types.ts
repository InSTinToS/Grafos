import { IVertex } from '../../atoms/Vertex/types'
import { IEdge } from '../../molecules/Edges/types'

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
