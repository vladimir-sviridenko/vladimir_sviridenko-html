import Init from "./app/app.component";

const appTag = Init();

const app = document.createElement("time", { is: appTag });
document.body.appendChild(app);