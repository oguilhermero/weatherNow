# Weather Now
This simple program fetches weather data from Accuweather's free API service.

## How it works
This program accepts user input when run on NodeJS. The user input is used to search for `LocationID` using the Location API. After retrieving the `LocationID`, it passes the `LocationID` to the Current Weather API to retrieve current `temperature` in degrees celsius, `city` and `country`. Temperature input is interpreted and a message is print to the console.

### Note on the API Key
The API Key is stored in a separate file that has not been included in this repository as a security measure. If you want to (re)use the code, please request an API key at https://developer.accuweather.com/ and run it with your credentials.