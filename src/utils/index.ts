export const searchToJson = (search: string) =>{
    let searchArray = search.substring(1).split('&');
    let searchJson: any = {};
    searchArray.forEach(function(val){
        const values = val.split('=')
        searchJson[values[0]] = values[1];
    });

    return searchJson;
}