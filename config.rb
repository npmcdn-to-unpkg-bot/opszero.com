require 'active_support/inflector/transliterate'
require 'org-ruby'

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/*.css', layout: false

page "*", :layout => :layout

data.solutions.each do |product|
  proxy "/function/#{product.title.parameterize}/index.html", "function.html", :locals => { :product => product }, ignore: true
end

ignore 'function/'


# redirect "/support/", to: "/consulting/"

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

activate :directory_indexes

###
# Helpers
###

set :markdown, :tables => true, :autolink => true, :gh_blockcode => true, :fenced_code_blocks => true
set :markdown_engine, :redcarpet

# Methods defined in the helpers block are available in templates
helpers do
  def markdown(source)
    Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true).render(source)
  end

  def orgmode(source)
    Orgmode::Parser.new(source).to_html
  end
end


configure :build do
  activate :minify_css
  activate :minify_javascript

  # Append a hash to asset urls (make sure to use the url helpers)
  activate :asset_hash
end
