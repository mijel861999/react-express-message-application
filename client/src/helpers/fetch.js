// const baseUrl = import.meta.env.REACT_APP_URL
const baseUrl = 'http://localhost:3001/api/v1'

const fetchSinToken = (endpoint, data, method) => {
  const url = `${baseUrl}/${endpoint}`

  if (method === 'GET') {
    /* eslint-disable */
    return fetch(url)
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

const fetchConToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`
  const token = localStorage.getItem('token') || ''

  console.log(token)

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token
      }
    })
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(data)
    })
  }
}

export {
  fetchConToken,
  fetchSinToken
}
