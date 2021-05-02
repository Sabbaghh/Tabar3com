const myHeaders = new Headers()
myHeaders.append('x-access-token', process.env.REACT_APP_GOLD_API)
myHeaders.append('Content-Type', 'application/json')

export const requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
}
