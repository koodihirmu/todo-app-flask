'use strict'

const deleteRequest = async (request) => {
	const html_request = {
		method: "DELETE",
		body: JSON.stringify(request),
		headers: {
			"Content-Type": "application/json",
		}
	}
	try {
		const response = await fetch("/delete", html_request)
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}
		console.log(response.status)
		window.location.reload()
	} catch (error) {
		console.log(error.message)
	}
}

const updateRequest = async (request) => {
	const html_request = {
		method: "PUT",
		body: JSON.stringify(request),
		headers: {
			"Content-Type": "application/json",
		}
	}
	try {
		const response = await fetch("/update", html_request)
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}
		console.log(response.status)
		window.location.reload()
	} catch (error) {
		console.log(error.message)
	}
}
