// eslint-disable-next-line no-undef
const config = require('../config');

// eslint-disable-next-line no-undef

const requestBody = {
	"productsList": [
        {
            "id": 7,
            "quantity": 4
        }
    ]
}

//POSTIVE TEST FOR RESPONSE STATUS CODE WITH VALID REQUEST BODY - Creating a shopping cart
test('Response status code should be 201', async () => {
	let actualStatus;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		actualStatus = response.status;
	} catch (error) {
		console.error(error);
	}
	expect(actualStatus).toBe(201);
});


// NEGATIVE TEST FOR RESPONSE STATUS CODE WITH INVALID REQUEST BODY - Creating a shopping cart
test('Response status code should not be 201 for invalid id', async () => {
    const invalidRequestBody = { 
        "productsList": [
            {
                "id": 9999,
                "quantity": 4
            }
        ]
    };
    let actualStatus;
    try {
        const response = await fetch(`${config.API_URL}/api/v1/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invalidRequestBody)
        });
        actualStatus = response.status;
    } catch (error) {
        console.error('Error making the API request:', error);
    }
    expect(actualStatus).not.toBe(201);
});

//TEST FOR RESPONSE BODY CONTAINING EXPECTED DATA - Creating a shopping cart
test('Response body should contain warehouse "Fresh Food"', async () => {
	let actualResponseBody;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		actualResponseBody = await response.json();
	} catch (error) {
		console.error(error);
	}
	expect(actualResponseBody.wareHouse).toContain("Fresh Food");
});