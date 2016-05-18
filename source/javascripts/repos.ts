import 'rxjs/Rx';
import {Component, Input} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

declare var BridgeAPI: any;

@Component({
    selector: 'opszero-repos',

    viewProviders: [HTTP_PROVIDERS],
    template: `
<h2>Repos</h2>
      <div class="row" *ngFor="#product of products">
        <div class="col-lg-7">
          <h3><a onclick="ga('send', 'event', 'Click', 'ProductPage', '{{ product.name }}');" href="https://{{ product.Repo }}">{{ product.name }}</a></h3>
          <p>
            {{ product.description }}
          </p>
        </div>

        <div class="col-lg-4 col-lg-offset-1">
          <p>
            <a href="https://aws.amazon.com/lambda"><i class="fa fa-amazon" aria-hidden="true"></i></a>
</p>

<p>
            <a class="btn btn-default" onclick="ga('send', 'event', 'Click', 'Github', '{{ product.name }}');" href="https://{{ product.Repo }}"><i class="fa fa-github" aria-hidden="true"></i> Github</a>
          </p>
        </div>
      </div>
`
})
export class OpsZeroRepos {
    constructor(http: Http) {
        http.get(BridgeAPI + "/v1/opszero/repos")
            .map(res => res.json())
            .subscribe(products => {
                this.products = products;
            });
    }
}
