import 'rxjs/Rx';
import {Component, Input} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

declare var BridgeAPI: any;

@Component({
    selector: 'opszero-show',

    viewProviders: [HTTP_PROVIDERS],
    template: `
<section id="products" class="bg-light-gray">
  <div class="container">
    <div class="row">
      <div class="col-lg-7" id="docs">
        <h2><a onclick="ga('send', 'event', 'Click', 'ProductPage', '<%= product.title %>');" href="/function/<%= product.title.parameterize %>/"><%= product.title %></a></h2>

        <% if !product.readme.nil? && product.readme != "" %>
          <% case product.readme %>
          <% when /md$/ %>
            <%= markdown(open(product.readme).read) %>
          <% when /org$/ %>
            <%= orgmode(open(product.readme).read) %>
          <% else %>
            <%= markdown(open(product.readme).read) %>
          <% end %>
        <% end %>
      </div>

      <div class="col-lg-4 col-lg-offset-1">
        <p>
          <% if !product.buy.nil? && product.buy != "" %>
            Support by: <%= link_to product.company.name, product.company.url %><br>
            Support email: <%= link_to product.company.support_email, "mailto:#{product.company.support_email}" %>
          <% end %>
        </p>

        <p>
          <a href="https://aws.amazon.com/lambda"><i class="fa fa-amazon" aria-hidden="true"></i></a>
          <% if !product.github.nil? && product.github != "" %>
            <a  onclick="ga('send', 'event', 'Click', 'Github', '<%= product.title %>');" href="<%= product.github %>"><i class="fa fa-github" aria-hidden="true"></i></a>
          <% end %>
        </p>

        <p>
          <% if !product.buy.nil? && product.buy != "" %>
            <a onclick="ga('send', 'event', 'Click', 'Buy', '<%= product.title %>');" class="btn btn-lg buy-button btn-danger" href="<%= product.buy %>" rel="nofollow">Buy $<%= product.price %></a>
          <% end %>

          <% if false %>
            <a onclick="ga('send', 'event', 'Click', 'Docs', '<%= product.title %>');" class="btn btn-lg btn-success" href="<%= product.url %>">Docs</a>
          <% end %>

          <% if !product.demo.nil?  && product.demo != "" %>
            <a  onclick="ga('send', 'event', 'Click', 'Demo', '<%= product.title %>');" class="btn btn-lg btn-default" href="<%= product.demo %>" rel="nofollow">Demo</a>
          <% end %>
        </p>

        <p>
          <br>
          <br>
          <br>

          <strong>Recommendations</strong>
          <ul>
            <% data.solutions.sample(3).each do |p| %>
              <li>
                <a onclick="ga('send', 'event', 'Click', 'ProductPageRecommend', '<%= p.title %>');" href="/function/<%= p.title.parameterize %>/"><%= p.title %></a>
              </li>
            <% end %>
          </ul>
        </p>

        <p>
          <br>
          <br>
          <br>
          Subscribe to get updates on opsZero and new functions as they are released.
          <%= partial :subscribe %>
        </p>
      </div>
    </div>
  </div>
</section>
`
})
export class OpsZeroShow {
    constructor(http: Http) {
        http.get(BridgeAPI + "/v1/opszero/repos")
            .map(res => res.json())
            .subscribe(products => {
                console.log(JSON.stringify(products));
                this.products = products;
            });
    }
}
