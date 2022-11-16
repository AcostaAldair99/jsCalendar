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
    p=document.createElement("a");
    if(days==0){
        p.setAttribute("class","btn btn-secondary");
        p.innerHTML="VENCIDA";
    }else if(days<=3){
        p.setAttribute("class","btn btn-danger");
        p.innerHTML="ROJO";
    }else if(days>3 && days<7){
        p.setAttribute("class","btn btn-warning");
        p.innerHTML="AMARILLO";
    }else if(days>7){
        p.setAttribute("class","btn btn-success");        
        p.innerHTML="VERDE";
    }
    return p;
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
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sign Out";
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

    } else if (endpoint === graphConfig.graphMailEndpoint) {
        if (!data.value) {
            alert("You do not have a mailbox!")
        } else if (data.value.length < 1) {
            alert("Your mailbox is empty!")
        } else {
            const tabContent = document.getElementById("nav-tabContent");
            const tabList = document.getElementById("list-tab");
            tabList.innerHTML = ''; // clear tabList at each readMail call

            data.value.map((d, i) => {
                // Keeping it simple
                if (i < 10) {
                    const listItem = document.createElement("a");
                    listItem.setAttribute("class", "list-group-item list-group-item-action")
                    listItem.setAttribute("id", "list" + i + "list")
                    listItem.setAttribute("data-toggle", "list")
                    listItem.setAttribute("href", "#list" + i)
                    listItem.setAttribute("role", "tab")
                    listItem.setAttribute("aria-controls", i)
                    listItem.innerHTML = d.subject;
                    tabList.appendChild(listItem)

                    const contentItem = document.createElement("div");
                    contentItem.setAttribute("class", "tab-pane fade")
                    contentItem.setAttribute("id", "list" + i)
                    contentItem.setAttribute("role", "tabpanel")
                    contentItem.setAttribute("aria-labelledby", "list" + i + "list")
                    contentItem.innerHTML = "<strong> from: " + d.from.emailAddress.address + "</strong><br><br>" + d.bodyPreview + "...";
                    tabContent.appendChild(contentItem);
                }
            });
        }
    }else if(endpoint==graphConfig.graphCalendarEndpoint){
                const tbody = document.getElementById("table-body");
                tbody.innerHTML="";

            data.value.map((d,i)=>{
                if(i<10){
                    const tr=document.createElement("tr");
                    const th=document.createElement("th");
                    th.setAttribute("scope","row");
                    th.innerHTML=i;
                    const tds=document.createElement("td");
                    tds.innerHTML=d.subject;
                    const tdd=document.createElement("td");
                    tdd.innerHTML=formatDate(d.start.dateTime);
                    const tde=document.createElement("td");
                    tde.innerHTML=formatDate(d.end.dateTime);
                    var tdday=document.createElement("td");
                    tdday.innerHTML=diffDates(d.start.dateTime,d.end.dateTime);
                    var p=setStatus(diffDates(d.start.dateTime,d.end.dateTime));
                    var tstatus=document.createElement("td");
                    tstatus.appendChild(p);

                    tr.appendChild(th);
                    tr.appendChild(tds)
                    tr.appendChild(tdd)
                    tr.appendChild(tde)
                    tr.appendChild(tdday)
                    tr.appendChild(tstatus);
                    tbody.appendChild(tr);
                    
                    /*const listItem = document.createElement("a");
                    listItem.setAttribute("class", "list-group-item list-group-item-action")
                    listItem.setAttribute("id", "list" + i + "list")
                    listItem.setAttribute("data-toggle", "list")
                    listItem.setAttribute("href", "#list" + i)
                    listItem.setAttribute("role", "tab")
                    listItem.setAttribute("aria-controls", i)
                    listItem.innerHTML = d.subject+" - "+formatDate(d.start.dateTime)+" | "+formatDate(d.end.dateTime);
                    list.appendChild(listItem)

                    
                    const listItemEnd = document.createElement("a");
                    listItemEnd.setAttribute("class", "list-group-item list-group-item-action")
                    listItemEnd.setAttribute("id", "list" + i + "list")
                    listItemEnd.setAttribute("data-toggle", "list")
                    listItemEnd.setAttribute("href", "#list" + i)
                    listItemEnd.setAttribute("role", "tab")
                    listItemEnd.setAttribute("aria-controls", i)
                    listItemEnd.innerHTML = formatDate(d.end.dateTime);
                    endlist.appendChild(listItemEnd)
                    console.log("start Date: "+formatDate(d.start.dateTime)+" end date: "+formatDate(d.end.dateTime));
                    */
                    console.log("Subject: "+d.subject+" start Date: "+formatDate(d.start.dateTime)+" end date: "+formatDate(d.end.dateTime));

                }
                
            });
    }
}



