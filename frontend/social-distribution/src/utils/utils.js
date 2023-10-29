export function authorUUID(id) {
    const splitArray = id.split("authors/");
    let UUID = splitArray[1];
    if (id.slice(-1) === '/') {
        UUID = UUID.slice(0, -1);   //remove end slash
    }
    return UUID;
}

export function postUUID(id){
    const splitArray = id.split("posts/");
    let UUID = splitArray[1];
    if (id.slice(-1) === '/') {
        UUID = UUID.slice(0, -1);   //remove end slash
    }   
    return UUID;
}