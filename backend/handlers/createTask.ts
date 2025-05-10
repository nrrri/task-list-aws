export const handler = async (event: any) => {
    console.log(event);
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Create a task into db" }),
    };
  };