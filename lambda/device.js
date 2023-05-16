import Alexa from 'ask-sdk-core'

import { getGeoCoordinates } from './maps.js';

/**
 * Returns device country and postal code address object
 * @param  {Object}  handlerInput
 * @return {Promise}
 */

const getDeviceAddress = async (handlerInput) => {
    const deviceId = Alex.getDeviceId(handlerInput.requrestEnvelope);
    const deviceAddressServiceClient = handlerInput.serviceClientFactory.getDeviceAddressServiceClient();
    const address = ['read::alexa:device:all:address:country_and_postal_code'];

    try{
        return await deviceAddressServiceClient.getCountryAndPostalCode(deviceId);
    }
    catch(error){
        console.error('Unable ot get device address');
        handlerInput.responseBuilder.withAskForPermissionsConsentCard(permissions);
        throw 'error.device_address';
    }
};

/**
 * Returns device location coordinates
 * @param  {Object}  handlerInput
 * @return {Promise}
 */

export const getDeviceLocation = async (handlerInput) => {
    // Get device address country and postal code
    const address = await getDeviceAddress(handlerInput);
    console.log('Device address:', address);

    //Get device location coordinates
    const location = { coordinates: await getGeoCoordinates(`${address.countryCode},${address.postalCode}`) };
    console.log('Device location:', location);

    return location;
};