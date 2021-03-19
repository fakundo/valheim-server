BASE_DIR="$(cd "$( dirname "$0" )" && pwd)"
BACKEND_DIR="${BASE_DIR}/src/backend"
FRONTEND_DIR="${BASE_DIR}/src/frontend"

# Remove build files
rm -rf ./build && mkdir ./build || exit 1
# Build backend server
cd ${BACKEND_DIR}
./script.build.sh || exit 1
# Build frontend assets
cd ${FRONTEND_DIR}
./script.build.sh || exit 1
