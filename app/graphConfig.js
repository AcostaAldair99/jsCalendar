// Add here the endpoints for MS Graph API services you would like to use.

let startDate=new Date().toISOString();
let d=new Date();
d.setDate(d.getDate()+7);
let endDate=d.toISOString();
const queryDate="https://graph.microsoft.com/v1.0/me/calendarview?startdatetime="+startDate+"&enddatetime="+endDate;



const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
    graphCalendarEndpoint:queryDate,
    graphSendMailEndPoint:"https://graph.microsoft.com/v1.0/me/sendMail"
}


