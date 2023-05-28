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
  color?: string
}

export interface IVertex extends IConnection {
  connections: IConnection[]
}

export interface IForwardVertex {
  getMotionValue: () => IVertexCoords
}

export interface IVertexProps {
  index: number
  label: string
  color?: string
  className?: string
  onDrag?: TOnVertexDrag
  connections: IVertex[]
  onMouseDown?: TOnVertexMouseDown
  graphRef?: RefObject<HTMLDivElement>
}

export interface IUseVertexParams {
  ref: any
  color: IVertexProps['color']
  index: IVertexProps['index']
  label: IVertexProps['label']
  graphRef: IVertexProps['graphRef']
  onDragProp: IVertexProps['onDrag']
  connections: IVertexProps['connections']
  onMouseDownProp: IVertexProps['onMouseDown']
}
