.PHONY: all build

all: build

build: node_modules

dist: build src requirejs.conf.js tools
	npm run lessc
	mkdir -p dist
	./node_modules/requirejs/bin/r.js -o ./tools/build.conf.js	

# if package.json changes, install
node_modules: package.json
	npm install
	touch $@

server: build
	npm start

test:
	npm test

clean:
	rm -rf dist lib node_modules

package: build

env=dev
deploy:
	./node_modules/.bin/lfcdn -e $(env)
