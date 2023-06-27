
export function getListOfPlaylistObjects(jsonArray) {
  let playlistobjArr = [];
  for (let i = 0; i < jsonArray.length; i++) {
    playlistobjArr.push({
      name: jsonArray[i]["name"],
      imageUrl: jsonArray[i]["images"] ? jsonArray[i]["images"][0]["url"] : ""
    });
  }
  return playlistobjArr;
}
