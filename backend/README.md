# Microservice Jobportal

## Umgebungsvariablen
Folgende Umgebungsvariablen müssen in einer `.env` jeweils im Backend und im Frontend Ordner abgelegt werden.

Folgende Variablen müssen festgelegt sein:

* `DATABASE_URL`: MySQL Adresse im Format 'mysql://`<username>`:`<password>`@`<adress>`:`<port>`/`<database>`'

Beispiel: 'mysql://root:root@localhost:3306/jobportal'

* 'API_PATH': API base path

Beispiel: '/api'


* `API_PORT`: Port der API

Beispiel: '3001'

* `RABBITMQ_URL`: RabbitMQ URL

Beispiel: 'amqp://127.0.0.1:5672'


Im frontend Ordner:

* `REACT_APP_API_URL`: Muss API Adresse + API_PATH entsprechen

Beispiel: 'http://localhost:3001/api'

