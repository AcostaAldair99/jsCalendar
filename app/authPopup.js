// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js

const myMSALObj = new msal.PublicClientApplication(msalConfig);



let username = "";

function selectAccount() {

    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add choose account code here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
}

function handleResponse(response) {

    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */

    if (response !== null) {
        username = response.account.username;
        showWelcomeMessage(username);
    } else {
        selectAccount();
    }
}

function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    myMSALObj.loginPopup(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.error(error);
        });
}

function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };

    myMSALObj.logoutPopup(logoutRequest);
}

function getTokenPopup(request) {

    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccountByUsername(username);
    
    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using popup");
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenPopup(request)
                    .then(tokenResponse => {
                        console.log(tokenResponse);
                        return tokenResponse;
                    }).catch(error => {
                        console.error(error);
                    });
            } else {
                console.warn(error);   
            }
    });
}

function seeProfile() {
    console.log(graphConfig.graphMeEndpoint);
    getTokenPopup(loginRequest)
        .then(response => {
            callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}
/*
function readMail() {
    getTokenPopup(tokenRequest)
        .then(response => {
            callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}
*/

function readTasks(){
    getTokenPopup(tokenRequest)
    .then(response=>{
        callMSGraph(graphConfig.graphTaskEndPoint,response.accessToken,updateUI);
    }).catch(error=>{
        console.error(error);
    });
       

}
/*
function sendWarningCalendar(){
        var content={"message":{"subject":"TAREA PENDIENTE !","body":{"contentType":"Text","content":"Tienes una tarea pendiente, la cual se vence en 7 Dias | Status: Verde"},"toRecipients":[{"emailAddress":"aa4ec07e-c5d6-4f52-b6c9-88f640e21293"}]}}
        /*emails.forEach((element)=>{
            //content.message.toRecipients.push(element);
            //console.log(content);
        });
        getTokenPopup(tokenRequest)
        .then(response=>{
            sendMSGraph(graphConfig.graphSendMailEndPoint,response.accessToken,updateUI,content);
        }).catch(error=>{
            console.error(error);
        });
}*/


function getTaskModal(){
    var myModal=new bootstrap.Modal(document.getElementById("myModal"));
    var dateInput=document.getElementById("endDate");
    const  limitDate=(date)=>{
        let d=new Date(date);
        let m=(d.getMonth()+1).toString().padStart(2,'0');
        let day=d.getDate().toString().padStart(2,'0');
        let year=d.getFullYear();
        return [year,m,day].join('-');
    }
    dateInput.setAttribute("min",limitDate(new Date()));
    myModal.show();
}




selectAccount();
