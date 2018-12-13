##Project Details

This App aims to use Google map with react. It was developed as a Practice Project in the Udacity Frontend nanodegree program. The app lists a predefined set of places which are put on the map and then additionally foursquare API is use to extract information about those places.

The app also has a filter input that can be used to filter content based on name.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Available FourSquare API functions

### Search({queryObject})

The search function takes in a query object and then returns a JSON of matching results. The options of query parameters can be found [here](https://developer.foursquare.com/docs/api/venues/search)

### getVenueDetails(Place_id)

The getVenueDetails function takes in a place_id and then returns a JSON of matching results. The options of query parameters can be found [here](https://developer.foursquare.com/docs/api/venues/details)

### getVenuePhotos(Place_id)

The getVenuePhotos function takes in a place_id and then returns a JSON of matching results. The options of query parameters can be found [here](https://developer.foursquare.com/docs/api/photos/details)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
