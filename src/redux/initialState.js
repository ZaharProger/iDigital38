export const initialLandingState = {
    events: [],
    forum_programme: [],
    gallery_items: [
        {
            id: 0,
            image: require('..//assets//pics//gallery//0.png')
        },
        {
            id: 1,
            image: require('..//assets//pics//gallery//1.png')
        },
        {
            id: 2,
            image: require('..//assets//pics//gallery//2.png')
        },
        {
            id: 3,
            image: require('..//assets//pics//gallery//3.png')
        },
        {
            id: 4,
            image: require('..//assets//pics//gallery//4.png')
        },
        {
            id: 5,
            image: require('..//assets//pics//gallery//5.png')
        }
    ],
    organizers: []
}

export const initialAdminState = {
    data: Array(),
    removed_timetable: Array(),
    removed_blocks: Array(),
    removed_reports: Array(),
    username: null
}
