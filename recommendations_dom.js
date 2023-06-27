
export function addRecommendationToHTML(recommendation) {
  const ul = document.getElementById("recommendations-ul");
  const li = document.createElement('li');
  li.innerHTML = `
 
  <h3> <a href='${recommendation["previewUrl"]}'>${recommendation.name} </a></h3>
  <div>
  ${recommendation.artists.join(",")}
  </div>
 
`;
  ul.append(li);
}
