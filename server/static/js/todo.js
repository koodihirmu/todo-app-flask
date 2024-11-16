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
	} catch (error) {
		console.log(error.message)
	}
}

const deleteEvent = function() {
	deleteRequest({ id: this.parentNode.id })
	this.parentNode.parentNode.removeChild(this.parentNode)
}

const completeEvent = function() {
	updateRequest({ id: this.parentNode.id })
	const p = this.parentNode.querySelector("p")
	if (p.className == "completed") {
		p.className = ""
	} else {
		p.className = "completed"
	}
}

const form = document.querySelector("form")

form.addEventListener('submit', async (evt) => {
	evt.preventDefault()
	const formData = new FormData(form)
	// form data to javascript
	let object = {}
	formData.forEach((value, key) => object[key] = value);
	const htmlRequest = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(object),
	}
	try {
		const response = await fetch("/add", htmlRequest)
		if (!response.ok) {
			throw new Error(response.message)
		}
		const json_response = await response.json()
		const todoList = document.querySelector("#todo-list")
		const li = document.createElement("li")
		li.id = json_response.id
		const p = document.createElement("p")
		p.innerText = object["todo-title"]
		const dButton = document.createElement("button")
		dButton.id = "delete_item"
		dButton.innerText = "DELETE"
		dButton.addEventListener('click', deleteEvent)
		const cButton = document.createElement("button")
		cButton.id = "complete_item"
		cButton.innerText = "COMPLETE"
		cButton.addEventListener('click', completeEvent)
		li.appendChild(p)
		li.appendChild(dButton)
		li.appendChild(cButton)
		todoList.appendChild(li)
		form.reset()
	} catch (error) {
		console.log(error)
	}
})


const deleteButton = document.querySelectorAll("#delete_item")
const completeButton = document.querySelectorAll("#complete_item")
deleteButton.forEach(button => button.addEventListener('click', deleteEvent))
completeButton.forEach(button => button.addEventListener('click', completeEvent))
