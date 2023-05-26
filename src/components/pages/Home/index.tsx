'use client'

import { MouseEvent, useRef, useState } from 'react'

import colors from 'src/styles/custom/colors'

import { MotionValue, PanInfo, motion, useMotionValue } from 'framer-motion'

type TOnDrag = (
  event:
    | globalThis.MouseEvent
    | globalThis.TouchEvent
    | globalThis.PointerEvent,
  info: PanInfo,
  vertex: MotionValue<IVertexMotion>
) => void

interface IVertexMotion {
  point: { x: number; y: number }
  offset: { x: number; y: number }
  center: { x: number; y: number }
}

type TOnMouseDown = (
  event: MouseEvent<HTMLDivElement>,
  vertex: MotionValue<IVertexMotion>
) => void

export const Home = () => {
  const [pathD, setPathD] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)

  const firstVertex = useMotionValue<IVertexMotion>({
    point: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    center: { x: 0, y: 0 }
  })

  const secondVertex = useMotionValue<IVertexMotion>({
    point: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    center: { x: 0, y: 0 }
  })

  const updatePosition = (vertex: MotionValue<IVertexMotion>) => {
    const halfSize = 32 / 2
    const offsetX = vertex.get().offset.x
    const offsetY = vertex.get().offset.y

    const offsetXCalc =
      offsetX > halfSize ? -(offsetX - halfSize) : +(halfSize - offsetX)

    const offsetYCalc =
      offsetY < halfSize ? halfSize - offsetY : -(offsetY - halfSize)

    vertex.set({
      ...vertex.get(),
      center: {
        x: vertex.get().point.x + offsetXCalc,
        y: vertex.get().point.y + offsetYCalc
      }
    })

    setPathD(`
      M${firstVertex.get().center.x},${firstVertex.get().center.y}
      L${secondVertex.get().center.x},${secondVertex.get().center.y}
    `)
  }

  const onDrag: TOnDrag = (_event, info, vertex) => {
    const section = sectionRef.current?.getBoundingClientRect()

    if (!section?.width) return

    const windowSizeCalc = -((window.innerWidth - section.width) / 2)

    vertex.set({
      ...vertex.get(),
      point: { y: info.point.y, x: info.point.x + windowSizeCalc }
    })

    updatePosition(vertex)
  }

  const onMouseDown: TOnMouseDown = (event, vertex) => {
    vertex.set({
      ...vertex.get(),
      offset: { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY }
    })
  }

  return (
    <main className='h-screen w-screen'>
      <section
        ref={sectionRef}
        className='w-full mx-auto relative border h-screen'
      >
        <svg className='w-full h-full absolute -z-10 border border-red-500'>
          <path d={pathD} stroke={colors.secondary[500]} strokeWidth={2} />
        </svg>

        <motion.div
          drag
          dragElastic={0}
          dragMomentum={false}
          dragConstraints={sectionRef}
          onMouseDown={e => onMouseDown(e, firstVertex)}
          onDrag={(e, info) => onDrag(e, info, firstVertex)}
          className='bg-white-500 text-primary-500 font-bold flex items-center justify-center border-primary-500 border-2 w-8 h-8 rounded-full absolute'
        >
          1
        </motion.div>

        <motion.div
          drag
          dragElastic={0}
          dragMomentum={false}
          dragConstraints={sectionRef}
          onMouseDown={e => onMouseDown(e, secondVertex)}
          onDrag={(e, info) => onDrag(e, info, secondVertex)}
          className='bg-white-500 text-primary-500 font-bold flex items-center justify-center border-primary-500 border-2 w-8 h-8 rounded-full absolute'
        >
          2
        </motion.div>
      </section>
    </main>
  )
}
