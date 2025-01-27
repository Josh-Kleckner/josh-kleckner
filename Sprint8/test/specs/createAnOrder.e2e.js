const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

    it('should set route using addresses & taxi', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    })

    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    })

    it('should select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        await expect ($(page.supportivePlanButton).parentElement()).toHaveElementClass("active");
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should save the credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addCreditCard();
        const paymentCard=await $(page.paymentCard);
        await paymentCard.waitForDisplayed();
        await expect(paymentCard).toBeExisting();
    })

    it('should write a message for driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const driverMessageField = await $(page.driverMessageField);
        await driverMessageField.waitForDisplayed();
        await driverMessageField.setValue("I'm wearing green");
        const fieldValue = await driverMessageField.getValue();
        await expect(fieldValue).toBe("I'm wearing green");
    })

    it('should order a blanket & handerchief', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const orderRequirements = await $(page.orderRequirements);
        await orderRequirements.scrollIntoView();
        await orderRequirements.click();
        // Sometimes the app loads with the requirements section already open -- this is to check for that before clicking
        await page.checkAndOpenOrderRequirements();
        // Continue with enabling blanket & handkerchief slider
        const blanketSlider = await $(page.blanketSlider);
        await blanketSlider.waitForClickable();
        await blanketSlider.click();
        const blanketSliderEnabled = await $(page.blanketSliderEnabled)
        await expect(blanketSliderEnabled).toBeChecked();
    })

    it('should order two Ice Creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
         // Sometimes the app loads with the requirements section already open -- this is to check for that before clicking
         await page.checkAndOpenOrderRequirements();
         const addIceCream = await $(page.addIceCreamButton);
         await addIceCream.click();
         await addIceCream.click();
         const addICButtonDisabled = await $(page.addICButtonDisabled);
         await expect(addICButtonDisabled).tobeDisabled;
    })

    it('should open car search modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const driverMessageField = await $(page.driverMessageField);
        await driverMessageField.waitForDisplayed();
        await driverMessageField.setValue("I'm wearing green");
        // Begin car search modal test
        await page.checkCarSearchModalAppears();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    })

    it('should show driver info after car search countdown', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const driverMessageField = await $(page.driverMessageField);
        await driverMessageField.waitForDisplayed();
        await driverMessageField.setValue("I'm wearing green");
        await page.checkCarSearchModalAppears();
        // Begin testing for driver info modal
        await browser.pause(30000); //30 second countdown until the driver info modal opens
        const driverInfoModal = await $(page.driverInfoModal);
    // Is it alright to have multiple expects here since we are checking that all the driver info is showing? Or do we assume if one shows, they all show?
        await expect(driverInfoModal).toBeExisting();
        const driverName = await $(page.driverName);
        await expect(driverName).toBeExisting();
        const orderNumber = await $(page.driverInfoOrderNumber);
        await expect(orderNumber).toBeExisting();
    })
})