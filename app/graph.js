/** 
 * Helper function to call MS Graph API endpoint
 * using the authorization bearer token scheme
*/
function callMSGraph(endpoint, token, callback) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);
    headers.append("Prefer",'outlook.timezone="Etc/GMT+12"');
    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());
    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => callback(response, endpoint))
        .catch(error => console.log(error));
};


function sendMSGraph(endpoint, token, callback,content) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);
    headers.append("Prefer",'outlook.timezone="Etc/GMT+12"');

    headers.append("Accept","application/json");
    headers.append("Content-Type","application/json");
    const options = {
        method: 'POST',
        headers: headers,
        body:JSON.stringify(content)
    };

    console.log('post made to Graph API at: ' + new Date().toString());
    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => callback(response, endpoint))
        .catch(error => console.log(error));
}

