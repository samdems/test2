## Requirements

Before running the project, make sure you have the following dependencies installed:

- Docker
- Docker Compose

## Getting Started

To start the project, follow these steps:

1. Run the following command in the project directory:
   ```
   ./vendor/bin/sail up
   ```

2. After the Docker containers are up and running, the project will be accessible on port 80 of your local machine. Open a web browser and navigate to `http://localhost` to access the application.

3. Execute the following command to compile the assets:
   ```
   ./vendor/bin/sail npm run dev
   ```

## Stopping the Project

To stop the project, run the following command:
```
./vendor/bin/sail down
```

## Seeding the Database

If you need to seed the database with sample data, use the following command:
```
./vendor/bin/sail artisan migrate:refresh --seed
```

## Helpful Users

The following users have been created to assist with testing the application:

- **Test admin**
  - Name: Test admin
  - Email: admin@localhost
  - Password: password
  - Role: Administrator
  - Organization ID: 1

- **Test user**
  - Name: Test User
  - Email: user@localhost
  - Password: password
  - Role: Regular User
  - Organization ID: 1
