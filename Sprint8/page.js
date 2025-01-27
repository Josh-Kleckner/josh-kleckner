module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cvvField: '.card-code-input #code',
    cardNumberField: '#number',
    driverMessageField: '#comment',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: 'div=Supportive',
    paymentMethodButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[2]',
    addCardButton: '//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/div[3]',
    linkCardButton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[3]/button[1]',
    closeCardModalButton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/button',
    paymentCard: 'div=Card',
    orderRequirements: '.reqs-arrow',
    blanketSlider: '.switch',
    blanketSliderEnabled: 'div.r-sw-container input.switch-input',
    addIceCreamButton: '.counter-plus',
    addICButtonDisabled: '.counter-plus.disabled',
    carSearchButton: '.smart-button',
    orderDetailsButton: 'button.order-button=Details',
    
    // Modals
    phoneNumberModal: '.modal',
    paymentModal: '//*[@id="root"]/div/div[2]/div[2]/div[1]',
    addCardModal: '//*[@id="root"]/div/div[2]/div[2]/div[2]',
    carSearchModal: '.order-header-content',
    driverInfoModal: '.order-body',
    driverInfoOrderNumber: '.order-number',
    driverName: 'div.order-button[style="cursor: default;"] div',

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    selectSupportive: async function() {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
    },

    addCreditCard: async function() {
        // Click Payment Method button & verify payment modal opens
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const paymentModal = await $(this.paymentModal);
        await expect(paymentModal).toBeExisting();
    
        // Click add card and expect modal opens
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const addCardModal = await $(this.addCardModal);
        await expect(addCardModal).toBeExisting();
    
        // Input card number and CVV, then click Link
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue('123412341234');
        const cvvField = await $(this.cvvField);
        //await codeField.scrollIntoView();
        await cvvField.waitForDisplayed();
       
        await cvvField.setValue('11');

        await browser.keys('Tab');
    
        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.waitForClickable();
        await linkCardButton.click();
    },
     // Sometimes the app loads with the requirements section already open -- this is to check for that before clicking
    checkAndOpenOrderRequirements: async function() {
        const orderRequirements = await $(this.orderRequirements);
        await orderRequirements.scrollIntoView();
        const isOrderRequirementsOpen = await orderRequirements.getAttribute('class');

        // Check if 'open' class is missing, and click to open if necessary
        if (!isOrderRequirementsOpen.includes('open')) {
            await orderRequirements.click();
        }
    },

    checkCarSearchModalAppears: async function(){
        const carSearchButton = await $(this.carSearchButton);
        await expect(carSearchButton).toBeDisplayed();
        await carSearchButton.click();
        const carSearchModal = await $(this.carSearchModal);
        await carSearchModal.waitForDisplayed();
    },
};