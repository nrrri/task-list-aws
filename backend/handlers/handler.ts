import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// GET
export const getTasks = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Get all tasks from db" }),
  };
};

// POST
export const createTask = async (event: any) => {
  console.log(event);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Create a task into db" }),
  };
};

// PUT
export const updateTaskById = async (event: any) => {
  console.log(event);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Update a task in db by id" }),
  };
};


// DELETE
export const deleteTaskById = async (event: any) => {
  console.log(event);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Delete a task in db by id" }),
  };
};