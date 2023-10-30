export function authorUUID() {
    const author = localStorage.getItem("user");
    if (author) {
      const authorUUID = author.split(":")[1]; // Check if author is not null before calling split
      return authorUUID;
    }
    return null;
  }

export function postUUID(id){
    const splitArray = id.split("posts/");
    let UUID = splitArray[1];
    if (id.slice(-1) === '/') {
        UUID = UUID.slice(0, -1);   //remove end slash
    }   
    return UUID;
}