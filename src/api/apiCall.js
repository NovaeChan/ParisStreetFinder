import datas from './denominations-emprises-voies-actuelles.json'

export default function FetchData() {
    for(let [i, data] of datas.entries()){
        if(data.typo.includes("VOIE ")){
            datas.splice(i, 1);
        }
        // if(data.typo.includes("PLACE")){
        //     datas.splice(i, 1);
        // }
    }
    return datas;    
}




