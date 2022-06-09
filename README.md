![GitHub tag (latest SemVer)](https://shields.herrvergesslich.de/github/v/tag/smartcity-2022/service-jobportal?label=Version)
# Service-Jobportal
Microservice Jobportal

## Installation

### Umgebungsvariablen

In den Ordnern `backend` und `frontend` müssen jeweils eine `.env` Datei angelegt werden, welche folgende Parameter enthalten müssen:

**Backend**

* `DATABASE_URL`: MySQL Adresse im Format  'mysql://`username`:`password`@`adress`:`port`/`database` <br>
Beispiel: `mysql://root:root@localhost:3306/jobportal`

* `API_PATH`: API Basis Mapping <br>
Beispiel: `/api`

* `API_PORT`: Port auf der die API läuft <br>
default: `3001`

* `RABBITMQ_URL`: Adresse des RabbitMQ Servers <br>
Beispiel: `amqp://127.0.0.1:5672`


**Frontend**

* `REACT_APP_API_URL`: Adresse des Backends, muss Adresse + API_PATH entsprechen <br>
Beispiel: `http://localhost:3001/api`
