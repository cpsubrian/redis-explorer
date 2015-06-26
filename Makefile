all: install dev

install:
	@echo ""
	@test -d ./node_modules || npm install

dev:
	@echo ""
	@./node_modules/.bin/grunt

release: install
	@echo ""
	@./node_modules/.bin/grunt release --target="production"

run:
	@echo ""
	@open ./dist/osx/RedisExplorer.app

copy:
	@echo ""
	@rm -Rf /Applications/RedisExplorer.app
	@cp -R ./dist/osx/RedisExplorer.app /Applications/

.PHONY: install
.PHONY: dev
.PHONY: release
.PHONY: run
.PHONY: copy