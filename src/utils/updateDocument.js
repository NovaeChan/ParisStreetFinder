export function updateFoundStreetSideBar(streetFound){
    const ul = document.querySelector('.sideBar-streetFound');
    const lis = ul.querySelectorAll('li');

    for(let i = lis.length; i < streetFound.length; i++ ){
      const li = document.createElement("li");
      li.textContent = streetFound[i].l_longmin;
      ul.append(li);
    }
}

export function updatePercentage(streetFound, datas){
    const numbersOfStreet = datas.length;
    const percentNumber = document.querySelector('.percentNumber');
    const percentBar = document.querySelector('.sideBar-percentageBar');
    const percentage = Math.round(((streetFound.length / numbersOfStreet ) * 100)*1000)/1000;
    //Update bar
    percentBar.style.setProperty("--progress", percentage+"%");
    percentBar.style.transition = "width 2s ease 2s";
    //Update number
    percentNumber.innerHTML = percentage;
}

export function updateMap(streetFound, map, index){
  for(let i = index; i < streetFound.length; i++){
    console.log(streetFound);
    console.log(map);
    map.addSource("id"+streetFound[i].id, {
      'type': 'geojson',
      'data': streetFound[i].data
    });
    map.addLayer({
      'id': streetFound[i].id+"line",
      'type': 'line',
      'source': "id"+streetFound[i].id,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#0080ff',
        'line-width': 6
      }
    });
    index = i+1;
  }
  return index;
}