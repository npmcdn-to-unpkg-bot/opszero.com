import {bootstrap}  from 'angular2/platform/browser';

import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {OpsZeroRepos} from './repos.ts';
import {OpsZeroShow} from './show.ts';

if(document.getElementsByTagName("opszero-repos").length > 0) {
    bootstrap(OpsZeroRepos,
              [
                  HTTP_PROVIDERS,
              ]);
}

if(document.getElementsByTagName("opszero-show").length > 0) {
    bootstrap(OpsZeroShow,
              [
                  HTTP_PROVIDERS,
              ]);
}
