<h1 align="center">RoomConnect</h1>

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-brown?logo=typescript&labelColor=brown)]()
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)]()
[![ChakraUI](https://img.shields.io/badge/Chakra_UI-2.8.1-lightblue?logo=chakraui&labelColor=lightblue&color=lightblue)]()
[![Vite](https://img.shields.io/badge/Vite-4.4.5-purple?logo=vite&labelColor=purple&color=yellow)]()
[![Go](https://img.shields.io/badge/Go-1.21.4-lightblue?logo=go&labelColor=white&color=lightblue)]()
[![Docker](https://img.shields.io/badge/Docker-blue?logo=docker&labelColor=white&color=blue)]()
[![Redis](https://img.shields.io/badge/Redis-white?logo=redis)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-lightblue?logo=postgresql&logoColor=white&labelColor=blue)]()

## Overview

RoomConnect is a full stack TypeScript + Go web app that helps find compatible roommates throughout Miami-Dade county. It allows users to customize their profile, preferences, and search for other potential roommates through queries. Furthermore, RoommateConnect allows potential roommates to chat with each other in real-time.

## Contributors

- Front-End Engineers:
  - Jocelyn Dzuong - Design + UI
  - Firas Natour - Design + UI
  - Javier Garcia - Frontend Infrastructure
- Back-End Engineers:
  - Enzo Falone - Backend Infrastructure + API
  - Jordan Diaz - Security + API
- Lead Engineer:
  - Lester Fernandez - Planning + Mentoring

## Technology

### Frontend

- TypeScript - Programming Language
- React.js - Frontend Framework
- WebSockets - Real-Time Communication
- ChakraUI - Design System
- Zustand - State Management
- Zod - Data Validation
- Vite - Bundler

### Backend

- Go - Programming Language
- WebSockets - Real-Time Communication
- PostgreSQL - Database
- Redis - Pub/Sub Messaging System
- Docker - Containerization Software

## How to Run Locally

To build this project, make sure you have npm, Docker, and Go installed. Then run the following steps:

1. Clone the repository to your directory

```
git clone https://github.com/lesterfernandez/roomconnect.git
```

1. Install all necessary dependencies and packages in the root of the project

```
cd roommate-finder
npm install
```

1. Start the docker image inside `/server`

```
 cd server
 docker compose up -d
```

1. Start the go server inside the same directory

```
go run server.go
```

1. Build the project in `/client` and open the link locally in your browser

```
cd ..
cd client
npm run dev
```
