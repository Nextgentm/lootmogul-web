import axios from "axios";
import strapi from "../utils/strapi";

export const getGameRoomOrCreateRoom = async (contest_id, user_id) => {
    console.log("getGameRoomOrCreateRoom", contest_id)
    try {
        if (contest_id && user_id) {
            const room = await getActiveContestRoom(contest_id, user_id)
            console.log("*-*-*-*-*-*-*-*Test*-*-*-*-*-*-*-/-**-", room);
            if (!room?.length) {
                const newCreatedRoom = await strapi.create("rooms",
                    {
                        contest: contest_id,
                        users: [user_id]
                    })
                console.log("newCreatedRoom*-*-*-*-*---*-*-*-*-", newCreatedRoom)
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
                console.log("-=-=-=-=resp*-*-*-*-*-*--**-*-*-*", resp)
                return (newCreatedRoom.data)
            }
            else {
                let data = room[0].users?.data
                if (!data?.find(s => s.id == user_id)) {
                    // const updateUserInRoom = await strapi.update("rooms", room[0].id,
                    //     {
                    //         contest: contest_id,
                    //         users: [...data, user_id]
                    //     }, { populate: ["users"] })
                    // console.log("updateUserInRoom-*-*-*--", updateUserInRoom)
                    let query = "contest/custom-contest/matchfound"
                    const resp = await strapi.request(
                        "post",
                        query,
                        {
                            data: {
                                data: {
                                    contest: contest_id,
                                    users: [...data, user_id],
                                    room: room[0].id
                                }
                            }
                        }
                    );
                    console.log("-=-=-=-=resp", resp)
                    return updateUserInRoom[0]

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
                    console.log("-=-=-=-=res", resp)
                    console.log("user already exist in room", room[0].id)
                    return room[0]
                }
            }

        }
    }
    catch (e) {
        console.log(e)
        return false
    }
}

const getActiveContestRoom = async (contest_id, user_id) => {
    try {
        // const activeRoom = await strapi.find("rooms", {
        //     filters: {
        //         contest: contest_id
        //     },
        //     populate: ["contest", "users"]
        // })
        // console.log("activeRoom", activeRoom)
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:1337/api/rooms?filters%5Bcontest%5D=1771&populate%5B0%5D=contest&populate%5B1%5D=users',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM2MjQsImlhdCI6MTY3ODY5NjI3OSwiZXhwIjoxNjc4NzAzNDc5fQ.miTJ0ISsiAl2rvRMINWwmtgn888xBP1rvIpSmbYHgU4'
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        // return activeRoom?.data
    }
    catch (e) {
        console.log(e)
        return false
    }
}