import { queryInfo } from "../constant/constant";

const BriklGQL = async (queryName, token, shopId, variable) => {
  try {
    const response = await fetch(queryInfo[queryName].urlEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-brikl-shop-id": shopId,
        Authorization: token,
      },
      body: JSON.stringify({
        operationName: queryName,
        query: queryInfo[queryName].query,
        variables: variable,
      }),
    });

    if (response.status !== 200) {
      console.log(response.status);
      throw new Error("Error Found");
    }
    const data = await response.json();

    return {
      success: true,
      data: data.data,
      message: `Succese at ${queryName}`,
    };
  } catch (e) {
    console.log(`Error : ${queryName}`);
    return { success: false, message: `Error at ${queryName}` };
  }
};

export default BriklGQL;
