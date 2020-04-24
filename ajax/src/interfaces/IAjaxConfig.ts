interface IAjaxConfig {
  baseUrl?: string,
  url?: string,
  headers?: {},
  responseType?: "json" | "text" | "form-data",
  method?: string,
  data?: any
  AccessControlOrigin?: boolean
}

export default IAjaxConfig;