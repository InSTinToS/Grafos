import { MouseEvent, RefObject } from 'react'

import { PanInfo } from 'framer-motion'

export type TGetMotion = () => IVertexCoords

export type TOnDrag = (
  event: globalThis.MouseEvent | globalThis.PointerEvent,
  info: PanInfo
) => void

export type TOnVertexDrag = (
  event: globalThis.MouseEvent | globalThis.PointerEvent,
  info: PanInfo,
  vertex: IVertex
) => void

export type TOnMouseDown = (event: MouseEvent<HTMLLIElement>) => void

export type TOnVertexMouseDown = (
  event: MouseEvent<HTMLLIElement>,
  vertex: IVertex
) => void

export interface IVertexCoords {
  x: number
  y: number
}

export interface IConnection {
  index: number
  label: string
}

export interface IVertex {
  index: number
  label: string
  connections: IConnection[]
}

export interface IForwardVertex {
  getMotionValue: () => IVertexCoords
}

export interface IVertexProps {
  index: number
  label: string
  onDrag?: TOnVertexDrag
  connections: IVertex[]
  onMouseDown?: TOnVertexMouseDown
  graphRef: RefObject<HTMLDivElement>
}

export interface IUseVertexParams {
  ref: any
  index: IVertexProps['index']
  label: IVertexProps['label']
  graphRef: IVertexProps['graphRef']
  onDragProp: IVertexProps['onDrag']
  connections: IVertexProps['connections']
  onMouseDownProp: IVertexProps['onMouseDown']
}
