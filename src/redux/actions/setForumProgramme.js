import {FORUM_PROGRAMME} from "../actionTypes"

export default function setForumProgramme(forumProgramme) {
    return {
        type: FORUM_PROGRAMME,
        forum_programme: forumProgramme
    }
}