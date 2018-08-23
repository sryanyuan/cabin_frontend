export function unique (arr) {
    var unique = {};
    arr.forEach(function(a){ unique[ JSON.stringify(a) ] = 1 });
    arr= Object.keys(unique).map(function(u){return JSON.parse(u) });
    return arr
  }

export function formatError(error) {
  if (error.response) {
    if (error.response.status == 480) {
      if (typeof(error.response.data.message) == "string") {
        return error.response.data.message
      }
    } else {
      return "Request failed with status code " + error.response.status
    }
  } else {
    return error.message
  }
}
