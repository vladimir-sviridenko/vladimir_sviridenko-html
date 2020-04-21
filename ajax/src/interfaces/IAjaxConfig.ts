interface IAjaxConfig {
  baseUrl?: string,
  url?: string,
  headers?: {},
  responseType?: string,
  method?: string,
  data?: any
  AccessControlOrigin?: boolean
}

export default IAjaxConfig;