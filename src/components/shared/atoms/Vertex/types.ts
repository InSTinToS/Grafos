import { MouseEvent, RefObject } from 'react'

import { PanInfo } from 'framer-motion'

export type TGetMotion = () => IVertexMotion

export interface IConnection {
  index: number
}

export interface IVertex {
  index: number
  label: string
  connections: IConnection[]
}

export interface IVertexMotion {
  point: { x: number; y: number }
  offset: { x: number; y: number }
  center: { x: number; y: number }
}

export type TOnDrag = (
  event:
    | globalThis.MouseEvent
    | globalThis.TouchEvent
    | globalThis.PointerEvent,
  info: PanInfo
) => void

export type TOnVertexDrag = (
  event: globalThis.MouseEvent | globalThis.TouchEvent | globalThis.PointerEvent
) => void

export type TOnMouseDown = (event: MouseEvent<HTMLDivElement>) => void

export type TOnVertexMouseDown = (
  event: MouseEvent<HTMLDivElement>,
  vertex: IVertex
) => void

export interface IVertexProps {
  index: number
  label: string
  onDrag?: TOnVertexDrag
  connections: IVertex[]
  onMouseDown?: TOnVertexMouseDown
  containerRef: RefObject<HTMLDivElement>
}
