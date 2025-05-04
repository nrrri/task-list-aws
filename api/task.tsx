import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, PutCommand, DynamoDBDocumentClient, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
// create unique id
import crypto from "crypto"

const client = new DynamoDBClient({ region: 'us-west-1' })
const docClient = DynamoDBDocumentClient.from(client)

export const fetchTasks = async () => {
    const command = new ScanCommand({
        ExpressionAttributeNames: { "#name": "name" },
        ProjectionExpression: "_id, #name, completed",
        TableName: "Tasks",
    })

    const response = await docClient.send(command)
    return response;
}

// use #name bc name is reserved name in dynamoDB

export const createTasks = async ({ name, completed }) => {
    const uuid = crypto.randomUUID()
    const command = new PutCommand({
        TableName: 'Tasks',
        Item: {
            _id: uuid,
            name,
            completed
        }
    })

    const response = await docClient.send(command)
    return response;
}

export const updateTasks = async ({ _id, name, completed }) => {
    const command = new UpdateCommand({
        TableName: 'Tasks',
        Key: {
            _id
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        UpdateExpression: "set #name = :n, completed = :c",
        ExpressionAttributeValues: {
            ":n": name,
            ":c": completed
        },
        ReturnValues: "ALL_NEW"
    })

    const response = await docClient.send(command)
    return response;
}

export const deleteTasks = async (_id) => {
    const command = new DeleteCommand({
        TableName: "Tasks",
        Key: {
            _id
        },
    })

    const response = await docClient.send(command)
    return response;
}