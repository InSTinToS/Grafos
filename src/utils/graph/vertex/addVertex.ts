import { IVertex } from '../../../components/shared/organisms/Graph/Vertices/Vertex/types'

type TAddVertex = (params: {
  label: IVertex['label']
  prevState: IVertex[]
}) => IVertex[]

export const addVertex: TAddVertex = ({ label, prevState }) => [
  ...prevState,
  {
    label,
    connections: [],
    index: prevState[0]
      ? prevState.reduce(
          (prev, curr) => (prev.index > curr.index ? prev : curr),
          prevState[0]
        ).index + 1
      : 0
  }
]
