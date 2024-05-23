FROM golang:alpine
WORKDIR /app
COPY . /app
RUN go mod download
RUN go build -o main main.go
EXPOSE 8000
CMD ["./main"]