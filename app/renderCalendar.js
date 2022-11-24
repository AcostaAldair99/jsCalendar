        
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
    calendar.render();
        