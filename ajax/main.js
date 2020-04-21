var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("src/interfaces/IAjaxConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/interfaces/IAjaxResponse", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/interfaces/IAjax", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/enums/ContentTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ContentTypes = {
        "json": "application/json",
        "text": "text/plain",
        "form-data": "multipart/form-data",
    };
    Object.freeze(ContentTypes);
    exports.default = ContentTypes;
});
define("src/Ajax", ["require", "exports", "src/enums/ContentTypes"], function (require, exports, ContentTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ajax {
        constructor(config) {
            this.config = config;
        }
        create(config) {
            return new Ajax(config);
        }
        request(config) {
            return __awaiter(this, void 0, void 0, function* () {
                const mergedConfig = Object.assign({}, this.config, config);
                const headers = new Headers(mergedConfig.headers);
                if (mergedConfig.AccessControlOrigin) {
                    headers.append("Access-Control-Allow-Origin", "*");
                }
                if (mergedConfig.responseType) {
                    const contentTypeValue = ContentTypes_1.default[mergedConfig.responseType];
                    headers.append("Content-Type", contentTypeValue);
                }
                else {
                    headers.append("Content-Type", ContentTypes_1.default["text"]);
                }
                let url;
                if (mergedConfig.url.includes("https://")) {
                    url = mergedConfig.url;
                }
                else {
                    url = mergedConfig.baseUrl + mergedConfig.url;
                }
                const response = yield fetch(url, {
                    method: mergedConfig.method,
                    headers: headers,
                    body: JSON.stringify(config.data)
                });
                const ajaxResponse = yield this.createAjaxResponse(response, mergedConfig);
                return ajaxResponse;
            });
        }
        get(url) {
            const ajaxResponse = this.request({ url: url, method: "GET" });
            return ajaxResponse;
        }
        post(url, data) {
            const ajaxResponse = this.request({ url: url, method: "POST", data: data });
            return ajaxResponse;
        }
        put(url, data) {
            const ajaxResponse = this.request({ url: url, method: "PUT", data: data });
            return ajaxResponse;
        }
        delete(url) {
            const ajaxResponse = this.request({ url: url, method: "DELETE" });
            return ajaxResponse;
        }
        createAjaxResponse(response, config) {
            return __awaiter(this, void 0, void 0, function* () {
                let responseData;
                try {
                    switch (config.responseType) {
                        case "json":
                            responseData = yield response.json();
                            break;
                        case "form-data":
                            responseData = yield response.formData();
                            break;
                        case "text":
                            responseData = yield response.text();
                            break;
                        default:
                            responseData = yield response.text();
                            break;
                    }
                }
                catch (_a) {
                    responseData = null;
                }
                const headers = {};
                for (let header of response.headers.entries()) {
                    Object.defineProperty(headers, header[0], {
                        value: header[1],
                    });
                }
                const ajaxResponse = {
                    data: responseData,
                    status: response.status,
                    headers: headers,
                    config: config
                };
                return ajaxResponse;
            });
        }
    }
    exports.default = Ajax;
});
define("main", ["require", "exports", "src/Ajax"], function (require, exports, Ajax_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    testResponses1();
    testResponses2();
    testResponses3();
    function log(responses) {
        Promise.all(responses).then((responses) => {
            console.log("responses from " + responses[0].config.baseUrl);
            responses.forEach((response) => {
                console.log(response);
            });
        });
    }
    function testResponses1() {
        const ajax = new Ajax_1.default({ baseUrl: "https://reqres.in/api", responseType: "json", AccessControlOrigin: true });
        const responses = [];
        responses[0] = ajax.request({
            method: "GET",
            url: "/products/3",
        });
        responses[1] = ajax.get("/users/2");
        responses[2] = ajax.post("/register", {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        });
        responses[3] = ajax.put("/users/2", {
            "name": "vladimir-sviridenko",
            "job": "frontend developer"
        });
        responses[4] = ajax.delete("https://reqres.in/api/users/2");
        log(responses);
    }
    function testResponses2() {
        const ajax = new Ajax_1.default({ baseUrl: "https://jsonplaceholder.typicode.com", responseType: "json", AccessControlOrigin: true });
        const responses = [];
        responses[0] = ajax.get("/posts/1");
        responses[1] = ajax.request({
            method: "POST",
            url: "/posts",
            data: {
                title: "new post",
                body: "new body",
                userId: 1
            }
        });
        responses[2] = ajax.put("/posts/1", {
            title: "Updated title",
            body: "Updated body",
            userId: 1
        });
        responses[3] = ajax.delete("/posts/1");
        log(responses);
    }
    function testResponses3() {
        const ajax = new Ajax_1.default({ baseUrl: "https://pokeapi.co/api/v2", responseType: "json", AccessControlOrigin: true });
        const responses = [];
        responses[0] = ajax.get("/pokemon/eevee");
        responses[1] = ajax.get("/pokemon/braixen");
        responses[2] = ajax.get("/pokemon/vaporeon");
        log(responses);
    }
});
