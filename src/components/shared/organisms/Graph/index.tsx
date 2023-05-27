'use client'

import { IGraphProps } from './types'

import { GraphContext, useGraph } from './useGraph'

import colors from 'src/styles/custom/colors'

import { Edges } from 'src/components/shared/molecules/Edges'
import { Vertices } from 'src/components/shared/molecules/Vertices'

export const Graph = ({ vertexSize = 32, edgeColor }: IGraphProps) => {
  const { graphRef, edges } = useGraph()

  return (
    <GraphContext.Provider
      value={{ vertexSize, edgeColor: edgeColor || colors.secondary[500] }}
    >
      <section
        ref={graphRef}
        className='w-[50vw] h-[80vh] border border-purple-500 ml-4'
      >
        <Edges edges={edges} />

        <Vertices edges={edges} graphRef={graphRef} />
      </section>
    </GraphContext.Provider>
  )
}
