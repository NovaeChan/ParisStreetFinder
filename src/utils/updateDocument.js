export function updateFoundStreetSideBar(streetFound){
    const ul = document.querySelector('.sideBar-streetFound');
    const lis = ul.querySelectorAll('li');

    for(let i = lis.length; i < streetFound.length; i++ ){
      const li = document.createElement("li");
      li.textContent = streetFound[i].typo_min;
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
    map.addLayer({
      'id': streetFound[i].id+"fill",
      'type': 'fill',
      'source': {
        type: "geojson",
        data: streetFound[i].data
      },
      'layout': {},
      'paint': {
        'fill-color': '#0080ff', // blue color fill
        'fill-opacity': 0.5
      }
    });
    map.addLayer({
      'id': streetFound[i].id+"outline",
      'type': 'line',
      'source': {
        type: "geojson",
        data: streetFound[i].data
      },
      'layout': {},
      'paint': {
          'line-color': '#000',
          'line-width': 1
      }
    })
    index = i+1;
  }
  return index;
}