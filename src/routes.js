import { Router } from "express";

import UserController from "./app/controllers/UserController";
import TaskController from "./app/controllers/TaskController";
import SessionController from "./app/controllers/SessionController";

import auth from "./app/middlewares/auth";

const routes = new Router();

routes.get("/users", UserController.index);

routes.post("/users", UserController.store);

routes.post("/sessions", SessionController.store);

routes.use(auth);

routes.put("/tasks", TaskController.update);
routes.post("/tasks", TaskController.store);
routes.get("/tasks", TaskController.index);

export default routes;
