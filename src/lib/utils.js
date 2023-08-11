/**
 * @param {unknown} value
 */
function safe_display(value) {
    if (typeof(value) == "object") {
        return JSON.stringify(value)
    } else {
        return value
    }
}

export { safe_display };