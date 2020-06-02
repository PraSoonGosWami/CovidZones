const dateFormat = {
    year: "numeric",
    month: "short",
    day: "numeric"
}

const timeFormat = {
    hour : "numeric",
    minute : "2-digit"
}
export const getDateAndTime = (dt) => {
    const date = dt.split(' ')
    const reFormatedDate = date[0].split('/')
    const x = `${reFormatedDate[1]}/${reFormatedDate[0]}/${reFormatedDate[2]} ${date[1]}`
    const d = new Date(x)
    const res = d.toLocaleDateString("en",dateFormat) + " " + d.toLocaleTimeString("en",timeFormat)
    return res
}