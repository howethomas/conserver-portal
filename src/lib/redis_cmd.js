/**
 * @param {string[]} cmd_array
 */
async function redis_cmd(cmd_array, host_url='http://localhost:7379/') {
    let cmd_path = cmd_array.join('/')
      const response = await fetch(host_url + cmd_path);
    const r_json = await response.json();
    return(r_json[cmd_array[0]])
}

export { redis_cmd };