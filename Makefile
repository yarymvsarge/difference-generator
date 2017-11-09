install: 
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js --format plain __tests__/fixtures/INI/before.ini __tests__/fixtures/INI/after.ini
	npm run babel-node -- src/bin/gendiff.js --format plain __tests__/fixtures/YAML/recursiveBeforeMy.yml __tests__/fixtures/YAML/recursiveAfterMy.yml
publish:
	npm publish
build:
	rm -rf dist
	npm run build
lint:
	npm run eslint
test:
	npm test