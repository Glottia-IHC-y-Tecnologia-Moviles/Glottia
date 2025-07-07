class ReunionList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.setupComponent();
  }

  setupComponent() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }
        
        :host {
          display: block;
          height: 100%;
          width: 100%;
        }
        
        .reunion-container {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .filter-controls {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        
        .filter-btn {
          background: #f1f5f9;
          color: #475569;
          border: none;
          padding: 6px 12px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        
        .filter-btn.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
        }
        
        .filter-btn:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }
        
        .filter-btn.active:hover {
          background: linear-gradient(135deg, #5a67d8, #6b46c1);
        }
        
        .reunion-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
          padding-right: 4px;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
        
        .reunion-list::-webkit-scrollbar {
          width: 4px;
        }
        
        .reunion-list::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .reunion-list::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        
        .reunion-list::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        .reunion-card {
          background: linear-gradient(135deg, #f88ca6, #e879a0);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          min-height: 140px;
          display: flex;
          flex-direction: column;
        }
        
        .reunion-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
        
        .reunion-card:hover::before {
          left: 100%;
        }
        
        .reunion-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(248, 140, 166, 0.4);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        .reunion-card.joined {
          background: linear-gradient(135deg, #4ade80, #22d3ee);
          box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
        }
        
        .reunion-card.favorited {
          border: 2px solid #fbbf24;
          box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
        }
        
        .reunion-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .reunion-title-section {
          flex: 1;
        }
        
        .reunion-title {
          font-weight: 700;
          color: white;
          font-size: 1rem;
          margin: 0 0 4px 0;
          line-height: 1.2;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        
        .reunion-subtitle {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          margin-bottom: 6px;
        }
        
        .reunion-badges {
          display: flex;
          gap: 6px;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        
        .reunion-language {
          background: rgba(255, 255, 255, 0.25);
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .difficulty-badge {
          background: rgba(0, 0, 0, 0.2);
          color: white;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 0.65rem;
          font-weight: 600;
        }
        
        .reunion-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin: 8px 0;
          flex: 1;
        }
        
        .reunion-time {
          display: flex;
          align-items: center;
          gap: 6px;
          color: white;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .reunion-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.75rem;
          line-height: 1.4;
          margin: 6px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .reunion-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 8px;
        }
        
        .participants-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .participants-count {
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .participants-bar {
          width: 40px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .participants-fill {
          height: 100%;
          background: white;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        
        .acciones {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-unirse {
          background: rgba(255, 255, 255, 0.9);
          color: #1e293b;
          border: none;
          padding: 6px 12px;
          border-radius: 16px;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 700;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .btn-unirse:hover {
          background: white;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .btn-unirse.joined {
          background: rgba(34, 197, 94, 0.9);
          color: white;
        }
        
        .btn-unirse.joined:hover {
          background: #16a34a;
        }
        
        .estrella {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 4px;
          border-radius: 50%;
        }
        
        .estrella:hover {
          transform: scale(1.2);
          color: #fbbf24;
          background: rgba(255, 255, 255, 0.2);
        }
        
        .estrella.activa {
          color: #fbbf24;
          text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #64748b;
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          border-radius: 12px;
          border: 2px dashed #cbd5e1;
        }
        
        .empty-state h3 {
          color: #475569;
          margin-bottom: 8px;
          font-size: 1.1rem;
        }
        
        .empty-state p {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .loading-skeleton {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 12px;
          height: 140px;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .reunion-card.upcoming {
          border-left: 4px solid #22d3ee;
        }
        
        .reunion-card.live {
          border-left: 4px solid #ef4444;
          animation: pulse-live 2s infinite;
        }
        
        @keyframes pulse-live {
          0%, 100% { box-shadow: 0 4px 15px rgba(248, 140, 166, 0.3); }
          50% { box-shadow: 0 4px 25px rgba(239, 68, 68, 0.5); }
        }
        
        .live-indicator {
          background: #ef4444;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.7; }
        }
        
        /* Responsive adjustments */
        @media (max-width: 767px) {
          .reunion-card {
            min-height: 120px;
            padding: 12px;
          }
          
          .reunion-title {
            font-size: 0.9rem;
          }
          
          .reunion-description {
            -webkit-line-clamp: 1;
          }
          
          .filter-controls {
            gap: 6px;
          }
          
          .filter-btn {
            padding: 4px 8px;
            font-size: 0.7rem;
          }
        }
        
        @media (max-width: 479px) {
          .reunion-card {
            min-height: 100px;
            padding: 10px;
          }
          
          .reunion-title {
            font-size: 0.85rem;
          }
          
          .reunion-header {
            margin-bottom: 6px;
          }
        }
      </style>

      <div class="reunion-container">
        <div class="filter-controls">
          <button class="filter-btn active" data-filter="all">Todos</button>
          <button class="filter-btn" data-filter="joined">Mis eventos</button>
          <button class="filter-btn" data-filter="favorites">Favoritos</button>
          <button class="filter-btn" data-filter="today">Hoy</button>
          <button class="filter-btn" data-filter="live">En vivo</button>
        </div>
        
        <div class="reunion-list" id="reunionList">
          <!-- Las reuniones se generarán dinámicamente -->
        </div>
      </div>
    `;

    this.eventos = this.generateSampleEvents();
    this.favoritos = new Set([2, 5, 12]); // Algunos favoritos por defecto
    this.currentFilter = 'all';
    this.renderEventos();
  }

 generateSampleEvents() {
  const baseDate = new Date(2025, 6, 7); // 7 de julio de 2025
  
  const eventsData = [
    {
      id: 1,
      title: "English Conversation",
      subtitle: "Travel Stories & Adventures",
      language: "Inglés",
      difficulty: "Intermedio",
      dayOffset: 0, // 7 de julio
      time: "14:00",
      duration: "1 hora",
      description: "Comparte tus experiencias de viaje más emocionantes y practica vocabulario turístico en inglés.",
      participants: 6,
      maxParticipants: 8,
      joined: false,
      status: "upcoming",
      organizer: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Club de Lecture Française",
      subtitle: "Le Petit Prince - Chapitre 3",
      language: "Francés",
      difficulty: "Avanzado",
      dayOffset: 1, // 8 de julio
      time: "16:30",
      duration: "1.5 horas",
      description: "Análisis profundo del capítulo 3 de Le Petit Prince y práctica de pronunciación francesa avanzada.",
      participants: 4,
      maxParticipants: 6,
      joined: true,
      status: "upcoming",
      organizer: "Marie Dubois"
    },
    {
      id: 3,
      title: "Business German",
      subtitle: "Professional Networking",
      language: "Alemán",
      difficulty: "Avanzado",
      dayOffset: 2, // 9 de julio
      time: "19:00",
      duration: "45 min",
      description: "Simulación de situaciones empresariales reales en alemán para profesionales.",
      participants: 8,
      maxParticipants: 10,
      joined: false,
      status: "live",
      organizer: "Klaus Weber"
    },
    {
      id: 4,
      title: "Cucina e Cultura Italiana",
      subtitle: "Ricette della Nonna",
      language: "Italiano",
      difficulty: "Básico",
      dayOffset: 3, // 10 de julio
      time: "18:00",
      duration: "2 horas",
      description: "Aprende italiano explorando recetas tradicionales y la rica cultura gastronómica italiana.",
      participants: 12,
      maxParticipants: 15,
      joined: false,
      status: "upcoming",
      organizer: "Giuseppe Romano"
    },
    {
      id: 5,
      title: "Advanced English Debate",
      subtitle: "Current Global Issues",
      language: "Inglés",
      difficulty: "Avanzado",
      dayOffset: 4, // 11 de julio
      time: "20:00",
      duration: "1 hora",
      description: "Debates estructurados sobre temas de actualidad mundial para nivel C1-C2.",
      participants: 5,
      maxParticipants: 8,
      joined: true,
      status: "upcoming",
      organizer: "Michael Thompson"
    },
    {
      id: 6,
      title: "Français pour Débutants",
      subtitle: "Premiers Pas en Français",
      language: "Francés",
      difficulty: "Básico",
      dayOffset: 5, // 12 de julio
      time: "15:00",
      duration: "1 hora",
      description: "Introducción completa al francés para principiantes absolutos con ejercicios prácticos.",
      participants: 15,
      maxParticipants: 20,
      joined: false,
      status: "upcoming",
      organizer: "Camille Laurent"
    },
    {
      id: 7,
      title: "Português Brasileiro",
      subtitle: "Cultura e Tradições",
      language: "Portugués",
      difficulty: "Intermedio",
      dayOffset: 6, // 13 de julio
      time: "17:00",
      duration: "1.5 horas",
      description: "Explora la diversa cultura brasileña mientras perfeccionas tu portugués.",
      participants: 7,
      maxParticipants: 12,
      joined: false,
      status: "upcoming",
      organizer: "Ana Silva"
    },
    {
      id: 8,
      title: "日本語 Anime Club",
      subtitle: "One Piece ワンピース",
      language: "Japonés",
      difficulty: "Intermedio",
      dayOffset: 7, // 14 de julio
      time: "19:30",
      duration: "1 hora",
      description: "Aprende japonés través del análisis de episodios de One Piece y cultura otaku.",
      participants: 10,
      maxParticipants: 12,
      joined: false,
      status: "upcoming",
      organizer: "Takeshi Yamamoto"
    }
  ];

  // Convertir dayOffset a fechas reales
  return eventsData.map(eventData => {
    const eventDate = new Date(baseDate);
    eventDate.setDate(baseDate.getDate() + eventData.dayOffset);
    
    return {
      ...eventData,
      date: eventDate.toISOString().split('T')[0] // formato YYYY-MM-DD
    };
  });
}

  renderEventos() {
    const container = this.shadowRoot.getElementById('reunionList');
    const filteredEvents = this.getFilteredEvents();
    
    if (filteredEvents.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>🔍 No hay eventos disponibles</h3>
          <p>Prueba cambiar los filtros o vuelve más tarde para nuevos eventos.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredEvents.map(evento => `
      <div class="reunion-card ${evento.joined ? 'joined' : ''} ${this.favoritos.has(evento.id) ? 'favorited' : ''} ${evento.status}" 
           data-evento-id="${evento.id}">
        <div class="reunion-header">
          <div class="reunion-title-section">
            <h3 class="reunion-title">${evento.title}</h3>
            <div class="reunion-subtitle">${evento.subtitle}</div>
          </div>
          <div class="reunion-badges">
            ${evento.status === 'live' ? '<div class="live-indicator">En vivo</div>' : ''}
            <div class="reunion-language">${evento.language}</div>
            <div class="difficulty-badge">${evento.difficulty}</div>
          </div>
        </div>
        
        <div class="reunion-meta">
          <div class="reunion-time">
            <span>📅</span>
            <span>${this.formatDate(evento.date)}</span>
            <span>•</span>
            <span>🕐</span>
            <span>${evento.time}</span>
            <span>•</span>
            <span>⏱️</span>
            <span>${evento.duration}</span>
          </div>
        </div>
        
        <div class="reunion-description">
          ${evento.description}
        </div>
        
        <div class="reunion-footer">
          <div class="participants-info">
            <div class="participants-count">
              <span>👥</span>
              <span>${evento.participants}/${evento.maxParticipants}</span>
            </div>
            <div class="participants-bar">
              <div class="participants-fill" style="width: ${(evento.participants / evento.maxParticipants) * 100}%"></div>
            </div>
          </div>
          <div class="acciones">
            <button class="btn-unirse ${evento.joined ? 'joined' : ''}" 
                    data-evento-id="${evento.id}">
              ${evento.joined ? '✓ Inscrito' : evento.status === 'live' ? '🎥 Unirse' : 'Unirse'}
            </button>
            <span class="estrella ${this.favoritos.has(evento.id) ? 'activa' : ''}" 
                  data-evento-id="${evento.id}">
              ${this.favoritos.has(evento.id) ? '★' : '☆'}
            </span>
          </div>
        </div>
      </div>
    `).join('');

    this.setupEventListeners();
  }

  getFilteredEvents() {
    let filtered = [...this.eventos];
    const today = new Date().toISOString().split('T')[0];
    
    switch (this.currentFilter) {
      case 'joined':
        filtered = filtered.filter(e => e.joined);
        break;
      case 'favorites':
        filtered = filtered.filter(e => this.favoritos.has(e.id));
        break;
      case 'today':
        filtered = filtered.filter(e => e.date === today);
        break;
      case 'live':
        filtered = filtered.filter(e => e.status === 'live');
        break;
      default:
        // 'all' - no filter
        break;
    }
    
    // Ordenar por estado (live primero) y luego por fecha
    return filtered.sort((a, b) => {
      if (a.status === 'live' && b.status !== 'live') return -1;
      if (b.status === 'live' && a.status !== 'live') return 1;
      return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
    });
  }

  setupEventListeners() {
    // Filtros
    this.shadowRoot.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remover active de todos
        this.shadowRoot.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Activar el clickeado
        btn.classList.add('active');
        
        this.currentFilter = btn.dataset.filter;
        this.renderEventos();
      });
    });

    // Botones de unirse
    this.shadowRoot.querySelectorAll('.btn-unirse').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const eventoId = parseInt(button.dataset.eventoId);
        this.toggleJoinEvent(eventoId);
      });
    });

    // Estrellas de favoritos
    this.shadowRoot.querySelectorAll('.estrella').forEach(estrella => {
      estrella.addEventListener('click', (e) => {
        e.stopPropagation();
        const eventoId = parseInt(estrella.dataset.eventoId);
        this.toggleFavorito(eventoId);
      });
    });

    // Cards clickeables
    this.shadowRoot.querySelectorAll('.reunion-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const eventoId = parseInt(card.dataset.eventoId);
        this.showEventDetails(eventoId);
      });
    });
  }

  toggleJoinEvent(eventoId) {
    const evento = this.eventos.find(e => e.id === eventoId);
    if (evento) {
      evento.joined = !evento.joined;
      
      if (evento.joined && evento.participants < evento.maxParticipants) {
        evento.participants++;
      } else if (!evento.joined && evento.participants > 0) {
        evento.participants--;
      }
      
      this.renderEventos();
      
      this.dispatchEvent(new CustomEvent('eventJoinToggle', {
        detail: { eventoId, joined: evento.joined },
        bubbles: true
      }));
    }
  }

  toggleFavorito(eventoId) {
    if (this.favoritos.has(eventoId)) {
      this.favoritos.delete(eventoId);
    } else {
      this.favoritos.add(eventoId);
    }
    
    this.renderEventos();
    
    this.dispatchEvent(new CustomEvent('favoriteToggle', {
      detail: { eventoId, isFavorite: this.favoritos.has(eventoId) },
      bubbles: true
    }));
  }

  showEventDetails(eventoId) {
    const evento = this.eventos.find(e => e.id === eventoId);
    if (evento) {
      this.dispatchEvent(new CustomEvent('eventSelected', {
        detail: { evento },
        bubbles: true
      }));
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    }
  }
}

customElements.define("reunion-list", ReunionList);