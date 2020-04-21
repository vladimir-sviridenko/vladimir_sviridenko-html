import IAjaxConfig from "./IAjaxConfig";
import IAjaxResponse from "./IAjaxResponse";

interface IAjax {
  config: IAjaxConfig;
  create(config: IAjaxConfig): IAjax;
  request(config: IAjaxConfig): Promise<IAjaxResponse>;
  get(url: string): Promise<IAjaxResponse>,
  post(url: string, data: object | string | FormData): Promise<IAjaxResponse>,
  put(url: string, data: object | string | FormData): Promise<IAjaxResponse>,
  delete(url: string): Promise<IAjaxResponse>
  createAjaxResponse(response: Response, config: IAjaxConfig): Promise<IAjaxResponse>
}

export default IAjax;