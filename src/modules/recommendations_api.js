
export function getListOfRecommendationObjects(jsonArray) {
  let recommendations = [];
  if (!jsonArray)
    return recommendations;
  for (let i = 0; i < jsonArray.length; i++) {
    let arts = [];
    if (jsonArray[i]["artists"]) {
      arts = jsonArray[i].artists.map(a => a.name);
    }
    recommendations.push({
      name: jsonArray[i]["name"] || "",
      previewUrl: jsonArray[i]["preview_url"] || "",
      uri: jsonArray[i]["uri"] || "",
      artists: arts || []
    });

  }

  return recommendations;
}
