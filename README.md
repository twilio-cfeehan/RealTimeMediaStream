# Deploying to Heroku

This guide walks you through the process of deploying this Node.js WebSocket server to Heroku using Docker.

## Prerequisites

- A GitHub account.
- A basic understanding of Git commands.
- A Heroku account. [Sign up here](https://signup.heroku.com/) if you don't have one.
- Docker installed on your machine. [Download Docker](https://www.docker.com/get-started).

## Step 1: Install the Heroku CLI

1. Download and install the Heroku CLI from [Heroku's website](https://devcenter.heroku.com/articles/heroku-cli).
2. Open your terminal and log in to Heroku:

    ```sh
    heroku login
    ```

## Step 2: Clone the GitHub Repository

1. Clone the repository to your local machine:

    ```sh
    git clone <GITHUB_REPOSITORY_URL>
    ```
   
    Replace `<GITHUB_REPOSITORY_URL>` with the URL of the GitHub repository.

2. Navigate to the directory where the repository is cloned:

    ```sh
    cd path/to/repository
    ```

## Step 3: Create a Heroku App

1. Create a new app on Heroku:

    ```sh
    heroku create <APP_NAME>
    ```

    Replace `<APP_NAME>` with your desired app name.

2. Log in to the Heroku container registry:

    ```sh
    heroku container:login
    ```

## Step 4: Set Environment Variables on Heroku

Set the necessary environment variables for your app:

```sh
heroku config:set -a <APP_NAME> VARIABLE_NAME=value
```

Repeat this for each required environment variable. Make sure to replace `<APP_NAME>` with your actual app name and `VARIABLE_NAME` and `value` with your actual environment variable names and values.

## Step 5: Build and Push the Docker Image

1. Build your Docker image:
    ```sh
    docker build -t <APP_NAME> .
    ```
    Replace `<APP_NAME>` with your Heroku app name.

2. Tag the Docker image for Heroku:
    ```sh
    docker tag <APP_NAME> registry.heroku.com/<APP_NAME>/web
    ```

3. Push the Docker image to Heroku:
    ```sh
    docker push registry.heroku.com/<APP_NAME>/web
    ```

## Step 6: Release the Image on Heroku

Release the Docker image to deploy your app:
```sh
heroku container:release web -a <APP_NAME>
```

Make sure to replace <APP_NAME> with your Heroku app name.

## Step 7: Open Your Deployed App

Open your deployed app in a web browser:

```sh
heroku open -a <APP_NAME>
```
    
Replace <APP_NAME> with your Heroku app name.

## Step 8: View Logs

To view the logs and monitor the activity of your app:

```sh
heroku logs --tail -a <APP_NAME>
```

Again, replace <APP_NAME> with your Heroku app name.

## Conclusion
Your app should now be successfully deployed to Heroku. If you encounter any issues, refer to the Heroku documentation or check the logs as mentioned in Step 8.
