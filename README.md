# Logging Function Implementation

## Overview
This project includes a reusable `Log` function that sends log entries to a protected test server API. The function validates input parameters and includes authentication via an environment variable.

## Features
- Reusable `Log(stack, level, package, message)` function with input validation.
- Integration of the `Log` function in Express logging middleware.
- Test scripts to verify logging functionality.
- Authentication token support via `LOG_API_AUTH_TOKEN` environment variable.

## Setup

1. Install dependencies:
   ```
   npm install axios express supertest dotenv
   ```

2. Set the environment variable `LOG_API_AUTH_TOKEN` with your access token:
   - On Unix/Linux/macOS:
     ```
     export LOG_API_AUTH_TOKEN="your_access_token_here"
     ```
   - On Windows CMD:
     ```
     set LOG_API_AUTH_TOKEN=your_access_token_here
     ```

3. Run test scripts to verify logging:
   ```
   node "Backend Test Submission/testLogFunction.js"
   node "Backend Test Submission/testLoggingMiddleware.js"
   ```

## Usage

- Use the `Log` function from `logger.js` to send logs to the test server.
- The logging middleware in `loggingMiddleware.js` logs each incoming API request.

## Notes

- Ensure the access token is valid and has permission to post logs.
- The logging API endpoint is `http://20.244.56.144/evaluation-service/logs`.
- The `stack`, `level`, and `package` parameters must be one of the allowed values as per the constraints.

## Author
Benny Babu Kolatapu
