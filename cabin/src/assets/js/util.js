export function unique (arr) {
    var unique = {};
    arr.forEach(function(a){ unique[ JSON.stringify(a) ] = 1 });
    arr= Object.keys(unique).map(function(u){return JSON.parse(u) });
    return arr
  }