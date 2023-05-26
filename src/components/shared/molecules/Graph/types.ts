import { IConnection, IVertex } from '../../atoms/Vertex/types'

export type TCreateVertexConnection = (
  beforeState: TVertices,
  firstIndex: number,
  secondVertex: IVertex
) => TVertices

export interface IEdge {
  path: string
  vertices: number[]
}

export interface ISelected {
  index: number
}

export type TVertices = {
  label: string
  index: number
  connections: IConnection[]
}[]

export type TUpdateEdge = (
  firstVertex: IVertex,
  secondVertex: IVertex
) => string

export interface IVertexToConnect {
  vertex?: IVertex
}
