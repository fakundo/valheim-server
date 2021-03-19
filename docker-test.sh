# Build assets
./docker-build.sh || exit 1
# Build docker image
docker-compose up --remove-orphans || exit 1
