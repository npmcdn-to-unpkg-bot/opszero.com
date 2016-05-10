VERSION := $(shell cat VERSION)
WEBSITE := acksin.com

all: build

build: deps test
	go build -ldflags "-X main.version=$(VERSION)"
	$(MAKE) website-assets

website-assets: clean
	$(MAKE) buy_button/README.html

buy_button/README.html:
	emacs buy_button/README.org --batch --eval '(org-html-export-to-html nil nil nil t)'  --kill
	echo "---" > buy_button/docs.html.erb
	echo "title: Serverless Buy Button Using Stripe" >> buy_button/docs.html.erb
	echo "layout: docs" >> buy_button/docs.html.erb
	echo "---" >> buy_button/docs.html.erb
	cat buy_button/README.html >> buy_button/docs.html.erb
	rm buy_button/README.html
	mv buy_button/docs.html.erb website/serverless-ecommerce-with-stripe.html.erb

clean:
	rm -f buy_button/README.html landing_page/README.html

spell:
	for i in website/_download.erb website/index.html.erb README.org; do \
		aspell check --dont-backup --mode=html $$i; \
	done

release:
	bundle exec middleman build --clean
	# s3cmd sync --acl-public --delete-removed --mime-type="text/css" build/stylesheets s3://www.acksin.com/
	s3cmd sync --acl-public --delete-removed --no-mime-magic --guess-mime-type build/ s3://www.opszero.com/

.PHONY: website website-dev
