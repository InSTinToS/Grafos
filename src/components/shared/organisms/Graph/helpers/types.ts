import { IEdge } from '../Edges/types'
import { IForwardVertex, IVertex } from '../Vertices/Vertex/types'

import { MutableRefObject, RefObject } from 'react'

import { MotionValue } from 'framer-motion'

export interface IInfo {
  type: string
  colorsQuantity: number
}

export type TColorize = (params: { prevState: IVertex[] }) => {
  vertices: IVertex[]
  info: IInfo
}

export type TCreateEdge = (params: {
  prev?: IEdge[]
  vertices: IVertex[]
  refs: RefObject<IForwardVertex[]>
}) => IEdge[]

export type TDeleteAllEdges = (params: {
  prevState: MotionValue<IEdge[]>
  index: IVertex['index']
}) => IEdge[]

export type TDeleteEdge = (params: {
  prev?: IEdge[]
  vertices: IVertex[]
}) => IEdge[]

export type TUpdateEdge = (params: {
  refs: RefObject<IForwardVertex>['current'][]
}) => string

export type TUpdateAllEdges = (params: {
  prevState: IEdge[]
  index: IVertex['index']
  refs: MutableRefObject<IForwardVertex[]>
}) => IEdge[]

export type TAddVertex = (params: {
  label: IVertex['label']
  prevState: IVertex[]
}) => IVertex[]

export type TConnectVertex = (params: {
  beforeState: IVertex[]
  firstIndex: number
  secondVertex: IVertex
}) => IVertex[]

export type TConnectVertices = (params: {
  beforeState: IVertex[]
  vertices: IVertex[]
}) => IVertex[]

export type TDeleteVertex = (params: {
  index: number
  prevState: IVertex[]
}) => IVertex[]

export type TDisconnectAllVertices = (params: {
  prevState: IVertex[]
  index: number
}) => IVertex[]

export type TDisconnectVertices = (params: {
  beforeState: IVertex[]
  verticesIndexes: number[]
}) => IVertex[]

export type TUpdateVertex = (params: {
  newVertex: IVertex
  prevState: IVertex[]
}) => IVertex[]
