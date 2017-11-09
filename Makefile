install: 
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js --format plain __tests__/fixtures/JSON/before.json __tests__/fixtures/JSON/after.json
publish:
	npm publish
build:
	rm -rf dist
	npm run build
lint:
	npm run eslint
test:
	npm test