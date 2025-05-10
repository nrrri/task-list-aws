"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// handlers/handler.ts
var handler_exports = {};
__export(handler_exports, {
  createTask: () => createTask,
  deleteTaskById: () => deleteTaskById,
  getTasks: () => getTasks,
  updateTaskById: () => updateTaskById
});
module.exports = __toCommonJS(handler_exports);
var getTasks = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Get all tasks from db" })
  };
};
var createTask = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Create a task into db" })
  };
};
var updateTaskById = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Update a task in db by id" })
  };
};
var deleteTaskById = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Delete a task in db by id" })
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTask,
  deleteTaskById,
  getTasks,
  updateTaskById
});
//# sourceMappingURL=handler.js.map
