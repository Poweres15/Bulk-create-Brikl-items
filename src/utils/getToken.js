export default async function getToken() {
  const username = "qa@brikl.io";
  const password = "QAforBrikL@1";
  const client_id = "ooh45L7WXHuQlvQFB39nnXLrXpl4EJN5";
  const client_secret =
    "MJmSILWIOw34riSts8DgXR0gytNWR7uvfeocU1dLojDJQG0GOkwaR3bTrdbAi_qU";
  const audience = "https://dev.api.brikl.com";
  const rsp = await fetch(`/oauth/token`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "password",
      username,
      password,
      audience,
      client_id,
      client_secret,
    }),
  });
  const data = await rsp.json();
  return `Bearer ${data.access_token}`;
}
