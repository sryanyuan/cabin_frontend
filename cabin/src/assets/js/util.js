export function formatError(error) {
  if (!error.response) {
    return error.message
  }
  let response = error.response
  if (response.status != 480) {
    // Other error
    return "Request failed with status code " + error.response.status
  }
  // Get the error object
  if (response.data.code == 2) {
    // Need login
    return {login: true}
  }
  return response.data.message
}
