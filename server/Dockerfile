FROM golang AS build-stage
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . ./

RUN go build -v -o /docker-rmf

EXPOSE 3000

CMD ["/docker-rmf"]