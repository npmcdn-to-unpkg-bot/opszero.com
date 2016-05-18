# xml.instruct!
# xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
#   site_url = "https://www.opszero.com/"
#   xml.title "opsZero"
#   xml.subtitle "Functions"
#   xml.id URI.join(site_url)
#   xml.link "href" => URI.join(site_url)
#   xml.link "href" => URI.join(site_url, current_page.path), "rel" => "self"
#   xml.updated(DateTime.now.iso8601)
#   xml.author { xml.name "Acksin" }

#   data.solutions.each do |product|
#     xml.entry do
#       xml.title product.title
#       xml.link "rel" => "alternate", "href" => URI.join(site_url, "/function/#{product.title.parameterize}/")
#       xml.id URI.join(site_url, "/function/#{product.title.parameterize}/")
#       xml.published DateTime.now.iso8601
#       xml.updated DateTime.now.iso8601
#       xml.author { xml.name product.company.name }
#       xml.summary product.description, "type" => "html"
#       xml.content product.description, "type" => "html"
#     end
#   end
# end
