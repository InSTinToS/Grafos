interface IApiParams {
  data?: any
  body?: any
  url: string
  token?: string
  options?: RequestInit
  method?: string
}

interface IGetHeadersParams {
  options: IApiParams['options']
  token: IApiParams['token']
}

const getHeaders = ({ options, token }: IGetHeadersParams) => {
  const headersWithToken = {
    'Content-Type': 'application/json',
    ...options?.headers,
    Authorization: `Bearer ${token}`
  }

  const headersWithoutToken = {
    'Content-Type': 'application/json',
    ...options?.headers
  }

  return token ? headersWithToken : headersWithoutToken
}

const get = async ({ url, options, token }: IApiParams) =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
    headers: getHeaders({ options, token }),
    ...options
  }).then(res => {
    if (!res.ok) throw new Error('GET ERROR')
    if (res) return res.json()
    return res
  })

const post = async ({ method, url, options, data, token, body }: IApiParams) =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
    ...options,
    mode: 'cors',
    method: method || 'POST',
    body: body || JSON.stringify(data) || undefined,
    headers: getHeaders({ options, token })
  }).then(res => {
    if (!res.ok) throw new Error('POST ERROR')
    if (res) return res.json()
    return res
  })

const put = async ({ ...props }: IApiParams) =>
  post({ ...props, method: 'PUT' })

export const api = { get, post, put }
