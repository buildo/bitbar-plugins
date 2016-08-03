import request from 'request'

const fetchOne = (endpoint) => new Promise((resolve, reject) => {
  request.get({url: endpoint, headers: { 'User-Agent': 'github-bitbar-counter' } }, (error, response, body) => {
    if (error) {
      reject(error)
    }
    resolve(JSON.parse(body))
  })
})

export default (...endpoints) => Promise.all(endpoints.map(fetchOne))
