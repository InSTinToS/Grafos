'use client'

import { useGraph } from './useGraph'

import { Edges } from 'src/components/shared/molecules/Edges'
import { Vertices } from 'src/components/shared/molecules/Vertices'

export const Graph = () => {
  const { graphRef, edges } = useGraph()

  return (
    <section ref={graphRef} className='w-full mx-auto relative border h-screen'>
      <Edges edges={edges} />

      <Vertices edges={edges} graphRef={graphRef} />
    </section>
  )
}
