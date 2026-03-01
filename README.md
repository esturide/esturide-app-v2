# esturide-webapp

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![ReactJS](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-Style-%23CC6699?style=for-the-badge&logo=sass)
![Tailwind](https://img.shields.io/badge/Tailwind-Style-38B2AC?style=for-the-badge&logo=tailwind-css)

This repository houses the source code for the client application, which interacts with the server to provide a complete experience to the end user. The application is developed using the latest technologies and frameworks, ensuring optimal performance, intuitive interface and smooth user experience.

## Platforms

[![supports iOS](https://img.shields.io/badge/iOS-999999.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff)](https://github.com/expo/expo)
[![supports Android](https://img.shields.io/badge/Android-A4C639.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff)](https://github.com/expo/expo)
[![supports web](https://img.shields.io/badge/Web-4285F4.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff)](https://github.com/expo/expo)

## Get started

### Option 1: Local Development

1. Install dependencies

   ```bash
   yarn
   ```

2. Copy environment variables

   ```bash
   cp .env.example .env
   ```

3. Start the app

   ```bash
   yarn dev
   ```

### Option 2: Docker Development

1. Copy environment variables

   ```bash
   cp .env.example .env
   ```

2. Build and run with Docker Compose

   ```bash
   docker-compose up --build
   ```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file based on `.env.example` and configure the following variables:

- `NODE_ENV`: Application environment (development/production)
- `PORT`: Port to run the application on (default: 3000)
- `API_URL`: Backend API URL
- `GOOGLE_MAPS_API_KEY`: Google Maps API key
- `CUSTOM_KEY`: Custom configuration key

## Get started for testing

[StoryBook](https://storybook.js.org/) is used for development testing, you can run tests with the following command:

```bash
yarn storybook
```

### Learning about Storybook

1. Read our introductory tutorial at [Learn Storybook](https://storybook.js.org/tutorials/intro-to-storybook/react-native/en/get-started/).
2. Learn how to transform your component libraries into design systems in our [Design Systems for Developers](https://storybook.js.org/tutorials/design-systems-for-developers/) tutorial.
3. See our official documentation at [Storybook](https://storybook.js.org/).

## Docker Configuration

The application includes a centralized Docker configuration:

- `Dockerfile`: Multi-stage build for production
- `docker-compose.yml`: Development and deployment configuration
- `.env.example`: Environment variables template

The Docker setup uses:
- Node.js 18 Alpine base image
- Multi-stage builds for optimization
- Standalone output for minimal container size
- Environment variable configuration
