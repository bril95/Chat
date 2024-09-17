install:
	npm ci

lint-frontend:
	make -C frontend lint

build:
	rm frontend/build -rf
	npm run build

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/build

run:
	make start-backend & make start-frontend