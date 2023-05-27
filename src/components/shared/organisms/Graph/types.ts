import { IConnection, IVertex } from 'src/components/shared/atoms/Vertex/types'

export type TCreateVertexConnection = (
  beforeState: IVertex[],
  firstIndex: number,
  secondVertex: IVertex
) => IVertex[]

export interface IEdge {
  path: string
  vertices: IConnection[]
}

export type TUpdateEdge = (
  firstVertexIndex: number,
  secondVertexIndex: number
) => string

export interface IVertexToConnect {
  vertex?: IVertex
}
