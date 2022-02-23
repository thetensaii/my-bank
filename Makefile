dev:
	docker-compose -f docker-compose.dev.yml up --build --remove-orphans

prod:
	docker-compose -f docker-compose.prod.yml up --build --remove-orphans

test_back:
	docker-compose -f docker-compose.test.yml build
	docker-compose -f docker-compose.test.yml run --rm back_test && \
		docker-compose -f docker-compose.test.yml down