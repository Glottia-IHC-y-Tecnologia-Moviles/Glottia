const template = document.createElement('template');
template.innerHTML = /*html*/`
  <style>
    :host {
      display: block;
      width: 100%;
    }
    
    .groups-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      width: 100%;
    }
    
    .group-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      padding: 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .group-card:hover {
      border-color: #667eea;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    }
    
    .group-card.favorito::before {
      content: "⭐";
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 16px;
    }
    
    .group-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin: 0 auto 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
      font-weight: bold;
    }
    
    .group-name {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.25rem;
      font-size: 14px;
      line-height: 1.3;
    }
    
    .group-language {
      font-size: 12px;
      color: #667eea;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .group-level {
      display: inline-block;
      background-color: #f1f5f9;
      color: #475569;
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      font-size: 11px;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .group-level.principiante {
      background-color: #dcfce7;
      color: #166534;
    }
    
    .group-level.intermedio {
      background-color: #fef3c7;
      color: #92400e;
    }
    
    .group-level.avanzado {
      background-color: #fee2e2;
      color: #991b1b;
    }
    
    .group-members {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
    }
    
    .group-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      font-size: 10px;
      font-weight: 500;
    }
    
    .status-badge.activo {
      background-color: #dcfce7;
      color: #166534;
    }
    
    .status-badge.inactivo {
      background-color: #f1f5f9;
      color: #64748b;
    }
    
    .group-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.75rem;
      justify-content: center;
    }
    
    .action-btn {
      padding: 0.375rem 0.75rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      flex: 1;
    }
    
    .action-btn.primary {
      background-color: #667eea;
      color: white;
    }
    
    .action-btn.primary:hover {
      background-color: #5a67d8;
    }
    
    .action-btn.secondary {
      background-color: #f1f5f9;
      color: #475569;
      border: 1px solid #e2e8f0;
    }
    
    .action-btn.secondary:hover {
      background-color: #e2e8f0;
    }
    
    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #64748b;
      grid-column: 1 / -1;
    }
    
    .empty-state i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
    
    /* Modal styles */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: none;
      z-index: 1000;
      justify-content: center;
      align-items: center;
    }
    
    .modal.show {
      display: flex;
    }
    
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      max-width: 500px;
      width: 90%;
      position: relative;
      max-height: 80vh;
      overflow-y: auto;
    }
    
    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #64748b;
      padding: 0.25rem;
    }
    
    .modal-header h3 {
      margin: 0 0 1rem 0;
      color: #1e293b;
    }
    
    .group-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .info-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: #f8fafc;
      border-radius: 0.5rem;
    }
    
    .info-label {
      font-weight: 600;
      color: #475569;
      min-width: 100px;
    }
    
    .info-value {
      color: #1e293b;
    }
    
    /* Responsive */
    @media (max-width: 767px) {
      .groups-container {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 0.75rem;
      }
      
      .group-card {
        padding: 0.75rem;
      }
      
      .group-icon {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }
      
      .group-name {
        font-size: 13px;
      }
      
      .group-language {
        font-size: 11px;
      }
      
      .group-level {
        font-size: 10px;
      }
      
      .group-members {
        font-size: 11px;
      }
      
      .action-btn {
        font-size: 10px;
        padding: 0.25rem 0.5rem;
      }
    }
    
    @media (max-width: 479px) {
      .groups-container {
        grid-template-columns: 1fr;
      }
      
      .group-card {
        padding: 1rem;
        display: flex;
        align-items: center;
        text-align: left;
        gap: 1rem;
      }
      
      .group-icon {
        margin: 0;
        flex-shrink: 0;
      }
      
      .group-content {
        flex: 1;
      }
      
      .group-actions {
        flex-direction: column;
        margin-top: 0.5rem;
      }
    }
  </style>
  
  <div class="groups-container" id="groupsContainer">
    <!-- Los grupos se cargarán aquí dinámicamente -->
  </div>
  
  <!-- Modal para detalles del grupo -->
  <div class="modal" id="groupModal">
    <div class="modal-content">
      <button class="modal-close" id="closeModal">&times;</button>
      <div class="modal-header">
        <h3 id="modalTitle">Detalles del Grupo</h3>
      </div>
      <div class="group-info" id="groupInfo">
        <!-- Información del grupo se carga dinámicamente -->
      </div>
    </div>
  </div>
`;

