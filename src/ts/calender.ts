import { allEvents } from "./fetches"
import { Event } from "./fetches"

const calenderSection = document.querySelector(".calender")

interface AllEvents {
  events: Event[]
}

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

if (allEvents) {
  const events: Event[] = (allEvents as AllEvents).events
  const eventsByMonth: { [key: string]: Event[] } = {}

  // Group events by month
  events.forEach((event) => {
    const date = new Date(event.date)
    const monthNumber = date.getMonth()
    const monthName = months[monthNumber]

    if (!eventsByMonth[monthName]) {
      eventsByMonth[monthName] = []
    }
    eventsByMonth[monthName].push(event)
  })

  // code voor de events te sorteren per maand
  for (const month in eventsByMonth) {
    const divMonth = document.createElement("div")
    divMonth.classList.add("div-month")
    const monthHeader = document.createElement("h1")
    const divUnderline = document.createElement("div")
    divUnderline.classList.add("underline")
    monthHeader.classList.add("header-month")
    monthHeader.textContent = month
    divMonth.appendChild(monthHeader)

    eventsByMonth[month].forEach((event) => {
      const divEvent = document.createElement("div")
      divEvent.classList.add("div-event")

      const nameEvent = document.createElement("h2")
      nameEvent.textContent = event.name

      const dateEvent = document.createElement("p")
      dateEvent.textContent = `Date: ${event.date}`

      const linkEventA = document.createElement("a")
      linkEventA.href = event.url
      linkEventA.textContent = event.url

      const linkEventP = document.createElement("p")
      linkEventP.textContent = "URL to the event: "
      linkEventP.append(linkEventA)

      const closed = event.is_closed

      divEvent.append(nameEvent)
      divEvent.append(dateEvent)
      if (closed === 0) {
        divEvent.append("The store is open")
      } else if (closed === 1) {
        divEvent.append("The store is closed")
      }

      if (event.url) {
        divEvent.append(linkEventP)
      } else {
        const pTagEventUrl = document.createElement("p")
        pTagEventUrl.textContent = "There is no link to the store"
        divEvent.append(pTagEventUrl)
      }

      divMonth.appendChild(divEvent)
      divMonth.appendChild(divUnderline)
    })

    calenderSection.appendChild(divMonth)
  }
}
