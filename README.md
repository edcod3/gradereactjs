# GradeReactJS :bar_chart:

A grade overview created with NodeJS, Express.JS MySQL, Nginx and Docker.

Remade with the ReactJS frontend framework.


## :electric_plug: Installation

Install Docker [here](https://docs.docker.com/engine/install/) and Docker Compose [here](https://docs.docker.com/compose/install/)

Clone the repository:

```
git clone https://github.com/edcod3/gradereactjs.git
```
## :desktop_computer: Usage

### Setup

#### Environment variables
Add the according `.env` files into the `./config` directory.

- `.env.react-dev` / `.env.react-prod` for React environment variables
- `.env.nodejs-dev` / `.env.nodejs-prod` for NodeJS environment variables
- `.env.development` for development environment variables
- `.env.production` for production environment variables

_Note: `.env.development` and `.env.production` will be parsed to the according docker compose file._

#### Database
Insert a `.sql` file into the `./mysql` directory. It will be initialized during the docker build process.

### Development

```bash
docker-compose -f docker-compose-dev.yml --env-file ./config/.env.development up
```

### Maintenance

```bash
docker-compose -f docker-compose-maint.yml up -d --no-deps webserver
```
_Note: To prevent getting a SSL certificate on start-up, start every container separately._

Now you can edit `default.conf` and `docker-compose-prod.yml` to support HTTPS traffic.

### Production
#### On first start-up:

```bash
docker-compose -f docker-compose-prod.yml up --env-file ./config/.env.production -d
```
_The Certbot container will generate a SSL certificate and exit._

Now you can edit `default.conf` and `docker-compose-prod.yml` to support HTTPS traffic.
  
#### Further start-ups:
```bash
docker-compose -f docker-compose-prod.yml --env-file ./config/.env.production up -d --no-deps mysql
```
```bash
docker-compose -f docker-compose-prod.yml --env-file ./config/.env.production up -d --no-deps nodejs
```
```bash
docker-compose -f docker-compose-prod.yml --env-file ./config/.env.production up -d --no-deps reactjs
```
```bash
docker-compose -f docker-compose-prod.yml --env-file ./config/.env.production up -d --no-deps webserver
```
This will prevent generating a new certificate every time `docker-compose-prod.yml` (or one of the services) is started.

## :pencil: Logs

### Nginx

Nginx Logs are saved in `./nginx/logs` and can be monitored with [Fail2Ban](https://www.fail2ban.org) to block malicious IPs.

Logs are seperated into the following files: 

- `acme-access.log` for monitoring ACME-Challenges by LetsEncrypt (Certbot)
- `nginx-block.log` which logs all blocked traffic (e.g. 4XX HTTP Status Codes)
- `nginx-error.log` for logging all Nginx errors
- `nginx-access.log` which monitor all traffic to the React frontend
- `api-access.log` which monitor all traffic to the NodeJS backend

### PM2 (NodeJS)
Nginx Logs are saved in `./nodejs/logs`.

- `pm2_error.log` logs all errors thrown by NodeJS
  
- `pm2_output.log` monitors all output from `server.js`

## :loudspeaker: Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
