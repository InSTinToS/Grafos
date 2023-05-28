import { IUseVertexParams, IVertexCoords, TOnDrag, TOnMouseDown } from './types'

import { GraphContext } from '../../useGraph'

import { useContext, useImperativeHandle, useState } from 'react'

import { useMotionValue } from 'framer-motion'

export const useVertex = ({
  ref,
  label,
  index,
  graphRef,
  onDragProp,
  connections,
  onMouseDownProp
}: IUseVertexParams) => {
  const { vertexSize } = useContext(GraphContext)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const motionValue = useMotionValue<IVertexCoords>({ x: 0, y: 0 })

  const vertex = { label, connections, index }

  const onDrag: TOnDrag = (event, info) => {
    const graph = graphRef?.current?.getBoundingClientRect()

    if (!graph?.width) return

    const relativeX = event.clientX - graph.left
    const relativeY = event.clientY - graph.top

    const halfSize = vertexSize / 2
    const offsetX = offset.x
    const offsetY = offset.y

    const offsetXCalc =
      offsetX > halfSize ? -(offsetX - halfSize) : +(halfSize - offsetX)
    const offsetYCalc =
      offsetY < halfSize ? halfSize - offsetY : -(offsetY - halfSize)

    motionValue.set({ x: relativeX + offsetXCalc, y: relativeY + offsetYCalc })

    onDragProp && onDragProp(event, info, vertex)
  }

  const onMouseDown: TOnMouseDown = event => {
    if (!event.ctrlKey)
      setOffset({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY })

    onMouseDownProp && onMouseDownProp(event, vertex)
  }

  useImperativeHandle(ref, () => ({ getMotionValue: () => motionValue.get() }))

  return {
    onDrag,
    onMouseDown,
    vertexStyle: { height: vertexSize, width: vertexSize }
  }
}
