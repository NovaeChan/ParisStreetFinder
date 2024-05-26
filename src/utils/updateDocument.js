export function updateSideBar(streets){
  console.log(streets);
    const ul = document.querySelector('.sideBar-streetFound');
    streets.forEach(street => {
      const li = document.createElement("li");
      li.textContent = street.l_longmin;
      ul.insertBefore(li, ul.firstChild);
    })
}

export function updatePercentage(streetFound, datas){
    const numbersOfStreets = datas.length;
    const percentNumber = document.querySelector('.percentNumber');
    const percentBar = document.querySelector('.sideBar-percentageBar');
    const percentage = Math.round(((streetFound.length / numbersOfStreets ) * 100)*1000)/1000;
    //Update progress bar
    percentBar.style.setProperty("--progress", percentage+"%");
    percentBar.style.transition = "width 2s ease 2s";
    //Update number showed
    percentNumber.innerHTML = percentage;
}

export function updateMap(streets, map){
  for(let i = 0; i < streets.length; i++){
    map.current.addSource("id"+streets[i].id,{
      "type": "geojson",
      "data": streets[i].data
    });
    map.current.addLayer({
      'id': streets[i].id+"line",
      'type': 'line',
      'source': "id"+streets[i].id,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#0080ff',
        'line-width': 6
      }
    })
  }
}