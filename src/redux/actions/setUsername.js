import {USERNAME} from "../actionTypes"

export default function setUsername(username) {
    return {
        type: USERNAME,
        username: username
    }
}