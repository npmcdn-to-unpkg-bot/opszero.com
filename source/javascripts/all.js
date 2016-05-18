AWS.config = new AWS.Config({
    accessKeyId: 'AKIAJEYRCNZWVN5LPIDQ',
    secretAccessKey: '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',
    region: 'us-west-2'
});

if(document.location.href.match("opszero.com")) {
    BridgeAPI = "https://api.opszero.com";
} else {
    BridgeAPI = "http://nanoyak.com:8080";
}
