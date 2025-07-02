// Sample data
const eventsData = [
  {
    id: 1,
    title: "Conversación en Inglés - Nivel Intermedio",
    language: "Inglés",
    date: "2025-01-02",
    time: "18:00",
    location: "Café Central, Madrid",
    organizer: {
      name: "Ana Martínez",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "Profesora certificada con 5 años de experiencia",
    },
    attendees: [
      { name: "Carlos López", level: "Intermedio", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sofia García", level: "Intermedio", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Miguel Torres", level: "Avanzado", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Laura Ruiz", level: "Intermedio", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    description:
      "Sesión de conversación enfocada en temas cotidianos y profesionales. Perfecto para practicar fluidez y ganar confianza.",
  },
  {
    id: 2,
    title: "Intercambio Francés-Español",
    language: "Francés",
    date: "2025-01-03",
    time: "19:30",
    location: "Biblioteca Nacional",
    organizer: {
      name: "Pierre Dubois",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "Nativo francés, estudiante de español",
    },
    attendees: [
      { name: "María González", level: "Principiante", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Roberto Silva", level: "Intermedio", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Elena Vega", level: "Avanzado", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    description:
      "Intercambio de idiomas donde practicaremos francés y español alternadamente. Ambiente relajado y amigable.",
  },
  {
    id: 3,
    title: "Alemán para Principiantes",
    language: "Alemán",
    date: "2025-01-05",
    time: "17:00",
    location: "Centro Cultural Alemán",
    organizer: {
      name: "Hans Mueller",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "Profesor nativo con certificación DaF",
    },
    attendees: [
      { name: "Andrea Morales", level: "Principiante", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Javier Herrera", level: "Principiante", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    description: "Introducción básica al alemán con enfoque en pronunciación y vocabulario esencial.",
  },
]

const groupsData = [
  {
    id: 1,
    name: "English Speakers Madrid",
    members: 156,
    color: "#3b82f6",
    language: "Inglés",
  },
  {
    id: 2,
    name: "Français Ensemble",
    members: 89,
    color: "#ef4444",
    language: "Francés",
  },
  {
    id: 3,
    name: "Deutsch Lernen",
    members: 67,
    color: "#f59e0b",
    language: "Alemán",
  },
  {
    id: 4,
    name: "Italiano Bello",
    members: 43,
    color: "#10b981",
    language: "Italiano",
  },
]

// Calendar functionality
const currentDate = new Date()
let currentMonth = currentDate.getMonth()
let currentYear = currentDate.getFullYear()

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

function generateCalendar(month, year) {
  const calendar = document.getElementById("calendar")
  const currentMonthElement = document.getElementById("currentMonth")

  calendar.innerHTML = ""
  currentMonthElement.textContent = `${months[month]} ${year}`

  // Add day headers
  daysOfWeek.forEach((day) => {
    const dayHeader = document.createElement("div")
    dayHeader.className = "calendar-header"
    dayHeader.textContent = day
    calendar.appendChild(dayHeader)
  })

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  // Add previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayElement = document.createElement("div")
    dayElement.className = "calendar-day other-month"
    dayElement.textContent = daysInPrevMonth - i
    calendar.appendChild(dayElement)
  }

  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div")
    dayElement.className = "calendar-day"
    dayElement.textContent = day

    // Check if it's today
    const today = new Date()
    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
      dayElement.classList.add("today")
    }

    // Check if there are events on this day
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    const hasEvent = eventsData.some((event) => event.date === dateString)
    if (hasEvent) {
      dayElement.classList.add("has-event")
    }

    calendar.appendChild(dayElement)
  }

  // Add next month's leading days
  const totalCells = calendar.children.length - 7 // Subtract header row
  const remainingCells = 42 - totalCells // 6 rows * 7 days
  for (let day = 1; day <= remainingCells; day++) {
    const dayElement = document.createElement("div")
    dayElement.className = "calendar-day other-month"
    dayElement.textContent = day
    calendar.appendChild(dayElement)
  }
}

function renderEvents() {
  const eventsList = document.getElementById("eventsList")
  eventsList.innerHTML = ""

  // Sort events by date
  const sortedEvents = [...eventsData].sort((a, b) => new Date(a.date) - new Date(b.date))

  sortedEvents.forEach((event) => {
    const eventCard = document.createElement("div")
    eventCard.className = "event-card"
    eventCard.onclick = () => showEventModal(event)

    const eventDate = new Date(event.date)
    const formattedDate = eventDate.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })

    eventCard.innerHTML = `
            <div class="event-header">
                <div>
                    <div class="event-title">${event.title}</div>
                </div>
                <span class="event-language">${event.language}</span>
            </div>
            <div class="event-details">
                <div class="event-detail">
                    <i class="fas fa-calendar"></i>
                    <span>${formattedDate}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-clock"></i>
                    <span>${event.time}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
            </div>
            <div class="event-organizer">
                <img src="${event.organizer.avatar}" alt="${event.organizer.name}" class="organizer-avatar">
                <span class="organizer-name">Por ${event.organizer.name}</span>
            </div>
        `

    eventsList.appendChild(eventCard)
  })
}

function renderGroups() {
  const groupsGrid = document.getElementById("groupsGrid")
  groupsGrid.innerHTML = ""

  groupsData.forEach((group) => {
    const groupCard = document.createElement("div")
    groupCard.className = "group-card"

    groupCard.innerHTML = `
            <div class="group-icon" style="background-color: ${group.color}">
                <i class="fas fa-users"></i>
            </div>
            <div class="group-name">${group.name}</div>
            <div class="group-members">${group.members} miembros</div>
        `

    groupsGrid.appendChild(groupCard)
  })
}

function showEventModal(event) {
  const modal = document.getElementById("eventModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalBody = document.getElementById("modalBody")

  modalTitle.textContent = event.title

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  modalBody.innerHTML = `
        <div class="event-details">
            <div class="event-detail">
                <i class="fas fa-calendar"></i>
                <span>${formattedDate}</span>
            </div>
            <div class="event-detail">
                <i class="fas fa-clock"></i>
                <span>${event.time}</span>
            </div>
            <div class="event-detail">
                <i class="fas fa-map-marker-alt"></i>
                <span>${event.location}</span>
            </div>
            <div class="event-detail">
                <i class="fas fa-globe"></i>
                <span>${event.language}</span>
            </div>
        </div>
        
        <div style="margin: 1.5rem 0;">
            <h4 style="color: #1e293b; margin-bottom: 0.5rem;">Descripción</h4>
            <p style="color: #64748b;">${event.description}</p>
        </div>
        
        <div style="margin: 1.5rem 0;">
            <h4 style="color: #1e293b; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-user"></i>
                Organizador
            </h4>
            <div class="event-organizer">
                <img src="${event.organizer.avatar}" alt="${event.organizer.name}" style="width: 40px; height: 40px; border-radius: 50%;">
                <div>
                    <div style="font-weight: 600; color: #1e293b;">${event.organizer.name}</div>
                    <div style="font-size: 0.875rem; color: #64748b;">${event.organizer.experience}</div>
                </div>
            </div>
        </div>
        
        <div class="attendees-section">
            <h4>
                <i class="fas fa-users"></i>
                Asistentes (${event.attendees.length})
            </h4>
            <div class="attendees-list">
                ${event.attendees
                  .map(
                    (attendee) => `
                    <div class="attendee-card">
                        <img src="${attendee.avatar}" alt="${attendee.name}" class="attendee-avatar">
                        <div class="attendee-info">
                            <div class="attendee-name">${attendee.name}</div>
                            <div class="attendee-level">${attendee.level}</div>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `

  modal.style.display = "block"
}

// Event listeners
document.getElementById("prevMonth").addEventListener("click", () => {
  currentMonth--
  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }
  generateCalendar(currentMonth, currentYear)
})

document.getElementById("nextMonth").addEventListener("click", () => {
  currentMonth++
  if (currentMonth > 11) {
    currentMonth = 0
    currentYear++
  }
  generateCalendar(currentMonth, currentYear)
})

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("eventModal").style.display = "none"
})

// Close modal when clicking outside
document.getElementById("eventModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("eventModal")) {
    document.getElementById("eventModal").style.display = "none"
  }
})

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", () => {
  generateCalendar(currentMonth, currentYear)
  renderEvents()
  renderGroups()
})
