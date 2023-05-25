/* eslint-disable @typescript-eslint/no-empty-interface */
import { defaultTheme } from '../styles/styled/theme/default'

import 'styled-components'

type TThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface IDefaultTheme extends TThemeType {}
}
