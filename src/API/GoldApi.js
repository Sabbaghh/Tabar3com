const myHeaders = new Headers()
myHeaders.append('x-access-token', 'goldapi-e8ueuknzmvfhc-io')
myHeaders.append('Content-Type', 'application/json')

export const requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
}
