import {DATA} from "../actionTypes"

export default function SetData(newData) {
    return {
        type: DATA,
        data: newData
    }
}