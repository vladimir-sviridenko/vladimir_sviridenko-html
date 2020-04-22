import Ajax from "./src/Ajax";
import IAjaxResponse from "./src/interfaces/IAjaxResponse";

testResponses1();
testResponses2();
testResponses3();

function log(responses: Promise<IAjaxResponse>[]): void {
  Promise.all(responses).then((responses) => {
    console.log("responses from " + responses[0].config.baseUrl);
    responses.forEach((response) => {
      console.log(response);
    })
  })
}

function testResponses1() {
  const ajax = new Ajax({ baseUrl: "https://reqres.in/api", responseType: "json", AccessControlOrigin: true });
  const responses: Promise<IAjaxResponse>[] = [];

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
  const ajax = new Ajax({ baseUrl: "https://jsonplaceholder.typicode.com", responseType: "json", AccessControlOrigin: true });
  const responses: Promise<IAjaxResponse>[] = [];

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
  })
  responses[3] = ajax.delete("/posts/1");

  log(responses);
}

function testResponses3() {
  const ajax = new Ajax({ baseUrl: "https://pokeapi.co/api/v2", responseType: "json", AccessControlOrigin: true });
  const responses: Promise<IAjaxResponse>[] = [];

  responses[0] = ajax.get("/pokemon/eevee");
  responses[1] = ajax.get("/pokemon/braixen");
  responses[2] = ajax.get("/pokemon/vaporeon");

  log(responses);
}

