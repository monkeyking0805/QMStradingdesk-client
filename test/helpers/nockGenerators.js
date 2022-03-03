const nock = require('nock')
const httpOptions = require('../fixtures').mockHTTP

// Not much concern about design patterns and code style in test file
export default function nockGenerate (options, logs = false) {
  const {
    uri,
    uriParams,
    method,
    statusCode,
    request,
    response
  } = options

  // Option request alway need to set due HTTP Protocols
  nock(uri)
    .defaultReplyHeaders(httpOptions.mockReplyHeader)
    .options(uriParams)
    .reply(200)
  const nockGenerate = nock(uri).defaultReplyHeaders(httpOptions.mockReplyHeader)
  if (logs) {
    nockGenerate.log(console.log)
  }
  switch (method) {
    case httpOptions.httpMethod.get:
      nockGenerate.get(uriParams)
        .reply(statusCode, response)
      break
    case httpOptions.httpMethod.post:
      nockGenerate.post(uriParams, request)
        .reply(statusCode, response)
      break
    case httpOptions.httpMethod.put:
      nockGenerate.put(uriParams, request)
        .reply(statusCode, response)
      break
    case httpOptions.httpMethod.delete:
      nockGenerate.delete(uriParams)
        .reply(statusCode, response)
      break
  }
}
