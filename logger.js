function info(...params) {
    console.info(params);
}


function error(...params) {
    console.error(params);
}



function warn(...params) {
    console.warn(params);
}


function log(...params) {
    console.log(params);
}


module.exports = {
    info, 
    warn,
    error,
     log
}