export const handler = async (event: any) => {
    console.log(event);
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Delete a task in db by id" }),
    };
  };