
export async function getToken(clientId, clientSecret) {

  const b64conv = btoa(clientId + ':' + clientSecret);
  return await fetch("https://accounts.spotify.com/api/token", {
    body: "grant_type=client_credentials",
    headers: {
      "Authorization": "Basic " + b64conv,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  }).then(

    data => data.json().then(json => {
      return json['access_token']
    }),
    err => console.log('something went wrong', err)
  );
}
