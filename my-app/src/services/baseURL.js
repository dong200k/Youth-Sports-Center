// const baseURL = "http://localhost:5000/api/v1/youthsportcenter"
let baseURL
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    baseURL = "http://localhost:5000/api/v1/youthsportcenter"
  } else {
    // production code
    baseURL = "https://sproj-youth-sport-center.herokuapp.com/api/v1/youthsportcenter"
  }
export default baseURL