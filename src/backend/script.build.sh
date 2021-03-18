GOOS=linux GOARCH=amd64 go build -o ../../build ./... || exit 1
rm -rf tmp || exit 1
