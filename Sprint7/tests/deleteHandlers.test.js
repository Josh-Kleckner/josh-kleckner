// eslint-disable-next-line no-undef
const config = require('../config');

//POSITIVE RESPONSE STATUS CODE - Deleting the kit
test('Response status code should be 200', async () => {
	let actualStatus;
    try {
		const response = await fetch(`${config.API_URL}/api/v1/kits/6`, {
			method: 'DELETE',
		});
		actualStatus = response.status;
	} catch (error) {
		console.error(error);
	}
	expect(actualStatus).toBe(200);
});

//NEGATIVE RESPONSE STATUS CODE - Deleting the kit
test('Response status code should NOT be 200 with invalid kit id endpoint', async () => {
	let actualStatus;
    try {
		const response = await fetch(`${config.API_URL}/api/v1/kits/invalid-id`, {
			method: 'DELETE',
		});
		actualStatus = response.status;
	} catch (error) {
		console.error(error);
	}
	expect(actualStatus).not.toBe(200);
});


//TEST FOR RESPONSE BODY CONTAINING EXPECTED DATA - Deleting the kit
test('Response body should be true upon successful request', async () => {
	let actualResponseBody;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/kits/6`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		actualResponseBody = await response.json();
	} catch (error) {
		console.error(error);
	}
	expect(actualResponseBody.ok).toBe(true);
});