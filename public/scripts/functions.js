    let date = new Date();
    let dayOfWeek = date.getDay();

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
      "November", "December"];
    let monthElement = document.getElementById("month");
    let yearElement = document.getElementById("year");
    let weekElement = document.getElementById("week");
    let savedEvents = [];

    let calendarDates = weekDates(date);

    fetch("/calendar/api", {
      method: "GET"
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(events) {
      savedEvents = events;
      currentWeek(calendarDates); 
    });

    date.setDate(date.getDate());

    function weekDates(date) {
      let day = new Date(date);
      let dayOfWeek = day.getDay();
      let weekBefore = -dayOfWeek;
      let weekAfter = 7 + weekBefore;
      let dates = [];
      

      day.setDate(day.getDate() + weekBefore);

      for (let i = weekBefore; i < weekAfter; i++) {
        day.setDate(day.getDate() + 1);
        let yearMonthDay = day.toLocaleDateString();

        dates.push(yearMonthDay);
      }


      return dates;
    }

    
    const calendarWrapper = document.getElementById("calendar-wrapper");

    function currentWeek(dates) {
      calendarWrapper.innerText = "";

      dates.forEach(ele => {

        const dayWrapper = document.createElement("div");
        dayWrapper.classList.add("day-wrapper");

        const dayBubble = document.createElement("div");
        dayBubble.classList.add("day-bubble");
        dayBubble.onclick = eventPopUp;

        let dateSpan = document.createElement("span");
        dateSpan.classList.add("date-span");
         // -------------I WANT THIS TO CHANGE TO "MONDAY" ETC-----------
        dateSpan.innerText = ele;

        const eventWrapper = document.createElement("div");
        eventWrapper.classList.add("event-wrapper");

        const eventTitle = document.createElement("p");
        eventTitle.classList.add("event-title");

        const eventButtons = document.createElement("div");
        eventButtons.classList.add("event-buttons");

        const editButton = document.createElement("button");
        editButton.innerText = "EDIT";
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "DELETE";

        console.log(dateSpan.innerText);


        let result = savedEvents.events.filter((e) => {
          return e.date === ele;
          
        });

        eventWrapper.appendChild(eventTitle);

        if (result.length > 0) {
          eventTitle.innerText = result[0].title + " " + result[0].time;
          eventWrapper.appendChild(eventButtons);
        };

        dateSpan.appendChild(eventWrapper);
        calendarWrapper.appendChild(dateSpan);
        eventButtons.appendChild(editButton);
        eventButtons.appendChild(deleteButton);
        dayBubble.appendChild(dateSpan);
        dayWrapper.appendChild(dayBubble);
        dayWrapper.appendChild(eventWrapper);
        calendarWrapper.appendChild(dayWrapper);
      });
    }


    const previous = document.getElementById("previous");

    previous.addEventListener("click", () => {

      let first = document.querySelector(".date-span");
      let monday = first.innerText;
      let day = new Date(monday);
      //  Last week
      day.setDate(day.getDate() - 7);
      calendarDates = weekDates(day);
      currentWeek(calendarDates);

      monthElement.innerText = months[day.getMonth()];
      yearElement.innerText = day.getFullYear();
    });

    const next = document.getElementById("next");

    next.addEventListener("click", () => {

      let first = document.querySelector(".date-span");
      let monday = first.innerText;
      let day = new Date(monday);
      //  Last week
      day.setDate(day.getDate() + 7);
      calendarDates = weekDates(day);
      currentWeek(calendarDates);

      monthElement.innerText = months[day.getMonth()];
      yearElement.innerText = day.getFullYear();
    });

    function eventPopUp() {
      let pop = document.getElementById("eventPop");
      if (pop.style.display === "block") {
        pop.style.display = "none";
      } else {
        pop.style.display = "block"
      }
      console.log(this.parentElement.innerText);
    }

    async function deleteEvent(id) {
      console.log("delete test", id);
      const response = await fetch(`/index/${id}`, {
        method: "delete"
      });

      if (response.redirected) {
        window.location.href = response.url;
      }
    }

    async function editEvent(evt) {
      // const id = Number(evt.target.dataset.id); // data-id -> dataset.id

      const container = evt.target.parentElement;
      const id = container.querySelector(".edit-btn").getAttribute("data-id");
      const title = container.querySelector(".event-title");
      const time = container.querySelector(".event-time");

      // if not editable make them editable
      if (!title.isContentEditable && !time.isContentEditable) {
        title.contentEditable = true;
        time.contentEditable = true;
        // clicking the same button should save the changes
        evt.target.innerText = "Save";
      } else {
        // Second time clicked it should save changes
        // reset element to be non editable
        title.contentEditable = false;
        time.contentEditable = false;
        evt.target.innerText = "Edit";
        // Look at values of titleEl and qudate and submit new quote
        const newEvent = {
          title: title.innerText,
          time: time.innerText,
        };
        const response = await fetch(`/events/${id}`, {
          method: "put",
          body: JSON.stringify(newEvent),
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Check if there is a redirect to follow the new url
        if (response.redirected) {
          window.location.href = response.url;
        }
      }
    }
    document.querySelectorAll(".edit-btn").forEach((btn) => (btn.onclick = editEvent));