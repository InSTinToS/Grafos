'use client'

import { useRef, useState } from 'react'

import colors from 'src/styles/custom/colors'

import { PanInfo, motion, useMotionValue } from 'framer-motion'

type TOnDrag = (event: any, info: PanInfo, vertex: any) => void

export const Home = () => {
  const [pathD, setPathD] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)

  const firstVertex = useMotionValue({
    point: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    center: { x: 0, y: 0 }
  })

  const secondVertex = useMotionValue({
    point: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    center: { x: 0, y: 0 }
  })

  const updatePosition = (vertex: any) => {
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

  const onDrag: TOnDrag = (event, info, vertex) => {
    const section = sectionRef.current?.getBoundingClientRect()

    if (!section?.width) return

    const windowSizeCalc = -((window.innerWidth - section.width) / 2)

    vertex.set({
      ...vertex.get(),
      point: { y: info.point.y, x: info.point.x + windowSizeCalc }
    })

    updatePosition(vertex)
  }

  const onMouseDown: any = (event: any, vertex: any) => {
    vertex.set({
      ...vertex.get(),
      offset: { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY }
    })
  }

  console.log({ '1': firstVertex.get().center, '2': secondVertex.get().center })

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
