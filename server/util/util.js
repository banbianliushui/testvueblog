/**
 * Created by xiaozhu on 2018/3/17.
 */
function trim(x) {
    return (x+'').replace(/^\s+|\s+$/g,'');
}

module.exports = {
    trim : trim
}