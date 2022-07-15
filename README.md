# Quacker GraphQL Subscription Sample Project
> This repository contains the code examples demonstrated in a [Java Aktuell](https://www.ijug.eu/de/java-aktuell/zeitschrift/) article, published in issue 05/2022


## Structure

This repository contains the frontend and backend in individual directories:

| Directory  | Description                                                                      |
|------------|----------------------------------------------------------------------------------|
| `backend`  | Backend implementation, based on Spring Boot 2.7 and written in Kotlin           |
| `frontend` | React-based frontend implementation, demonstrating the use of apollo for GraphQL |


## Running the Sample

Both, frontend and backend, are set up for local command line execution, as can be seen in the
following sections.

### Frontend

The frontend application uses yarn as the package management tool. Thus, yarn ([https://yarnpkg.com/](https://yarnpkg.com/)) must be installed.

After cloning the repository, all dependencies must be installed first:

```shell
cd frontend
yarn install
```

After the successful install, the frontend application can be run using:

```shell
cd frontend
yarn start
```

This will automatically open the system default browser and point to the application URL (http://localhost:3000).

### Backend

Starting the backend requires Java 17 (or newer) to be installed. If that is the case, the backend
may be started using the following command:

```shell
cd backend
./gradlew bootRun
```

------
Do you have any questions or suggestions? Get in touch with us:

![digital frontiers](doc/img/logo_250x75.png)

:globe_with_meridians: [https://www.digitalfrontiers.de](https://www.digitalfrontiers.de) \
:email: info@digitalfrontiers.de \
Twitter [@dxfrontiers](https://twitter.com/dxfrontiers)


