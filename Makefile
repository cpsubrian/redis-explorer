all: install build run

install:
	@echo ""
	@test -d ./node_modules || npm install
	@test -d ./app/node_modules || cd app && npm install && cd ../
	@test -d ./app/vendor || ./node_modules/.bin/bower install

build:
	@echo ""
	@./node_modules/.bin/grunt nodewebkit

run:
	@echo ""
	@echo "Running OSX Build"
	@open ./build/releases/redis-explorer/mac/redis-explorer.app

watch:
	nodemon --watch app --exec "make"

link:
	@ln -s `pwd`/build/releases/redis-explorer/mac/redis-explorer.app /Applications/RedisExplorer.app

unlink:
	@rm /Applications/RedisExplorer.app

clean:
	@echo ""
	@rm -Rf ./node_modules
	@rm -Rf ./build/releases
	@rm -Rf ./app/node_modules
	@rm -Rf ./app/vendor

.PHONY: install
.PHONY: build
.PHONY: run
.PHONY: watch
.PHONY: link
.PHONY: unlink
.PHONY: clean