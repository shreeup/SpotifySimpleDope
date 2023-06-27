
export function addPlaylistToHTML(playlistObject) {
  const ul = document.getElementById("playlists-ul");
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.setAttribute("src", playlistObject.imageUrl);
  img.setAttribute("style", "max-width:200px;max-height:200px");
  const div = document.createElement('div');
  div.setAttribute('class', 'play');
  const span = document.createElement('span');
  span.setAttribute("class", "fa fa-play")
  div.append(span);
  li.append(img);
  li.append(div);
  const h4 = document.createElement('h4');
  h4.innerHTML = `${playlistObject.name}`;
  li.append(h4);
  const p = document.createElement('p');
  p.innerHTML = `${playlistObject.name}`;
  li.append(p);
  ul.append(li);
}