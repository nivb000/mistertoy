const BASE_URL = process.env.NODE_ENV === 'production'
    ? `${window.location.protocol}/api/`
    : 'http://localhost:3000/api/'

export const httpService = {
    get(endpoint, cache, data) {
        return ajax(endpoint, 'GET', cache, data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null, cache = 'no-cache') {

    try {
        const url = `${BASE_URL}${endpoint}`
        const res = await fetch(url, {
            cache,
            method,
            body: (method !== 'GET') ? JSON.stringify(data) : null
        })
        return res.json()
    } catch (err) {
        if (err.response && err.response.status === 401) {
            sessionStorage.clear();
            window.location.assign('/')
        }
        throw err
    }
}