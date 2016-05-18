import {bootstrap}  from 'angular2/platform/browser';

import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {AcksinSubscribe} from './subscribe.ts';
import {OpsZeroRepos} from './repos.ts';
import {OpsZeroShow} from './show.ts';

if(document.getElementsByTagName("acksin-subscribe").length > 0) {
    bootstrap(AcksinSubscribe);
}

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
