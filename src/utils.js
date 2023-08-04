export const prepareTime = (time) => {
    let creationTimeHours = Math.trunc(time / 3600)
    let creationTimeMinutes = Math.trunc((time - creationTimeHours * 3600) / 60)

    creationTimeHours = creationTimeHours < 10? `0${creationTimeHours}` : creationTimeHours
    creationTimeMinutes = creationTimeMinutes < 10? `0${creationTimeMinutes}` : creationTimeMinutes

    return `${creationTimeHours}:${creationTimeMinutes}`
}