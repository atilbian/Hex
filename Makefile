install:
	@cp ./web-app/.env.dist ./web-app/.env
	@cp ./.docker/pgadmin/.env.pgadmin.dist ./.docker/pgadmin/.env.pgadmin
	@cp ./.docker/db/.env.db.dist ./.docker/db/.env.db
	@cp ./admin-app/.env.dist ./admin-app/.env
	@echo "init complete"

init: install # kept for BC

start:
	docker-compose -f docker-compose.base.yaml -f docker-compose.dev.yaml up -d --build

stop:
	docker-compose -f docker-compose.base.yaml -f docker-compose.dev.yaml down --volumes
