import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 } from "uuid";

const docClient = new AWS.DynamoDB.DocumentClient();

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

// GET
export const getTaskById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  const res = await docClient
    .get({
      TableName: "TasksTable",
      Key: {
        taskID: id,
      },
    })
    .promise();

  if (!res.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "not found" }),
    };
  }

  return {
    statusCode: 201, // means successfully created
    body: JSON.stringify(res.Item),
  };
};

// POST
export const createTask = async (event: any) => {
  const reqBody = JSON.parse(event.body as string);
  const newTask = {
    ...reqBody,
    taskID: v4(), // gen random id
  };

  await docClient
    .put({
      TableName: "TasksTable",
      Item: newTask,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTask),
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
