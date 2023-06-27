import { getListOfPlaylistObjects } from './modules/playlists_api.js'
import { getListOfRecommendationObjects } from './modules/recommendations_api.js'
import { getArtistSeeds, getAlbumSeeds, getGenreSeeds } from './modules/recommendations_seeds.js'
import { addPlaylistToHTML } from './modules/playlists_dom.js'
import { addRecommendationToHTML } from './modules/recommendations_dom.js'
import { getToken } from './modules/utils.js'
import { userId, clientId, clientSecret } from './modules/constants.js'


async function getUserPlaylists(token) {
  return await fetch("https://api.spotify.com/v1/users/" + userId + "/playlists", {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(
      data => {
        return data
          .json() // extract json object
          .then( // once that's done (promise),
            json => {
              // look thru the different 'items' returned,
              return getListOfPlaylistObjects(json['items']);
            }
          );
      },
      // error handling function
      err => console.log('Something went wrong!', err)
    );
}

function renderPlaylists(playlists) {

  for (let i = 0; i < playlists.length; i++) {
    addPlaylistToHTML(playlists[i]);
  }
}

async function getRecommendations(token, seed_artists, seed_genres, seed_albums) {
  var query = [];
  if (seed_artists && seed_artists.length > 0) {
    query.push("seed_artists=" + seed_artists.join(','));
  }
  if (seed_genres && seed_genres.length > 0) {
    query.push("seed_genres=" + seed_genres.join(','))
  }
  if (seed_albums && seed_albums.length > 0) {
    query.push("seed_albums=" + seed_albums.join(','))
  }


  return await fetch(`https://api.spotify.com/v1/recommendations?${query.join('&')}`, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(
      data => {
        return data
          .json()
          .then(
            json => {
              return getListOfRecommendationObjects(json['tracks']);
            }
          );
      },
      // error handling function
      err => console.log('Something went wrong!', err)
    );
}

function renderRecommendations(recommendations) {

  for (let i = 0; i < recommendations.length; i++) {
    addRecommendationToHTML(recommendations[i]);
  }
}




async function render_page() {

  let token = await getToken(clientId, clientSecret);
  console.log('token', token);


  if (document.title == "Playlists") {

    let playlists = await getUserPlaylists(token);
    console.log(playlists);


    renderPlaylists(playlists);
  }
  if (document.title == "Recommendations") {

    let artistSeeds = getArtistSeeds();
    let genreSeeds = getAlbumSeeds();
    let albumSeeds = getGenreSeeds();


    let recommendations = await getRecommendations(token, artistSeeds, genreSeeds, albumSeeds);

    renderRecommendations(recommendations);
  }
}

console.log('print account info');
console.log(userId, clientId, clientSecret);

render_page()
