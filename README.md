# Baier Finances

Baier Finances is a Next.js application designed for managing properties and financial transactions efficiently. This app provides users with the tools to keep track of their properties, expenses, and transactions in a user-friendly interface.

## Table of Contents

-   [Baier Finances](#baier-finances)
    -   [Table of Contents](#table-of-contents)
    -   [Features](#features)
    -   [Getting Started](#getting-started)
    -   [1. Clone the repository:](#1-clone-the-repository)
    -   [2. Install Dependencies](#2-install-dependencies)
    -   [3. Set Up Environment Variables](#3-set-up-environment-variables)
    -   [4. Install Dependencies](#4-install-dependencies)
    -   [5. Run the Development Server](#5-run-the-development-server)
    -   [Directory Structure](#directory-structure)
        -   [Explanation of Each Directory](#explanation-of-each-directory)
        -   [Components vs. Containers](#components-vs-containers)

## Features

-   User authentication and session management.
-   Property management with detailed information.
-   Transaction logging and categorization.
-   Responsive UI components.
-   File management associated with users and properties.

## Getting Started

To get started with Baier Finances, follow these steps:

## 1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/baier-finances.git
    cd baier-finances
    ```

## 2. Install Dependencies

To install the necessary dependencies for the project, run the following command in your terminal:

```bash
npm install

```

## 3. Set Up Environment Variables

Before running the application, you need to set up your environment variables. Create a file named `.env` in the root directory of your project and add the following variables:

```
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_REDIRECT_URI=
APPLE_CLIENT_ID=
APPLE_TEAM_ID=
APPLE_KEY_ID=
APPLE_CERTIFICATE=
APPLE_REDIRECT_URI=
```

## 4. Install Dependencies

Once your environment variables are set, you need to install the required dependencies for the project. Navigate to the project directory in your terminal and run the following command:

```bash
npm install

```

This command will install all the necessary packages listed in your package.json file, including Next.js, Prisma, and any other dependencies required for your application.

## 5. Run the Development Server

After installing the dependencies, you can start the development server to see your application in action. In your terminal, run the following command:

```bash
npm run dev
```

## Directory Structure

The directory structure of the `baier-finances` application is organized as follows:

### Explanation of Each Directory

```
src
├── actions # Contains action creators for managing state
├── app # Main application logic and routing
│ ├── auth # Authentication-related components and hooks
│ └── property # Components related to property management
├── assets # Static assets such as images and styles
├── components # Reusable UI components
├── containers # Container components that manage state and logic
│ ├── nav # Navigation components
│ └── property # Property-related container components
├── data # Data fetching and manipulation logic
├── hooks # Custom React hooks for reusable logic
├── lib # Library code, including authentication and database functions
│ ├── auth # Authentication-related logic
│ └── database # Database connection and queries
├── services # External services and API calls
├── store # State management logic, such as Redux or Context API
└── types # Type definitions for TypeScript
```

-   **actions**: This directory contains action creators that define how to interact with your application's state.
-   **app**: The core logic of the application, including routing and main application components.
    -   **auth**: Contains components and hooks related to user authentication.
    -   **property**: Components specifically for managing and displaying property data.
-   **assets**: Holds static files like images, icons, and global stylesheets.
-   **components**: Reusable UI components that can be utilized throughout the application.
-   **containers**: Smart components that manage state and connect to Redux or Context, often passing data to presentational components.
    -   **nav**: Navigation-related components.
    -   **property**: Container components that handle logic related to properties.
-   **data**: Manages data fetching and any related logic for working with data.
-   **hooks**: Contains custom React hooks for encapsulating reusable logic.
-   **lib**: Library functions, including those for authentication and database interactions.
    -   **auth**: Logic specifically related to authentication processes.
    -   **database**: Functions for connecting to and interacting with the database.
-   **services**: This folder contains code for making external API calls or interacting with services.
-   **store**: The state management logic, possibly using libraries like Redux or React's Context API.
-   **types**: TypeScript type definitions to ensure type safety across your application.

### Components vs. Containers

In the `baier-finances` application, components and containers are organized to separate presentation from logic:

-   **Components** (in `components/auth/`):

    -   **Presentational Logic**: Stateless and focused on rendering UI elements.
    -   **Reusability**: Designed to be reusable across different parts of the application.
    -   **Examples**:
        -   `LoginForm.tsx`: Handles user input for login.
        -   `RegisterForm.tsx`: Handles user input for registration.
        -   `AuthHeader.tsx`: Renders the header for authentication pages.

-   **Containers** (in `containers/auth/`):
    -   **State Management and Logic**: Handles complex logic, state management, and API calls.
    -   **Smart Components**: Orchestrate the data flow and connect presentational components to business logic.
    -   **Examples**:
        -   `LoginContainer.tsx`: Integrates `LoginForm` with authentication logic, managing input state and form submission.
        -   `AuthContainer.tsx`: Manages shared logic for both login and registration.

This structure enhances code maintainability, readability, and testability, while improving scalability and flexibility as the application grows.

This structure is designed to keep your code organized, making it easier to manage and scale as your application grows.
