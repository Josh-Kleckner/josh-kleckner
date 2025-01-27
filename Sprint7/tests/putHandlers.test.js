// eslint-disable-next-line no-undef
const config = require('../config');

const requestBody = {
	"productsList": [
        {
            "id": 3,
            "quantity": 2
        }
    ]
}

// POSITIVE TEST FOR RESPONSE STATUS CODE WITH VALID REQUEST BODY - Changing the kit
test('', async () => {
    let actualStatus;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/kits/3`, {
			method: 'PUT',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		actualStatus = response.status;
	} catch (error) {
		console.error(error);
	}
	expect(actualStatus).toBe(200);
});


// NEGATIVE TEST FOR RESPONSE STATUS CODE WITH INVALID kit id - Changing the kit
test('Response status code should be 404 for invalid id', async () => {
       let actualStatus;
    try {
        const response = await fetch(`${config.API_URL}/api/v1/kits/3333`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        actualStatus = response.status;
    } catch (error) {
        console.error('Error making the API request:', error);
    }
    expect(actualStatus).toBe(404);
});


//TEST FOR RESPONSE BODY CONTAINING EXPECTED DATA - Changing the kit
test('Response body should contain "ok": true upon successful request', async () => {
	let actualResponseBody;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/kits/3`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		actualResponseBody = await response.json();
	} catch (error) {
		console.error(error);
	}
	expect(actualResponseBody.ok).toBe(true);
});