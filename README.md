# Truancy

## 実行手順

`docker-compose build`

`docker-compose run --rm front sh -c "yarn upgrade"`

`docker-compose up`

`docker-compose run api sh -c "rails db:create"`

`docker-compose run api sh -c "rails db:migrate"`

`docker-compose down`

`docker-compose up`
