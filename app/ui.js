document.addEventListener("DOMContentLoaded",function(){
    readTasks();
    form.addEventListener('submit',function(e){
            e.preventDefault();
            const taskName=document.getElementById("titleTask").value;
            const dateInput=document.getElementById("endDate").value;
            if(taskName=='' || dateInput==''){
                Swal.fire({
                    title: 'Advertencia !',
                    text: 'Debes Ingresar los datos completos',
                    icon: 'warning',
                  });
            }else{
                console.log(taskName+" - "+dateInput);
        
            }
    });

});



function exportToExcel(){
    var tableid=document.getElementById("table-body").id;
    htmlTableToExcel(tableid,filename='Reporte_Acts -'+new Date());
}

var htmlTableToExcel=function(tableId,filename=''){
    var excelFilename='Reporte_de_Eventos';
    var TableDataType='application/vnd.ms-excel';
    var selectTable=document.getElementById(tableId);
    var htmlTable=selectTable.outerHTML.replace(/ /g,'%20');

    filename=filename?filename+'.xls':excelFilename+'.xls';
    var excelFileURL=document.createElement("a");
    document.body.appendChild(excelFileURL);

    if(navigator.msSaveOrOpenBlob){
        var blob=new Blob(['\ufeff',htmlTable],{type:TableDataType});
        navigator.msSaveOrOpenBlob(blob,filename);
    }else{
        excelFileURL.href = 'data:' + TableDataType + ', ' + htmlTable;
        excelFileURL.download = filename;
        excelFileURL.click();
    }
}


const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

const diffDates=(date1,date2)=>{
    var d1=new Date(date1);
    var d2=new Date(date2);
    var Difference_In_Time = d2.getTime() - d1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.round(Difference_In_Days)
}

const setStatus=(days)=>{
        
        let color=null;
        if(days==0){
            color="";
        }else if(days<=3){
            color="red";
        }else if(days>3 && days<7){
            color="yellow";
        }else if(days>7){
            console.log(days);
            color="green";
        }
    return color;
}

// Select DOM elements to work with
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");
const datadiv=document.getElementById("div-res");

function showWelcomeMessage(username) {
    // Reconfiguring DOM elements
    cardDiv.style.display = 'initial';
    welcomeDiv.innerHTML = `Welcome ${username}`;
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-danger")
    signInButton.innerHTML = "Sign Out";
    let mainDiv=document.getElementById("main");
    mainDiv.style.display='block';
}



function updateUI(data, endpoint) {
    console.log('Graph API responded at: ' + new Date().toString());

    if (endpoint === graphConfig.graphMeEndpoint) {
        profileDiv.innerHTML = ''
        const title = document.createElement('p');
        title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
        const email = document.createElement('p');
        email.innerHTML = "<strong>Mail: </strong>" + data.mail;
        const phone = document.createElement('p');
        phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
        const address = document.createElement('p');
        address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
        profileDiv.appendChild(title);
        profileDiv.appendChild(email);
        profileDiv.appendChild(phone);
        profileDiv.appendChild(address);

    } else if (endpoint === graphConfig.graphTaskEndPoint) {
        const inputs=[];
        const template={"id":null,"title":null,"start":null,"color":null};
        data.value.map((d,i)=>{
            template.id=i+10000;
            template.title=d.title;
            template.start=formatDate(d.dueDateTime);
            template.color=setStatus(diffDates(new Date(),d.dueDateTime));
            inputs.push(template);
        });
            
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale:'es',
        headerToolbar:{
        left:'prev, next, today',
        center:'title',
        right:'dayGridMonth,timeGridWeek,listWeek'
         },
        });
        data.value.map((d,i)=>{
            template.id=i+10000;
            template.title=d.title;
            template.start=formatDate(d.dueDateTime);
            template.color=setStatus(diffDates(new Date(),d.dueDateTime));
            console.log(d);
            calendar.addEvent(template)
        });

        calendar.render(); 
        
    }
}



