./docker-build.sh || exit 1
docker-compose run --rm --service-ports valheim-server || exit 1
