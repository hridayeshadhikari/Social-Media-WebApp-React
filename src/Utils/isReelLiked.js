export const isReelLiked = (reqUserId, reel) => {
    if (reel?.liked) {
        for (let user of reel?.liked) {
            if (reqUserId === user.id) {
                return true;
            }
        }
    }
    return false;
}

export const numberOfLikes = (reel) => {
    return(reel?.liked?.length)
}
