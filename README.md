<h1 align="center">RoomConnect</h1>

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)]()
[![Go](https://img.shields.io/badge/Go-1.21.4-lightblue?logo=go&labelColor=white&color=lightblue)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-brown?logo=typescript&labelColor=brown)]()
[![ChakraUI](https://img.shields.io/badge/Chakra_UI-2.8.1-lightblue?logo=chakraui&labelColor=lightblue&color=lightblue)]()
[![Vite](https://img.shields.io/badge/Vite-4.4.5-purple?logo=vite&labelColor=purple&color=yellow)]()
[![npm](https://img.shields.io/badge/npm-10.2.3-green?logo=npm&labelColor=grey&color=green)]()
[![Redis](https://img.shields.io/badge/Redis-white?logo=redis)]()
[![Docker](https://img.shields.io/badge/Docker-blue?logo=docker&labelColor=white&color=blue)]()

<h2>Overview</h2>
<p>RoomConnect is a full stack TypeScript + Go web app that helps find compatible roommates throughout Miami-Dade county. It allows users to customize their profile, preferences, and search for other potential roommates through queries. Furthermore, Roommate Finder allows potential roommates to chat with each other, with the backend powered by Docker and Go.</p>

<h2>Contributors</h2>

- Lead Engineer: Lester Fernandez
- Front-End Engineers:
  - Jocelyn Dzuong - Design + UI
  - Firas Natour - Design + UI
  - Javier Garcia - Frontend Infrastructure
- Back-End Engineers:
  - Enzo Falone - Backend Infrastructure + API
  - Jordan Diaz - Security + API

<h2>How to Build</h2>
<p>To build this project, make sure you have npm, Docker, and Go installed. Then run the following steps:</p>

1. Clone the repository to your directory

```
git clone https://github.com/lesterfernandez/roomconnect.git
```

3. Install all necessary dependencies and packages in the root of the project

```
cd roommate-finder
npm install
```

4. Start the docker image inside `/server`

```
 cd server
 docker compose up -d
```

5. Start the go server inside the same directory

```
go run server.go
```

6. Build the project in `/client` and open the link locally in your browser

```
cd ..
cd client
npm run dev
```
