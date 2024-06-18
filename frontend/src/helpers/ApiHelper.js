export const handleError = (err) => {
  if (!err.response) {
    //network error
    return {
      statusCode: 0,
      message   : "No internet connection",
    }
  }

  return err.response.data;
}
