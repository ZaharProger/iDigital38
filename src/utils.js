export const prepareTime = (time) => {
    let creationTimeHours = Math.trunc(time / 3600)
    let creationTimeMinutes = Math.trunc((time - creationTimeHours * 3600) / 60)

    creationTimeHours = creationTimeHours < 10? `0${creationTimeHours}` : creationTimeHours
    creationTimeMinutes = creationTimeMinutes < 10? `0${creationTimeMinutes}` : creationTimeMinutes

    return `${creationTimeHours}:${creationTimeMinutes}`
}

export const parseTime = (time) => {
    const [hours, minutes] = time.split(':').map(item => parseInt(item, 10))
    return hours * 3600 + minutes * 60
}

export const mapTimetableFormsToObjects = (timetable) => {
    return Array.from(document.querySelectorAll('.Day-timetable-form'))
        .map((timetableForm, index) => {
            const timetableObject = {
                name: timetableForm.querySelector('input[name=name]').value,
                time_start: (
                    parseTime(timetableForm.querySelector('input[name=time_start]').value)
                ),
                moderators: timetableForm.querySelector('textarea[name=moderators]').value,
                speakers: timetableForm.querySelector('textarea[name=speakers]').value
            }

            const timeEnd = timetableForm.querySelector('input[name=time_end]').value
            if (timeEnd != '') {
                timetableObject.time_end = parseTime(timeEnd)
            }
            if (timetable[index] !== undefined && timetable[index].id !== undefined) {
                timetableObject.id = timetable[index].id
            }

            return timetableObject
        })
}

export const mapMainFormToObject = (data) => {
    const objectData = {}
    if (data !== undefined && data.id !== undefined) {
        objectData.id = data.id
    }

    Array.from(document.querySelectorAll('input'))
        .filter(input => input.parentElement.tagName.toLowerCase() === 'form')
        .forEach(input => objectData[input.name] = input.value)

    return objectData
}

export const mapBlockFormsToObjects = (blocks) => {
    return Array.from(document.querySelectorAll('.Day-block-form'))
        .map((blockForm, index) => {
            const blockObject = {
                name: blockForm.querySelector('input[name=name]').value,
                place: blockForm.querySelector('input[name=place]').value,
                moderators: blockForm.querySelector('textarea[name=moderators]').value,
                reports: mapReportFormsToObjects(blockForm, blocks[index].reports)
            }

            if (blocks[index] !== undefined && blocks[index].id !== undefined) {
                blockObject.id = blocks[index].id
            }

            return blockObject
        })
}

export const mapReportFormsToObjects = (block, reports) => {
    return Array.from(block.querySelectorAll('.Report-form'))
        .map((reportForm, index) => {
            const reportObject = {
                name: reportForm.querySelector('input[name=name]').value,
                time_start: parseTime(
                    reportForm.querySelector('input[name=time_start]').value
                ),
                time_end: parseTime(
                    reportForm.querySelector('input[name=time_end]').value
                ),
                speakers: reportForm.querySelector('textarea[name=speakers]').value
            }

            if (reports[index] !== undefined && reports[index].id !== undefined) {
                reportObject.id = reports[index].id
            }

            return reportObject
        })
}

export const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : '';
}
