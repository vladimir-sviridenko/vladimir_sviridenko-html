import IAjaxConfig from "./IAjaxConfig";

interface IAjaxResponse {
  data: any,
  status: number,
  headers: object,
  config: IAjaxConfig,
}

export default IAjaxResponse;