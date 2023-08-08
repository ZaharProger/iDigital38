import {REMOVED_BLOCKS} from "../actionTypes"

export default function SetRemovedBlocks(blocks) {
    return {
        type: REMOVED_BLOCKS,
        removed_blocks: blocks
    }
}