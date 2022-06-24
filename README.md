![GitHub tag (latest SemVer)](https://shields.herrvergesslich.de/github/v/tag/smartcity-2022/service-jobportal?label=Version)
# Microservice Jobportal

## Übersicht
Der Microservice Jobportal befasst sich mit der Ausschreibung und Suche von Praktikumsplätzen, Ausbildungsstellen, Mini- Teilzeit und Vollzeitjobs für die Bürger von SmartCity.

Registrierte Bürger im Bürgerbüro können entweder eine Firma registrieren um Stellen auszuschreiben oder nach bereits ausgeschriebenen Stellen suchen und sich dort bewerben.

## Installation

### Installation via npm

In den Ordnern `backend` und `frontend` muss jeweils der Befehl `npm install` ausgeführt werden.

Danach kann das jeweilige Programm mit `npm start` gestartet werden.

### Umgebungsvariablen

In den Ordnern `backend` und `frontend` muss jeweils eine `.env` Datei erstellt werden in denen folgende Parameter gesetzt sind:

### Backend
#### `DATABASE_URL`
Adresse der Datenbank `jobportal`, welche sich im Format "mysql://'username':'password'@'adress':'port'/'database'"
befinden muss.


#### `API_PATH`
Basis URL der API.<br>
Defaultwert: `/api`


#### `API_PORT`
Port auf welcher die API läuft.<br>
Defaultwert: `3000`


#### `RABBITMQ_URL`
Adresse des RabbitMQ-Servers


#### `RABBITMQ_EXCHANGE`
Standardexchange welcher auf dem RabbitMQ Server verwendet wird. <br>
Defaultwert: `EXCHANGE`


#### `MAINHUB_URL`
Adresse, auf welcher sich das MainHub befindet.


### Frontend
#### `REACT_APP_API_URL`
Die Adresse des Backends

## Verwendete Technologien

Frontend:
* React
* Material UI

Backend:
* Express

Datenbank:
* MySQL