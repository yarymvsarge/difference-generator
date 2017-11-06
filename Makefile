install: 
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js
publish:
	npm publish
build:
	rm -rf dist
	npm run build
lint:
	npm run eslint
test:
	npm test