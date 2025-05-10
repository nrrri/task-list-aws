export const handler = async (event: any) => {
    console.log(event);
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Update a task in db by id" }),
    };
  };