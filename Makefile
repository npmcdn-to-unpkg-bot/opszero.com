PRODUCT := serverless-solutions
VERSION := $(shell cat VERSION)
WEBSITE := acksin.com

all: build

build: deps test
	go build -ldflags "-X main.version=$(VERSION)"
	$(MAKE) website-assets

archive:
	tar cvzf $(PRODUCT)-$(VERSION).tar.gz $(PRODUCT)

release: spell build archive
	-git commit -m "Version $(VERSION)"
	-git tag v$(VERSION) && git push --tags
	s3cmd put --acl-public $(PRODUCT)-$(VERSION).tar.gz s3://assets.acksin.co/$(PRODUCT)/${VERSION}/$(PRODUCT)-${VERSION}.tar.gz

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

.PHONY: website website-dev
