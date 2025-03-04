import IAjax from "./interfaces/IAjax";
import IAjaxConfig from "./interfaces/IAjaxConfig";
import IAjaxResponse from "./interfaces/IAjaxResponse";
import ContentTypes from "./enums/ContentTypes";
 
class Ajax implements IAjax {
  config: IAjaxConfig;

  constructor(config: IAjaxConfig) {
    this.config = config;
  }

  updateConfig(config: IAjaxConfig) {
    this.config = { ...this.config, ...config };
  }

  getConfig() {
    return this.config;
  }

  create(config: IAjaxConfig): IAjax {
    return new Ajax(config);
  }

  async request(config: IAjaxConfig): Promise<IAjaxResponse> {
    const mergedConfig = { ...this.config, ...config };

    const headers = new Headers(mergedConfig.headers);
    if (mergedConfig.AccessControlOrigin) {
      headers.append("Access-Control-Allow-Origin", "*");
    }

    if (mergedConfig.responseType) {
      const contentTypeValue = ContentTypes[mergedConfig.responseType];
      headers.append("Content-Type", contentTypeValue);
    } else {
      headers.append("Content-Type", ContentTypes["text"]);
    }

    let url = mergedConfig.url.includes("://") ? mergedConfig.url : mergedConfig.baseUrl + mergedConfig.url;

    const response = await fetch(url, {
      method: mergedConfig.method,
      headers: headers,
      body: JSON.stringify(config.data)
    });
    const ajaxResponse = await this.createAjaxResponse(response, mergedConfig);

    return ajaxResponse;
  }

  get(url: string): Promise<IAjaxResponse> {
    const ajaxResponse = this.request({ url: url, method: "GET" });
    return ajaxResponse;
  }

  post(url: string, data: object | string | FormData): Promise<IAjaxResponse> {
    const ajaxResponse = this.request({ url: url, method: "POST", data: data });
    return ajaxResponse;
  }

  put(url: string, data: object | string | FormData): Promise<IAjaxResponse> {
    const ajaxResponse = this.request({ url: url, method: "PUT", data: data });
    return ajaxResponse;
  }

  delete(url: string): Promise<IAjaxResponse> {
    const ajaxResponse = this.request({ url: url, method: "DELETE" });
    return ajaxResponse;
  }

  async getData(response: Response, responseType: string): Promise<string | object | FormData> {
    let responseData;
    try {
      switch (responseType) {
        case "json":
          responseData = await response.json();
          break;
        case "form-data":
          responseData = await response.formData();
          break;
        case "text":
          responseData = await response.text();
          break;
        default:
          responseData = await response.text();
          break;
      }
    } catch {
      responseData = null;
    }
    
    return responseData;
  }

  getHeaders(response: Response): object {
    const headers = {};
    for (let header of response.headers.entries()) {
      Object.defineProperty(headers, header[0], {
        value: header[1],
      });
    }
    return headers;
  }

  async createAjaxResponse(response: Response, config: IAjaxConfig): Promise<IAjaxResponse> {
    const ajaxResponse: IAjaxResponse = {
      data: await this.getData(response, config.responseType),
      status: response.status,
      headers: this.getHeaders(response),
      config: config
    }

    return ajaxResponse;
  }
}

const ajax = new Ajax({AccessControlOrigin: true, responseType: "json"});

export default ajax;