//POSITIVE TEST FOR RESPONSE STATUS CODE - Get list of warehouses
// eslint-disable-next-line no-undef
const config = require('../config');

test('Response status code should 200', async () => {
	let actualStatus;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/warehouses`);
		actualStatus = response.status;
	} catch (error) {
		console.error(error);
	}
	expect(actualStatus).toBe(200);
});

//NEGATIVE TEST FOR RESPONSE STATUS CODE WITH INVALID ENDPOINT - Get list of warehouses
// eslint-disable-next-line no-undef

test('Response status code should 404', async () => {
	let actualStatus;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/warehouses123`);
		actualStatus = response.status;
	} catch (error) {
		console.error(error);
	}
	expect(actualStatus).toBe(404);
});


//POSITIVE TEST FOR BODY RESPONSE WITH VALID WAREHOUSE NAME - Get list of warehouses
// eslint-disable-next-line no-undef

test('Response body should contain "Food City"', async () => {
	let actualResponseBody;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/warehouses`);
		actualResponseBody = await response.json();
		} catch (error) {
			console.error(error);
		}
	expect(actualResponseBody[2].name).toContain("Food City");
});

//NEGATIVE TEST FOR BODY RESPONSE WITH INVALID WAREHOUSE NAME - Get list of warehouses
// eslint-disable-next-line no-undef

test('Response body should NOT contain "Wrong Warehouse"', async () => {
	let actualResponseBody;
	try {
		const response = await fetch(`${config.API_URL}/api/v1/warehouses`);
		actualResponseBody = await response.json();
		} catch (error) {
			console.error(error);
		}
	expect(actualResponseBody[2].name).not.toContain("Wrong Warehouse");
});