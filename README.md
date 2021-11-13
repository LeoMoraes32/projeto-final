
# Final Challenge - Part.1 e 2 :D

Compass has entered a new branch of the market, compassolisa a follow-up to luxury and semi luxury rental cars. For this API it will be necessary to develop some routes.



## Contain

 - Cars CRUD;
 - People CRUD;
 - Rentals CRUD
 - Simple pagination;
 - Filter by params;
 - Return Token.


## Tech Stack

**Server:** Node, Express, MongoDB, Mongoose, Mongoose-Paginate, Joi, Moment and JWT.



## Authors

- [@LeoMoraes32](https://github.com/LeoMoraes32)


## Deployment

To deploy this project clone this repository and run

```bash
  npm install 
```

then to start the server run

```bash
    npm run dev
```

## Run the tests

 - npm run test /integration/rental.test.js
 - npm run test /integration/people.test.js
 - npm run test /integration/car.test.js

if you use docker use the extension of docker 
![Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTsBvn9I2b74xUSSIeBV775s36ZqxkuEN6xA&usqp=CAU)


Click with the second button of the mouse on the docker-compose.yml arquive and click on the option: Compose Up.
## API Reference

#### Get all items of PEOPLE

```http
  GET /api/v1/people
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `params` | `string` | **Required**. Your API key |

#### Get item by id

```http
  GET /api/v1/people/${id}
  POST /api/v1/people - json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### PUT, PATCH and DELETE item

```http
    PUT /api/v1/people/${id} 
    PATCH /api/v1/people/${id}
    DELETE /api/v1/people/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Get all items of CAR

```http
  GET /api/v1/car
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `params` | `string` | **Required**. Your API key |

#### Get item by id

```http
  GET /api/v1/car/${id}
  POST /api/v1/car - json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### PUT, PATCH and DELETE item

```http
    PUT /api/v1/car/${id} 
    PATCH /api/v1/car/${id}
    DELETE /api/v1/car/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Get all Rentals 

```http
  GET /api/v1/rental
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `params` | `string` | **Required**. Your API key |

#### Get item by id

```http
  GET /api/v1/rental/${id}
  POST /api/v1/rental - json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### PUT, PATCH and DELETE item of Rentals

```http
    PUT /api/v1/rental/${id} 
    PATCH /api/v1/rental/${id}
    DELETE /api/v1/rental/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Contributing

Contributions are always welcome!

