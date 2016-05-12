import {bootstrap}  from 'angular2/platform/browser';

import {AcksinSubscribe} from './subscribe.ts';

if(document.getElementsByTagName("acksin-subscribe").length > 0) {
    bootstrap(AcksinSubscribe);
}
