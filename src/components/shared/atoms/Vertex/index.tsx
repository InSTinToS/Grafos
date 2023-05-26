import { IVertexMotion, IVertexProps, TOnDrag, TOnMouseDown } from './types'

import { forwardRef, useImperativeHandle } from 'react'

import { PanInfo, motion, useMotionValue } from 'framer-motion'

export const Vertex = forwardRef<any, IVertexProps>(
  (
    {
      index,
      label,
      connections,
      containerRef,
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
      const container = containerRef.current?.getBoundingClientRect()

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

      onMouseDragProp && onMouseDragProp(event)
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
      <motion.div
        drag
        ref={ref}
        onDrag={onDrag}
        dragElastic={0}
        dragMomentum={false}
        onMouseDown={onMouseDown}
        dragConstraints={containerRef}
        className='bg-white-500 text-primary-500 font-bold flex items-center justify-center border-primary-500 border-2 w-8 h-8 rounded-full absolute'
      >
        {label}
      </motion.div>
    )
  }
)

Vertex.displayName = 'Vertex'
