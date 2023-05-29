import axios from "axios";
import strapi from "../utils/strapi";

export const getGameRoomOrCreateRoom = async (contest_id, user_id) => {
    
    try {
        if (contest_id && user_id) {
            const room = await getActiveContestRoom(contest_id, user_id)
            
            if (!room?.length) {
                const newCreatedRoom = await strapi.create("rooms",
                    {
                        contest: contest_id,
                        users: [user_id]
                    })
                
                let query = "contest/custom-contest/matchfound"
                const resp = await strapi.request(
                    "post",
                    query,
                    {
                        data: {
                            data: {
                                contest: contest_id,
                                users: [user_id],
                                room: newCreatedRoom?.data
                            }
                        }
                    }
                );
                
                return (newCreatedRoom.data)
            }
            else {
                let data = room[0].users?.data
                if (!data?.find(s => s.id == user_id)) {
                    // const updateUserInRoom = await strapi.update("rooms", room[0].id,
                    //     {
                    //         contest: contest_id,
                    //         users: [...data?.map(s => s.id), user_id]
                    //     }, { populate: ["users"] })
                    
                    let query = "contest/custom-contest/matchfound"
                    const resp = await strapi.request(
                        "post",
                        query,
                        {
                            data: {
                                data: {
                                    contest: contest_id,
                                    users: [...data?.map(s => s.id), user_id],
                                    room: room[0].id
                                }
                            }
                        }
                    );
                    
                    return room[0]

                }
                else {
                    let query = "contest/custom-contest/matchfound"
                    const resp = await strapi.request(
                        "post",
                        query,
                        {
                            data: {
                                data: {
                                    contest: contest_id,
                                    users: [...data?.map(s => s.id), user_id],
                                    room: room[0].id
                                }
                            }
                        }
                    );
                    
                    return room[0]
                }
            }

        }
    }
    catch (e) {
        
        return false
    }
}

const getActiveContestRoom = async (contest_id, user_id) => {
    try {
        const activeRoom = await strapi.find("rooms", {
            filters: {
                contest: contest_id
            },
            populate: ["contest", "users"]
        })
        
        

        return activeRoom?.data
    }
    catch (e) {
        
        return false
    }
}