class GruposWidget extends HTMLElement {
  constructor() {
    super();
    this.grupos = [
      {
        id: 1,
        nombre: "Conversación Inglés B2",
        idioma: "Inglés",
        nivel: "intermedio",
        miembros: 12,
        color: "#3b82f6",
        icono: "EN",
        descripcion: "Grupo para practicar conversación en inglés nivel intermedio-alto",
        activo: true,
        favorito: true,
        proximaReunion: "15 Jun 2025",
        administrador: "Carlos Ruiz",
        categoria: "Conversación"
      },
      {
        id: 2,
        nombre: "Club Lectura Francés",
        idioma: "Français",
        nivel: "avanzado",
        miembros: 8,
        color: "#ec4899",
        icono: "FR",
        descripcion: "Lectura y discusión de literatura francesa contemporánea",
        activo: true,
        favorito: false,
        proximaReunion: "18 Jun 2025",
        administrador: "Marie Dubois",
        categoria: "Literatura"
      },
      {
        id: 3,
        nombre: "Alemán para Viajeros",
        idioma: "Deutsch",
        nivel: "principiante",
        miembros: 15,
        color: "#f59e0b",
        icono: "DE",
        descripcion: "Alemán básico enfocado en situaciones de viaje",
        activo: true,
        favorito: true,
        proximaReunion: "20 Jun 2025",
        administrador: "Hans Mueller",
        categoria: "Viajes"
      },
      {
        id: 4,
        nombre: "Italiano Gastronómico",
        idioma: "Italiano",
        nivel: "intermedio",
        miembros: 10,
        color: "#10b981",
        icono: "IT",
        descripcion: "Aprende italiano mientras descubres la cocina italiana",
        activo: false,
        favorito: false,
        proximaReunion: "25 Jun 2025",
        administrador: "Giuseppe Romano",
        categoria: "Gastronomía"
      }/*,
      {
        id: 5,
        nombre: "Japonés Cultural",
        idioma: "日本語",
        nivel: "principiante",
        miembros: 6,
        color: "#8b5cf6",
        icono: "JP",
        descripcion: "Introducción al japonés y cultura japonesa",
        activo: true,
        favorito: false,
        proximaReunion: "22 Jun 2025",
        administrador: "Yuki Tanaka",
        categoria: "Cultura"
      },
      {
        id: 6,
        nombre: "Portugués Brasil",
        idioma: "Português",
        nivel: "intermedio",
        miembros: 9,
        color: "#06b6d4",
        icono: "BR",
        descripcion: "Portugués brasileño con enfoque en música y cultura",
        activo: true,
        favorito: false,
        proximaReunion: "24 Jun 2025",
        administrador: "Ana Silva",
        categoria: "Música"
      }*/
    ];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
      this.render();
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    const container = this.shadowRoot.querySelector('#groupsContainer');
    const modal = this.shadowRoot.querySelector('#groupModal');
    const closeModal = this.shadowRoot.querySelector('#closeModal');

    // Event delegation para los botones de las cards
    container.addEventListener('click', (e) => {
      const card = e.target.closest('.group-card');
      if (!card) return;

      const groupId = parseInt(card.dataset.groupId);
      const grupo = this.grupos.find(g => g.id === groupId);

      if (e.target.classList.contains('action-btn')) {
        e.stopPropagation();
        if (e.target.textContent.includes('Ver')) {
          this.showGroupDetails(grupo);
        } else if (e.target.textContent.includes('Salir')) {
          this.leaveGroup(groupId);
        }
      } else {
        // Click en la card completa
        this.showGroupDetails(grupo);
      }
    });

    // Cerrar modal
    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  }

  render() {
    const container = this.shadowRoot.querySelector('#groupsContainer');
    
    if (this.grupos.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-users"></i>
          <h3>No tienes grupos aún</h3>
          <p>Únete a un grupo para empezar a practicar idiomas</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.grupos.map(grupo => `
      <div class="group-card ${grupo.favorito ? 'favorito' : ''}" data-group-id="${grupo.id}">
        <div class="group-content">
          <div class="group-icon" style="background-color: ${grupo.color}">
            ${grupo.icono}
          </div>
          <div class="group-name">${grupo.nombre}</div>
          <div class="group-language">${grupo.idioma}</div>
          <div class="group-level ${grupo.nivel}">${grupo.nivel}</div>
          <div class="group-members">
            <i class="fas fa-users"></i>
            <span>${grupo.miembros} miembros</span>
          </div>
          <div class="group-status">
            <span class="status-badge ${grupo.activo ? 'activo' : 'inactivo'}">
              ${grupo.activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>
          <div class="group-actions">
            <button class="action-btn primary">Ver</button>
            <button class="action-btn secondary">Salir</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  showGroupDetails(grupo) {
    const modal = this.shadowRoot.querySelector('#groupModal');
    const title = this.shadowRoot.querySelector('#modalTitle');
    const info = this.shadowRoot.querySelector('#groupInfo');

    title.textContent = grupo.nombre;
    
    info.innerHTML = `
      <div class="info-row">
        <span class="info-label">Idioma:</span>
        <span class="info-value">${grupo.idioma}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Nivel:</span>
        <span class="info-value">${grupo.nivel}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Miembros:</span>
        <span class="info-value">${grupo.miembros} personas</span>
      </div>
      <div class="info-row">
        <span class="info-label">Categoría:</span>
        <span class="info-value">${grupo.categoria}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Administrador:</span>
        <span class="info-value">${grupo.administrador}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Próxima reunión:</span>
        <span class="info-value">${grupo.proximaReunion}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Estado:</span>
        <span class="info-value">${grupo.activo ? 'Activo' : 'Inactivo'}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Descripción:</span>
        <span class="info-value">${grupo.descripcion}</span>
      </div>
    `;

    modal.classList.add('show');
  }

  leaveGroup(groupId) {
    const confirmLeave = confirm('¿Estás seguro de que quieres salir de este grupo?');
    if (confirmLeave) {
      this.grupos = this.grupos.filter(g => g.id !== groupId);
      this.render();
      
      // Mostrar notificación de éxito (opcional)
      console.log('Has salido del grupo exitosamente');
    }
  }

  // Método público para agregar un nuevo grupo
  addGroup(newGroup) {
    this.grupos.push({
      id: Date.now(),
      ...newGroup
    });
    this.render();
  }

  // Método público para obtener grupos
  getGroups() {
    return this.grupos;
  }
}

customElements.define('grupos-widget', GruposWidget);
