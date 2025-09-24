# Segmentation App 2 

⚠️ Early-stage project. Mostly empty

## Table of Contents

- **[About](#about)**
- **[Architecture](#architecture)**
- **[How to build and run the project](#how-to-build-and-run-the-project)**
  - [Node.js and Python](#nodejs-and-python)
  - [Installing Node.js packages](#installing-nodejs-packages)
  - [Installing Python packages](#installing-python-packages)
  - [Running and testing the Svelte frontend](#running-and-testing-the-svelte-frontend)
  - [Building the Svelte frontend](#building-the-svelte-frontend)
  - [Running and testing the Electron app](#running-and-testing-the-electron-app)
  - [Building and distributing the Electron app](#building-and-distributing-the-electron-app)
- **[Manual(TODO)](#manual)**
- **[Licence](#licence)**

## About

This side project builds on my previous work in machine learning-based image segmentation. The current focus is on enhancing software quality and user experience. It serves as a practical environment to improve and deepen my software engineering skills.

Changes include codebase improvement, automated unit testing, modernizing the UI and adding some features missing in the previous project.

## Architecture

- Backend: Python – handles core logic and data processing.
- Bridge: Electron – wraps the frontend as a desktop app and connects to the backend.
- IPC: WebSocket – real-time communication between frontend and backend.
- Frontend: Svelte (TypeScript) – dynamic UI rendering and interaction.

## How to build and run the project

### Node.js and Python

Download and install [Node.js](https://nodejs.org/en/download)  
Download and install [Python](https://www.python.org/downloads/)

### Installing Node.js packages

Inside the project folder run `npm install`. Then inside the `svelte-frontend` folder run `npm install` again.

### Installing Python packages

Inside the project folder run `pip install -r requirements.txt`. `pip` installs all packages
listed inside `requirements.txt`.

### Running and testing the Svelte frontend

Inside the `svelte-frontend` folder run `npm run preview`. Vite starts a server to preview
the svelte app.

### Building the Svelte frontend

Inside the `svelte-frontend` folder run `npm run build`. Vite generates the Svelte frontend
files inside the `svelte-frontend/dist` folder.

### Running and testing the Electron app

Inside the project folder run `npm run start`. This starts the Electron app through Electron-Forge.

### Building and distributing the Electron app

Inside the project folder run `npm run make`. Please note that Electron-Forge is not configured for Linux and macOS, yet.

## Manual

TODO

## Licence

This project is licensed under the [MIT License](LICENSE).
