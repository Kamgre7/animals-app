# Animals App

Animals App is a simple Node.js application built with Express.js and TypeScript that allows you to manage a list of animals. You can add, edit, and retrieve animal records.

### Features

- **Retrieve All Animals**: Get a list of all animals stored in the app.
- **Retrieve/Edit an Animal**: Retrieve or edit an animal record by its ID.
- **Add a List of Animals**: Add a list of animals to the app.
- **Add an Animal**: Add a single animal to the app.
- **Add Animals of a Specific Type**: Add a list of animals of a specific type.

### 🚀 Technologies

- Node.js
- Express.js
- TypeScript
- Zod
- Prisma
- Docker

### ✅ Requirements

Before starting, you need to have Git and Node installed.

### Run locally - backend

```bash
# Clone the project
$ git clone https://github.com/Kamgre7/animals-app.git

# Go to the project directory
$ cd animals-app

# Install dependencies
$ npm install

# Start the server
$ npm run start
```

### 🛠 API Reference

#### Retrieve All Animals

Returns a list of all animals stored in the app.

```http
  GET /animals/all
```

#### Retrieve/Edit an Animal by ID

This endpoint allows you to retrieve an animal record by its ID. You can also use the PATCH method to edit the data of a particular animal.

```http
  GET/PATCH /animals/:id
```

| Parameter | Type   | Description |
| :-------- | :----- | :---------- |
| `id`      | `uuid` | Animal ID   |
|           |

**PATCH Body Params**:

- `name` (string): Animal name
- `sex` (string): Animal sex
- `species` (string): Animal species

#### Add a List of Animals

This endpoint allows you to add a list of animals to the app. The request body should contain an array of animal objects.

```http
  POST /animals/add/animals
```

**Body Params**:

- `animals` (array): Array of Animal objects
  - `name` (string): Animal name
  - `sex` (string): Animal sex
  - `species` (string): Animal species
  - `endangered` (boolean)

#### Add an Animal

This endpoint allows you to add a single animal to the app. The request body should contain an animal object.

```http
  POST /animals/add
```

**Body Params**:

- `name` (string): Animal name
- `sex` (string): Animal sex
- `species` (string): Animal species
- `endangered` (boolean)

#### Add Animals of a Specific Type

This endpoint allows you to add a list of animals of a specific type to the app. The request body should contain an array of animal objects. and

```http
  POST /animals/add/:type
```

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| `type`    | `enum` | Species enum value |
|           |

**Body Params**:

- `animals` (array): Array of Animal objects
  - `name` (string): Animal name
  - `sex` (string): Animal sex
  - `species` (string): Animal species
  - `endangered` (boolean)
