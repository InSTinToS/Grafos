'use client'

import { IGraphProps } from './types'

import { GraphContext, useGraph } from './useGraph'

import colors from 'src/styles/custom/colors'

import { Edges } from 'src/components/shared/molecules/Edges'
import { Vertices } from 'src/components/shared/molecules/Vertices'

import { Close } from 'src/assets/icons/Close'

export const Graph = ({ vertexSize = 32, edgeColor }: IGraphProps) => {
  const { context, onSubmit, onLabelChange, onRemoveClick } = useGraph()

  return (
    <GraphContext.Provider
      value={{
        vertexSize,
        edgeColor: edgeColor || colors.secondary[500],
        ...context
      }}
    >
      <main className='overflow-hidden w-screen h-screen flex'>
        <section className='p-4'>
          <header>
            <form onSubmit={onSubmit} className='flex flex-col space-y-4 p-4'>
              <input
                type='text'
                maxLength={1}
                onChange={onLabelChange}
                placeholder='Nome do vértice'
                className='border rounded-md p-4 text-lg'
              />

              <button className='bg-primary-500 py-3 text-white-500 rounded-3xl'>
                Adicionar
              </button>
            </form>
          </header>

          <ul className='p-4 space-y-2'>
            {context.vertices.map(vertex => (
              <li
                key={vertex.index}
                className='flex items-center justify-between text-lg font-bold text-primary-500'
              >
                {vertex.label}

                <button onClick={() => onRemoveClick(vertex.index)}>
                  <Close />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className='p-4 w-full'>
          <div
            ref={context.graphRef}
            className='border border-primary-500 h-full w-full relative'
          >
            <Edges />
            <Vertices />
          </div>
        </section>
      </main>
    </GraphContext.Provider>
  )
}
