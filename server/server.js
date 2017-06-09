let https = require('https');
let options = {

host:'api.github.com',

path: '/users/' + username + '/repos',

method: 'GET',

headers: {'User-Agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
};

let request = https.request(options, function(response){
let body = '';
response.on('data',function(chunk){
    body+=chunk;
});
response.on('end',function(){
    let json = JSON.parse(body);
    let repos =[];
    json.forEach(function(repo){
        repos.push({
            name : repo.name,
            description : repo.description,
            url : repo.url
        });
    });
    console.log('the repos are  '+ JSON.stringify(repos));
});

});
request.on('error', function(e) {
console.error('and the error is '+e);
});
request.end();
