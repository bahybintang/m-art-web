build:
	docker-compose -f docker-compose.yml build $(c)
up:
	docker-compose -f docker-compose.yml up -d $(c)
start:
	docker-compose -f docker-compose.yml start $(c)
down:
	docker-compose -f docker-compose.yml down $(c)
destroy:
	docker-compose -f docker-compose.yml down -v $(c)
stop:
	docker-compose -f docker-compose.yml stop $(c)
restart:
	docker-compose -f docker-compose.yml stop $(c)
	docker-compose -f docker-compose.yml up -d $(c)
logs:
	docker-compose -f docker-compose.yml logs --tail=100 -f $(c)
logs-strapi:
	docker-compose -f docker-compose.yml logs --tail=100 -f strapi
ps:
	docker-compose -f docker-compose.yml ps
login-strapi:
	docker-compose -f docker-compose.yml exec strapi /bin/bash
login-frontend:
	docker-compose -f docker-compose.yml exec frontend /bin/bash
login-db:
	docker-compose -f docker-compose.yml exec mariadb /bin/bash
db-shell:
	docker-compose -f docker-compose.yml exec mariadb mysql -ustrapi -p