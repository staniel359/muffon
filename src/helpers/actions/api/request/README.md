# API Requests

This is a set of helper functions for making API calls using the [Axios](https://axios-http.com/docs/api_intro) library. The functions include `get()`, `post()`, `put()`, `delete()`, and `patch()`, and are intended to provide a standardized way of making API calls throughout the application. Many of the query parameters are reused between functions, but each parameter for each function is listed since not each function shares the same set of parameters.

## post.js

The `post()` function is used to make a POST request to a specified URL. The function takes an object with several options as its only parameter. These options include:

- `url` (required): The URL to make the POST request to.
- `params`: An object containing the data to include in the request body.
- `isWithSelfId`: A boolean value indicating whether or not to include the currently logged-in user's ID in the request.
- `isWithSelfToken`: A boolean value indicating whether or not to include the currently logged-in user's token in the request.
- `isWithSelfLanguage`: a boolean flag that, when true, adds the user's language to the params object.
- `onComplete`: A callback function to be called when the request is completed.
- `onSuccess`: A callback function to be called if the request is successful.
- `onError`: A callback function to be called if the request results in an error.
- `isSaveError`: A boolean value indicating whether or not to save the error in the helper function's state.

The `post()` function returns a Promise that resolves with the response data or rejects with an error.

## get.js

The `get()` function is used to make a GET request to a specified URL. The function takes an object with several options as its only parameter. These options include:

- `url` (required): The URL to make the GET request to.
- `params`: An object containing query parameters to include in the request.
- `isWithSelfId`: A boolean value indicating whether or not to include the currently logged-in user's ID in the request.
- `isWithSelfToken`: A boolean value indicating whether or not to include the currently logged-in user's token in the request.
- `onComplete`: A callback function to be called when the request is completed.
- `isWithSelfLanguage`: a boolean flag that, when true, adds the user's language to the params object.
- `page`: the page number to request.
- `limit`: the maximum number of items to retrieve.
- `order`: the order in which the results should be returned.
- `onSuccess`: A callback function to be called if the request is successful.
- `onError`: A callback function to be called if the request results in an error.
- `isSaveError`: A boolean value indicating whether or not to save the error in the helper function's state.

The `get()` function returns a Promise that resolves with the response data or rejects with an error.

## patch.js

The `patch()` function is used to make a PUT request to a specified URL. The function takes an object with several options as its only parameter. These options include:

- `url` (required): The URL to make the PUT request to.
- `params`: An object containing the data to include in the request body.
- `isWithSelfId`: A boolean value indicating whether or not to include the currently logged-in user's ID in the request.
- `isWithSelfToken`: A boolean value indicating whether or not to include the currently logged-in user's token in the request.
- `onComplete`: A callback function to be called when the request is completed.
- `onSuccess`: A callback function to be called if the request is successful.
- `onError`: A callback function to be called if the request results in an error.

The `patch()` function returns a Promise that resolves with the response data or rejects with an error.

## delete.js

The `delete()` function is used to make a DELETE request to a specified URL. The function takes an object with several options as its only parameter. These options include:

- `url` (required): The URL to make the DELETE request to.
- `params`: An object containing query parameters to include in the request.
- `isWithSelfId`: A boolean value indicating whether or not to include the currently logged-in user's ID in the request.
- `isWithSelfToken`: A boolean value indicating whether or not to include the currently logged-in user's token in the request.
- `onComplete`: A callback function to be called when the request is completed.
- `onSuccess`: A callback function to be called if the request is successful.
- `onError`: A callback function to be called if the request results in an error.
- `isSaveError`: A boolean value indicating whether or not to save the error in the helper function's state.

The `delete()` function returns a Promise that resolves with the response data or rejects with an error.

## Example

Here's an example making a POST request:

```javascript
import post from './post.js'

post({
  url: '/api/posts',
  params: {
    title: 'My post title',
    body: 'This is the body of my post.'
  },
  isWithSelfId: true,
  isWithSelfToken: true,
  isWithSelfLanguage: true,
  onSuccess: (response) => {
    console.log(response.data)
  },
  onError: (error) => {
    console.error(error)
  }
})
```

In this example, we're making a POST request to /api/posts with some parameters in the request body (title and body). We're also including the user's profile_id, token, and language in the request, as specified by the isWithSelfId, isWithSelfToken, and isWithSelfLanguage parameters.

When the request is successful, we're logging the response data to the console (console.log(response.data)). If there's an error, we're logging the error to the console (console.error(error)).
