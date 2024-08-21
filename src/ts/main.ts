import { allPopups } from "./fetches"

const sectionPopUps = document.querySelector(".popups")
if (allPopups) {
  const popups = allPopups.popups
  popups.forEach((popup) => {
    const divPopup = document.createElement("div")
    divPopup.classList.add("div-popup")
    const startDate = document.createElement("p")
    const endDate = document.createElement("p")
    const amountOfDays = document.createElement("p")
    startDate.textContent = `Start date: ${popup.start_date}`
    endDate.textContent = `End date: ${popup.end_date}`
    amountOfDays.textContent = `Amount of days: ${popup.frequency_in_days}`
    divPopup.append(startDate)
    divPopup.append(endDate)
    divPopup.append(amountOfDays)
    sectionPopUps.append(divPopup)
  })
}

function highlightActiveLink(): void {
  const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("li a")

  for (const link of links) {
    if (window.location.pathname === link.getAttribute("href")) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  }
}

// Call the function when the website is loaded
window.addEventListener("load", highlightActiveLink)
