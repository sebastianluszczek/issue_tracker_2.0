# Issue_Tracker_2.0

> Simple full stack application connecting Node.js backend, Postgres database and React.js frontend. Everythink is connected via docker-compose, and developed using docker (server & client have 'hot reload' thanks to docker volumes).

---

## In project i use:

### Backend

<p style="float: left">
<img src="https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png" alt="Node.js" width="64" style="display: inline">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS88qsrd0PXJzWBK2MYRgBWchcs-LMBYwBncfMuLDlAWjHbUXvGIw" alt="Express" width="64" style="display: inline">
<img src="https://cdn.worldvectorlogo.com/logos/sequelize.svg" alt="Mongoose" width="64" style="display: inline">
<img src="https://cdn.freebiesupply.com/logos/large/2x/jest-logo-svg-vector.svg" alt="Jest" width="64" style="display: inline">
</p><div style="clear:both;"></div>

\+ _**supertest**_, _**cross_env**_ & _**Joi**_ libraries

### Frontend

<p style="float: left">
<img src="https://cdn.iconscout.com/icon/free/png-256/react-4-1175110.png" alt="React.js" width="64" style="display: inline">
<img src="https://react.semantic-ui.com/logo.png" alt="Semantic UI" width="64" style="display: inline">
</p><div style="clear:both;"></div>

### Database

<img src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="Postgres" width="64" style="display: inline">

### Development

<p style="float: left">
<img src="https://cdn.iconscout.com/icon/free/png-256/docker-226091.png" alt="MongoDB" width="64" style="display: inline">
<img src="https://i1.wp.com/www.docker.com/blog/wp-content/uploads/2020/02/Compose.png?resize=200%2C219&ssl=1" alt="Docker Compose" width="64" style="display: inline">
<img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/358/full/eslintlogo.png" alt="ES Lint" width="64" style="display: inline">
<img src="https://cdn.iconscout.com/icon/free/png-512/nodemon-226039.png" alt="Nodemon" width="64" style="display: inline">
</p><div style="clear:both;"></div>

---

## Build Setup

```bash
# build development environment with docker-compose
docker-compose up --build
```

## Tests

```bash
# if database is running (docker-compose will set test_db)
cd api

npm run test
```

## ToDo

Stuff to implement:

- authentication (might be another microservice with with database, responsible for registration & logging users, with endpoint to check JWT);
- frontend client might have feature to search issues by name;
- production versions of Dockerfiles & docker-compose.yml;
