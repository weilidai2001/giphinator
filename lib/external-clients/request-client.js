const request = require('request')

module.exports = {
  getJson(url, params) {
    return new Promise((resolve, reject) => {
      const query = {
        url: url,
        qs: params,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      request(query, (err, res, body) => {
        if (err || res.statusCode >= 400) {
          reject(err)
        }

        resolve(body)
      })   
    })
  }
}
