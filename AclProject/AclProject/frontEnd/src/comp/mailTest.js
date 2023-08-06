
import axios from "axios"
import React, { useState } from "react"

function MailTest() {
	const [ sent, setSent ] = useState(false)
	const [ text, setText ] = useState("")
	const handleSend = async (e) => {
		setSent(true)
		try {
			await axios.post("http://localhost:8000/sendMail", {
				text
			})
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="App">
			{!sent ? (
				<form onSubmit={handleSend}>
					<input type="text" value={text} onChange={(e) => setText(e.target.value)} />

					<button type="submit">Send Email</button>
				</form>
			) : (
				<h1>Email Sent</h1>
			)}
		</div>
	)
}

export default MailTest