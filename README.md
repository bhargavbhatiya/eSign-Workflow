# eSign Workflow Application

This is a simple eSign workflow application developed using NestJS, integrating with the Zoho eSign API.

## Features

- Load PDF documents
- Add eSign tags using Zoho eSign API
- Preview PDF documents
- Submit documents for eSign using Zoho API
- download the document file

## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2. **Install dependencies:**

    ```bash
    cd eSign-Workflow
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    CLIENT_ID = 'Your-Client-ID'
    CLIENT_SECRET = 'Your-Client-Secret'
    ACCESS_TOKEN = 'Your-Access-Token'
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

5. **Test your API using Postman or any other API testing tool.**
