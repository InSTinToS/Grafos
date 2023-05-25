/* eslint-disable @typescript-eslint/no-empty-interface */
// Use type safe message keys with `next-intl`
type TMessages = typeof import('./messages/en.json')
declare interface IIntlMessages extends Messages {}
