import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import * as yup from "yup";

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = "TasksTable";
const headers = {
  "content-type": "application-json",
};

const schema = yup.object().shape({
  name: yup.string().required(),
  completed: yup.bool().required(),
});

class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown> = {}) {
    super(JSON.stringify(body));
  }
}

const fetchTaskById = async (id: string) => {
  const res = await docClient
    .get({
      TableName: tableName,
      Key: {
        taskID: id,
      },
    })
    .promise();

  if (!res.Item) {
    throw new HttpError(404, { error: "task not found" });
  }
  return res.Item;
};

const handleError = (e: unknown) => {
  if (e instanceof yup.ValidationError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ errors: e.errors }),
    };
  }
  if (e instanceof SyntaxError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        errors: `invalid request body format: ${e.message}`,
      }),
    };
  }
  if (e instanceof HttpError) {
    return {
      statusCode: e.statusCode,
      headers,
      body: e.message,
    };
  }
  throw e;
};

// GET (All)
export const getTasks = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const res = await docClient
    .scan({
      TableName: tableName,
    })
    .promise();
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(res.Items),
  };
};

// GET (One)
export const getTaskById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const task = await fetchTaskById(event.pathParameters?.taskId as string);

    return {
      statusCode: 201, // means successfully created
      headers,
      body: JSON.stringify(task),
    };
  } catch (e) {
    return handleError(e);
  }
};

// POST
export const createTask = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const reqBody = JSON.parse(event.body as string);

    await schema.validate(reqBody, { abortEarly: false });

    const newTask = {
      ...reqBody,
      completed: false,
      taskID: v4(), // gen random id
    };

    await docClient
      .put({
        TableName: tableName,
        Item: newTask,
      })
      .promise();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(newTask),
    };
  } catch (e) {
    return handleError(e);
  }
};

// PUT
export const updateTaskById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.taskId as string;
    await fetchTaskById(id);

    const reqBody = JSON.parse(event.body as string);
    await schema.validate(reqBody, { abortEarly: false });

    const res = await docClient
      .get({
        TableName: tableName,
        Key: {
          taskID: id,
        },
      })
      .promise();

    const task = {
      ...reqBody,
      taskID: id,
    };

    await docClient
      .put({
        TableName: tableName,
        Item: task,
      })
      .promise();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(task),
    };
  } catch (e) {
    return handleError(e);
  }
};

// DELETE
export const deleteTaskById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.taskId as string;
    await fetchTaskById(id);

    await docClient
      .delete({
        TableName: tableName,
        Key: {
          taskID: id,
        },
      })
      .promise();

    return {
      statusCode: 204,
      body: "",
    };
  } catch (e) {
    return handleError(e);
  }
};
