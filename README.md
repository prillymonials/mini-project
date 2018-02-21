Front-end mini project documentation.

### API
Run the app:

Application directory: `./restaurant-api`
1. Install all the dependencies of application
    ```sh
    npm install
    ```
2. Run the application under port 3001
    ```sh
    npm run start
    ```

### React.JS
Application directory: `./restaurant-ui`
1. Install all the dependencies of application
    ```sh
    npm install
    ```
2. Run the application under port 3000
    ```sh
    npm run start
    ```

# API Documentation

1. Top 10 Restaurant List

    Method: `GET`

    URI: `/restaurants`

    Description: 

    Get Top 10 Restaurant list. Sorted by ranking ascending by rating and total likes.

    Response:

    Code | Payload |
    --- | --- | 
    `200` | `{ "status": "ok", "data": [] }`

    Data properties:

    Key | Type | Description | Example
    --- | --- | --- | ---
    `id` | `Number` | Restaurant's ID | `102`
    `rank` | `Number` | Restaurant's Rank based by rating and total likes | `1`
    `name` | `String` | Restaurant's Name | `McDonald's`
    `image` | `String` | Restaurant's image URL | `/public/img/mc-donald.jpg`
    `rating` | `Number` | Restaurant's computed rating, from 0 to 5 | `4.55`
    `total_like` | `Number` | Restaurant's computed total like | `500000`

2. Restaurant by ID

    Method: `GET`

    URI: `/restaurants/:id`

    Description: 

    Get Restaurant detail by ID of the Restaurant.
    `ID` is `Number`

    Response:

    Code | Payload |
    --- | --- | 
    `200` | `{ "status": "ok", "data": [] }`
    `400` | `{ "status": "ok", "message": "" }`

    Data properties:

    Key | Type | Description | Example
    --- | --- | --- | ---
    `id` | `Number` | Restaurant's ID | `102`
    `rank` | `Number` | Restaurant's Rank based by rating and total likes | `1`
    `name` | `String` | Restaurant's Name | `McDonald's`
    `image` | `String` | Restaurant's image URL | `/public/img/mc-donald.jpg`
    `rating` | `Number` | Restaurant's computed rating, from 0 to 5 | `4.55`
    `total_like` | `Number ` | Restaurant's computed total like | `500000`
    `cuisine` | `String` | Restaurant's cuisine type | `Fast Food`
    `phone_number` | `String` | Restaurant's phone number | `1-250-111-5002`
    `address` | `String` | Restaurant's address | `156 Pod Valley`    
    `average_cost` | `String` | Restaurant's average cost when user want to go to the restaurant | `Rp. 100.000 per person`
    `open_hour` | `String` | Restaurant's open hour | `10 AM to 10 PM`
    `description` | `String` | Restaurant's description | `lorem ipsum sit dolor amet`
    
    Error properties:

     Key | Type | Description | Example
    --- | --- | --- | ---
    `message` | `String` | Error message from the server | `Restaurant not found.`

3. Reserve Restaurant

    Method: `POST`

    URI: `/restaurants/:id/reserve`

    Description: 

    Reserve a place to a restaurant.
    `ID` is `Number`

    Body properties:

    Key | Type | Description | Example
    --- | --- | --- | ---
    `name` | `String` | User's name who want to reserve a place at restaurant | `John Doe`
    `email` | `String` | User's email | `johndoe@example.com`
    `phone` | `String` | User's phone number | `1-250-111-5002`
    `total_guest` | `Number` | How many guest when user go to the restaurant | `7`

    Header properties:

    Header Name | Header Value
    --- | ---
    `Content Type` | `application/json`

    Response:

    Code | Payload |
    --- | --- | 
    `200` | `{ "status": "ok" }`
    `400` | `{ "status": "ok", "message": "" }`

    Error properties:

    Key | Type | Description | Example
    --- | --- | --- | ---
    `message` | `String` | Error message from the server. The reason: Restaurant not found and not all body field is blank | `Restaurant not found.`