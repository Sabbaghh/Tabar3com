const myHeaders = new Headers();
myHeaders.append("x-access-token", "goldapi-4cy0guknm94u1p-io");
myHeaders.append("Content-Type", "application/json");

export const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};



