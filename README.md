### Valheim Server

An easy-to-install Valheim dedicated server Docker container with web interface.

![Screenshot](/screenshot.png "Screenshot")

## Installation

Create a file `docker-compose.yml` with the content below in some directory and run` docker-compose up -d` in that directory.

```
version: "3"
services:
  valheim:
    image: fakundo/valheim-server:latest
    ports:
      - 8000:8000/tcp
      - 2456:2456/udp
      - 2457:2457/udp
      - 2458:2458/udp
    environment:
      - DASHBOARD_PASSWORD=secret
    volumes:
    - ./valheim:/root/valheim
```
