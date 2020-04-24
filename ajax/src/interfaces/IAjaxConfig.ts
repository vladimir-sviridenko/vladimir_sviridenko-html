import ContentTypes from "../enums/ContentTypes";

interface IAjaxConfig {
  baseUrl?: string,
  url?: string,
  headers?: {},
  responseType?: keyof typeof ContentTypes,
  method?: string,
  data?: any
  AccessControlOrigin?: boolean
}

export default IAjaxConfig;