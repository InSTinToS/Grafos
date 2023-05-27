import {
  IForwardVertex,
  IVertexMotion,
  IVertexProps,
  TOnDrag,
  TOnMouseDown
} from './types'

import { forwardRef, useImperativeHandle } from 'react'

import { PanInfo, motion, useMotionValue } from 'framer-motion'

export const Vertex = forwardRef<IForwardVertex, IVertexProps>(
  (
    {
      index,
      label,
      graphRef,
      connections,
      onDrag: onMouseDragProp,
      onMouseDown: onMouseDownProp
    },
    ref
  ) => {
    const motionValue = useMotionValue<IVertexMotion>({
      point: { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
      center: { x: 0, y: 0 }
    })

    const vertex = { label, connections, index }

    const updateVertexPosition = (info: PanInfo) => {
      const container = graphRef.current?.getBoundingClientRect()
      if (!container?.width) return

      const halfSize = 32 / 2
      const offsetX = info.offset.x
      const offsetY = info.offset.y
      const windowSizeCalc = -((window.innerWidth - container.width) / 2)
      const offsetXCalc =
        offsetX > halfSize ? -(offsetX - halfSize) : +(halfSize - offsetX)
      const offsetYCalc =
        offsetY < halfSize ? halfSize - offsetY : -(offsetY - halfSize)

      motionValue.set({
        point: { x: info.point.x, y: info.point.y },
        offset: { x: info.offset.x, y: info.offset.y },
        center: {
          x: info.point.x + offsetXCalc + windowSizeCalc,
          y: info.point.y + offsetYCalc
        }
      })
    }

    const onDrag: TOnDrag = (event, info) => {
      updateVertexPosition(info)

      onMouseDragProp && onMouseDragProp(event, info, vertex)
    }

    const onMouseDown: TOnMouseDown = event => {
      if (!event.ctrlKey)
        motionValue.set({
          ...motionValue.get(),
          offset: { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY }
        })

      onMouseDownProp && onMouseDownProp(event, vertex)
    }

    useImperativeHandle(ref, () => ({
      getMotionValue: () => motionValue.get()
    }))

    return (
      <motion.li
        drag
        onDrag={onDrag}
        dragElastic={0}
        ref={ref as any}
        dragMomentum={false}
        onMouseDown={onMouseDown}
        dragConstraints={graphRef}
        className='bg-white-500 text-primary-500 font-bold flex items-center justify-center border-primary-500 border-2 w-8 h-8 rounded-full absolute'
      >
        {label}
      </motion.li>
    )
  }
)

Vertex.displayName = 'Vertex'
