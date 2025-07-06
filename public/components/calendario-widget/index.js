class CalendarioWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.currentDate = new Date();
    this.selectedDate = null;
    this.events = this.generateSampleEvents();
    this.setupComponent();
  }

  setupComponent() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
        
        .calendario-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          gap: 12px;
        }
        
        .calendar-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 8px;
          flex-shrink: 0;
        }
        
        .nav-button {
          background: linear-gradient(135deg, #36b99d, #2ea384);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(54, 185, 157, 0.3);
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .nav-button:hover {
          background: linear-gradient(135deg, #2ea384, #268a73);
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(54, 185, 157, 0.4);
        }
        
        .nav-button:active {
          transform: translateY(0);
        }
        
        .month-year {
          font-weight: bold;
          color: #2c3e50;
          font-size: 1.1rem;
          text-align: center;
          min-width: 160px;
          padding: 6px 12px;
          background: linear-gradient(135deg, rgba(54, 185, 157, 0.1), rgba(54, 185, 157, 0.05));
          border-radius: 6px;
        }
        
        .calendar-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          background: white;
        }
        
        table {
          border-collapse: collapse;
          width: 100%;
          height: 100%;
          background: white;
        }
        
        th, td {
          text-align: center;
          position: relative;
          transition: all 0.2s ease;
          user-select: none;
          border: 1px solid #e8e8e8;
        }
        
        th {
          background: linear-gradient(135deg, #f88ca6, #e879a0);
          color: white;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          padding: 8px 4px;
          height: 35px;
        }
        
        td {
          background-color: white;
          cursor: pointer;
          vertical-align: middle;
          font-weight: 500;
          padding: 4px;
          height: calc((100% - 35px) / 6);
          min-height: 40px;
        }
        
        td:hover {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          transform: scale(1.02);
          z-index: 2;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        
        td.today {
          background: linear-gradient(135deg, #36b99d, #2ea384);
          color: white;
          font-weight: bold;
          box-shadow: 0 0 0 2px rgba(54, 185, 157, 0.3);
        }
        
        td.today:hover {
          background: linear-gradient(135deg, #2ea384, #268a73);
          transform: scale(1.05);
        }
        
        td.selected {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-weight: bold;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.4);
        }
        
        td.has-event {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #92400e;
          font-weight: 600;
        }
        
        td.has-event:hover {
          background: linear-gradient(135deg, #fde68a, #fcd34d);
          transform: scale(1.02);
        }
        
        td.has-event::after {
          content: '●';
          position: absolute;
          bottom: 2px;
          right: 3px;
          color: #f59e0b;
          font-size: 8px;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        td.other-month {
          color: #9ca3af;
          background-color: #f9fafb;
          font-weight: normal;
        }
        
        td.other-month:hover {
          background-color: #f3f4f6;
          transform: none;
        }
        
        .weekend {
          background-color: #fef2f2 !important;
          color: #dc2626;
        }
        
        .weekend.other-month {
          background-color: #f9fafb !important;
          color: #9ca3af;
        }
        
        .calendar-footer {
          padding: 8px 12px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          flex-shrink: 0;
        }
        
        .quick-nav {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-bottom: 8px;
        }
        
        .quick-nav-btn {
          background: #f1f5f9;
          color: #475569;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
          transition: all 0.2s ease;
        }
        
        .quick-nav-btn:hover {
          background: #e2e8f0;
          color: #334155;
        }
        
        .events-count {
          text-align: center;
          font-size: 0.8rem;
          color: #1e40af;
          font-weight: 500;
          margin-bottom: 6px;
        }
        
        .selected-date-info {
          padding: 8px;
          background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
          border-radius: 6px;
          font-size: 0.8rem;
          color: #7c3aed;
          font-weight: 500;
          display: none;
          margin-top: 8px;
        }
        
        .events-for-date {
          margin-top: 6px;
          font-size: 0.75rem;
        }
        
        .event-item {
          background: rgba(255, 255, 255, 0.8);
          padding: 3px 6px;
          margin: 2px 0;
          border-radius: 3px;
          border-left: 2px solid #f59e0b;
          font-size: 0.7rem;
        }
        
        .btn-evento {
          background: linear-gradient(135deg, #36b99d, #2ea384);
          color: white;
          border: none;
          padding: 8px 16px;
          font-size: 0.85rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(54, 185, 157, 0.3);
          position: relative;
          overflow: hidden;
          margin-top: 8px;
        }
        
        .btn-evento::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .btn-evento:hover::before {
          left: 100%;
        }
        
        .btn-evento:hover {
          background: linear-gradient(135deg, #2ea384, #268a73);
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(54, 185, 157, 0.4);
        }
        
        /* Responsive adjustments */
        @media (max-width: 991px) {
          .calendario-wrapper {
            gap: 10px;
          }
          
          th {
            font-size: 0.8rem;
            padding: 6px 3px;
            height: 30px;
          }
          
          td {
            min-height: 35px;
            padding: 3px;
          }
          
          .month-year {
            font-size: 1rem;
            min-width: 140px;
          }
          
          .nav-button {
            padding: 6px 10px;
            font-size: 1rem;
            min-width: 35px;
          }
        }
        
        @media (max-width: 767px) {
          .calendario-wrapper {
            gap: 8px;
          }
          
          th {
            font-size: 0.75rem;
            padding: 5px 2px;
            height: 25px;
          }
          
          td {
            min-height: 30px;
            padding: 2px;
            font-size: 0.85rem;
          }
          
          .month-year {
            font-size: 0.9rem;
            min-width: 120px;
          }
          
          .nav-button {
            padding: 5px 8px;
            font-size: 0.9rem;
            min-width: 30px;
          }
          
          .btn-evento {
            padding: 6px 12px;
            font-size: 0.8rem;
          }
          
          .quick-nav-btn {
            padding: 3px 6px;
            font-size: 0.7rem;
          }
        }
        
        @media (max-width: 479px) {
          .calendario-wrapper {
            gap: 6px;
          }
          
          th {
            font-size: 0.7rem;
            padding: 4px 1px;
            height: 22px;
          }
          
          td {
            min-height: 25px;
            padding: 1px;
            font-size: 0.8rem;
          }
          
          .month-year {
            font-size: 0.85rem;
            min-width: 100px;
          }
          
          .nav-button {
            padding: 4px 6px;
            font-size: 0.85rem;
            min-width: 28px;
          }
        }
      </style>

      <div class="calendario-wrapper">
        <div class="calendar-navigation">
          <button class="nav-button" id="prevMonth" title="Mes anterior">‹</button>
          <div class="month-year" id="monthYear"></div>
          <button class="nav-button" id="nextMonth" title="Mes siguiente">›</button>
        </div>
        
        <div class="calendar-container">
          <table>
            <thead>
              <tr>
                <th>Dom</th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th>
              </tr>
            </thead>
            <tbody class="calendar-body" id="calendarBody"></tbody>
          </table>
          
          <div class="calendar-footer">
            <div class="quick-nav">
              <button class="quick-nav-btn" id="todayBtn">Hoy</button>
              <button class="quick-nav-btn" id="nextWeekBtn">Próxima semana</button>
              <button class="quick-nav-btn" id="nextMonthBtn">Próximo mes</button>
            </div>
            
            <div class="events-count" id="eventsCount">
              📊 <span id="eventCountText">Eventos del mes: 0</span>
            </div>
            
            <button class="btn-evento" id="btnEvento" onclick="window.location.href='./create.html'">✨ Registra tu evento</button>
            
            <div class="selected-date-info" id="selectedDateInfo">
              <div>📅 <span id="selectedDateText"></span></div>
              <div class="events-for-date" id="eventsForDate"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
    this.renderCalendar();
  }

  generateSampleEvents() {
    const events = [];
    const today = new Date();
    
    // Generar eventos para varios meses
    const eventsData = [
      { day: 7, title: "Conversación en Inglés", time: "14:00" },
      { day: 12, title: "Club de Francés", time: "16:30" },
      { day: 18, title: "Alemán de Negocios", time: "19:00" },
      { day: 23, title: "Italiano Cultural", time: "18:00" },
      { day: 28, title: "Japonés Anime", time: "20:00" },
      { day: 15, title: "Intercambio de Idiomas", time: "17:00" },
      { day: 20, title: "Pronunciación en Inglés", time: "15:30" },
      { day: 25, title: "Cultura Española", time: "19:30" }
    ];
    
    // Eventos para el mes actual
    eventsData.forEach(eventData => {
      const eventDate = new Date(today.getFullYear(), today.getMonth(), eventData.day);
      if (eventData.day <= new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()) {
        events.push({
          date: eventDate,
          title: eventData.title,
          time: eventData.time
        });
      }
    });
    
    // Algunos eventos para el mes siguiente
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    [5, 10, 15, 22].forEach(day => {
      const eventDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day);
      events.push({
        date: eventDate,
        title: `Evento ${day}/${nextMonth.getMonth() + 1}`,
        time: "18:00"
      });
    });
    
    return events;
  }

  setupEventListeners() {
    // Navegación del calendario
    this.shadowRoot.getElementById('prevMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.renderCalendar();
    });

    this.shadowRoot.getElementById('nextMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    });

    // Navegación rápida
    this.shadowRoot.getElementById('todayBtn').addEventListener('click', () => {
      this.currentDate = new Date();
      this.selectedDate = new Date();
      this.renderCalendar();
      this.showSelectedDateInfo();
    });

    this.shadowRoot.getElementById('nextWeekBtn').addEventListener('click', () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      this.currentDate = new Date(nextWeek.getFullYear(), nextWeek.getMonth(), 1);
      this.selectedDate = nextWeek;
      this.renderCalendar();
      this.showSelectedDateInfo();
    });

    this.shadowRoot.getElementById('nextMonthBtn').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.renderCalendar();
    });

    // Botón de crear evento
    this.shadowRoot.getElementById('btnEvento').addEventListener('click', () => {
      const dateToUse = this.selectedDate || new Date();
      this.dispatchEvent(new CustomEvent('createEvent', {
        detail: { date: dateToUse },
        bubbles: true
      }));
    });
  }

  renderCalendar() {
    const tbody = this.shadowRoot.getElementById('calendarBody');
    const monthYear = this.shadowRoot.getElementById('monthYear');
    const eventCountText = this.shadowRoot.getElementById('eventCountText');
    
    // Actualizar título del mes
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    monthYear.textContent = `${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    
    // Calcular días del mes
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Contar eventos del mes actual
    const eventsThisMonth = this.events.filter(event => 
      event.date.getMonth() === month && event.date.getFullYear() === year
    ).length;
    
    eventCountText.textContent = `Eventos del mes: ${eventsThisMonth}`;
    
    let html = '<tr>';
    
    // Días vacíos al inicio del mes anterior
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const isWeekend = (firstDay - 1 - i) % 7 === 0 || (firstDay - 1 - i) % 7 === 6;
      html += `<td class="other-month ${isWeekend ? 'weekend' : ''}">${dayNum}</td>`;
    }
    
    // Días del mes actual
    for (let d = 1; d <= daysInMonth; d++) {
      if ((firstDay + d - 1) % 7 === 0 && d !== 1) {
        html += '</tr><tr>';
      }
      
      const cellDate = new Date(year, month, d);
      const dayOfWeek = cellDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      let cellClass = '';
      
      if (isWeekend) cellClass += ' weekend';
      
      // Marcar día actual
      if (this.isSameDay(cellDate, today)) {
        cellClass += ' today';
      }
      
      // Marcar día seleccionado
      if (this.selectedDate && this.isSameDay(cellDate, this.selectedDate)) {
        cellClass += ' selected';
      }
      
      // Marcar días con eventos
      if (this.hasEvent(cellDate)) {
        cellClass += ' has-event';
      }
      
      html += `<td class="${cellClass}" data-date="${year}-${month}-${d}">${d}</td>`;
    }
    
    // Completar la última semana con días del mes siguiente
    const totalCells = firstDay + daysInMonth;
    const remainingCells = totalCells % 7;
    if (remainingCells !== 0) {
      for (let i = 1; i <= 7 - remainingCells; i++) {
        const dayOfWeek = (totalCells + i - 1) % 7;
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        html += `<td class="other-month ${isWeekend ? 'weekend' : ''}">${i}</td>`;
      }
    }
    
    html += '</tr>';
    tbody.innerHTML = html;
    
    // Agregar event listeners a las celdas
    this.shadowRoot.querySelectorAll('td[data-date]').forEach(cell => {
      cell.addEventListener('click', (e) => {
        const dateString = cell.dataset.date;
        const [year, month, day] = dateString.split('-').map(Number);
        this.selectedDate = new Date(year, month, day);
        
        // Re-renderizar para mostrar selección
        this.renderCalendar();
        this.showSelectedDateInfo();
        
        this.dispatchEvent(new CustomEvent('dateSelected', {
          detail: { date: this.selectedDate },
          bubbles: true
        }));
      });
    });
  }

  showSelectedDateInfo() {
    const selectedDateInfo = this.shadowRoot.getElementById('selectedDateInfo');
    const selectedDateText = this.shadowRoot.getElementById('selectedDateText');
    const eventsForDate = this.shadowRoot.getElementById('eventsForDate');
    
    if (this.selectedDate) {
      selectedDateInfo.style.display = 'block';
      selectedDateText.textContent = this.selectedDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Mostrar eventos para la fecha seleccionada
      const eventsOnDate = this.events.filter(event => 
        this.isSameDay(event.date, this.selectedDate)
      );
      
      if (eventsOnDate.length > 0) {
        eventsForDate.innerHTML = eventsOnDate.map(event => 
          `<div class="event-item">⏰ ${event.time} - ${event.title}</div>`
        ).join('');
      } else {
        eventsForDate.innerHTML = '<div style="color: #64748b; font-style: italic;">No hay eventos programados</div>';
      }
    } else {
      selectedDateInfo.style.display = 'none';
    }
  }

  isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  hasEvent(date) {
    return this.events.some(event => this.isSameDay(event.date, date));
  }

  // Método público para agregar eventos
  addEvent(date, title, time = '18:00') {
    this.events.push({ date: new Date(date), title, time });
    this.renderCalendar();
    if (this.selectedDate && this.isSameDay(date, this.selectedDate)) {
      this.showSelectedDateInfo();
    }
  }

  // Método público para obtener eventos de una fecha
  getEventsForDate(date) {
    return this.events.filter(event => this.isSameDay(event.date, date));
  }
}

customElements.define("calendario-widget", CalendarioWidget);