// Add here the endpoints for MS Graph API services you would like to use.

let startDate=new Date().toISOString();
let d=new Date();
d.setDate(d.getDate()+7);
let endDate=d.toISOString();
const queryDate="https://graph.microsoft.com/v1.0/me/calendarview?startdatetime="+startDate+"&enddatetime="+endDate;



const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
    graphCalendarEndpoint:queryDate
}
//2022-11-16T07:15:50.289Z
//2022-11-23T07:15:50.289Z


//2022-11-16T06:41:58.648Z
//2022-11-23T06:41:58.648Z