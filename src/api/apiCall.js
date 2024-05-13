export default async function fetchData(url) {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Erreur de chargement du fichier JSON");
    }
    return await response.json();
}