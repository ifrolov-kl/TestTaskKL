import * as supertest from 'supertest'
const url = 'https://restcountries.eu'

const allowAllRequests = () => true

const defaultHeadersHook = (host: string, method = 'post') => (...args) =>
  supertest(host)
    [method](...args)
    .set('Content-Type', 'application/json')
    .set('Accept', '*/*')
    .ok(allowAllRequests)


const generateDefaultRequestHooks = (host: string) => {
    return {
      delete: defaultHeadersHook(host, 'delete'),
      get: defaultHeadersHook(host, 'get'),
      patch: defaultHeadersHook(host, 'patch'),
      post: defaultHeadersHook(host, 'post'),
      put: defaultHeadersHook(host, 'put'),
    }
  }

export const restCountriesRequest = generateDefaultRequestHooks(url)