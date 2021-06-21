## Valheim Dedicated Server

An easy-to-install Valheim dedicated server with a Web interface exposed in the Docker image.

#### Features

- game process output
- performance monitor
- worlds management (upload, download, delete)
- users management (admins, banned, permitted)

###

![Screenshot](/screenshot.png "Screenshot")

### Installation

Create a file `docker-compose.yml` with the content below in some directory and run `docker-compose up -d` in that directory.

```yaml
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

### License

MIT
