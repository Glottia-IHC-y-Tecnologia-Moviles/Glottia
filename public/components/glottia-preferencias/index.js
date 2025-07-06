class GlottiaPreferencias extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.setupComponent();
  }

  setupComponent() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          font-family: "Segoe UI", sans-serif;
          background-color: #fdfdfd;
          display: block;
          min-height: calc(100vh - 180px);
          padding: 2rem 0;
        }
        
        .preferencias-container {
          max-width: 600px;
          background-color: #fff;
          padding: 2rem;
          margin: 0 auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          text-align: center;
        }
        
        .preferencias-container h2 {
          margin-bottom: 0.5rem;
          color: #333;
          font-family: "Raleway", sans-serif;
          font-size: 2rem;
          font-weight: bold;
        }
        
        .descripcion {
          font-size: 0.95rem;
          margin-bottom: 2rem;
          color: #666;
          font-family: "Raleway", sans-serif;
        }
        
        .progress-indicator {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          gap: 0.5rem;
        }
        
        .progress-step {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #e2e8f0;
          position: relative;
        }
        
        .progress-step.completed {
          background-color: #379683;
        }
        
        .progress-step.active {
          background-color: #667eea;
        }
        
        .progress-step::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 100%;
          width: 20px;
          height: 2px;
          background-color: #e2e8f0;
          transform: translateY(-50%);
        }
        
        .progress-step:last-child::after {
          display: none;
        }
        
        .progress-step.completed::after {
          background-color: #379683;
        }
        
        .preferencias-form {
          text-align: left;
        }
        
        .seccion {
          margin-bottom: 2rem;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background-color: #f8fafc;
        }
        
        .seccion h3 {
          margin: 0 0 1rem 0;
          color: #2d3748;
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .idiomas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .idioma-card {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .idioma-card:hover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .idioma-card.selected {
          border-color: #379683;
          background-color: #e6fffa;
        }
        
        .idioma-flag {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          display: block;
        }
        
        .idioma-name {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.25rem;
        }
        
        .idioma-level {
          font-size: 0.85rem;
          color: #718096;
        }
        
        .niveles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.5rem;
          margin-top: 1rem;
        }
        
        .nivel-btn {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          font-weight: 500;
        }
        
        .nivel-btn:hover {
          border-color: #667eea;
        }
        
        .nivel-btn.selected {
          border-color: #379683;
          background-color: #379683;
          color: white;
        }
        
        .intereses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.75rem;
          margin-top: 1rem;
        }
        
        .interes-tag {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          font-size: 0.9rem;
        }
        
        .interes-tag:hover {
          border-color: #667eea;
        }
        
        .interes-tag.selected {
          border-color: #667eea;
          background-color: #667eea;
          color: white;
        }
        
        .botones {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .btn-volver {
          flex: 1;
          padding: 0.9rem;
          background-color: #FFD3B6;
          color: #333;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          text-align: center;
          font-family: "Raleway", sans-serif;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        
        .btn-volver:hover {
          background-color: #FF8B94;
          color: white;
        }
        
        .btn-continuar {
          flex: 1;
          padding: 0.9rem;
          background-color: #379683;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          text-align: center;
          font-family: "Raleway", sans-serif;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        
        .btn-continuar:hover {
          background-color: #2a6b5c;
        }
        
        .btn-continuar:disabled {
          background-color: #cbd5e1;
          cursor: not-allowed;
        }
        
        .mensaje {
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: 6px;
          font-weight: 500;
          font-family: "Raleway", sans-serif;
          animation: slideIn 0.5s ease-out;
        }
        
        .mensaje.success {
          background-color: #e6ffee;
          color: #137c4c;
        }
        
        .mensaje.error {
          background-color: #fee;
          color: #c53030;
        }
        
        .oculto {
          display: none;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .preferencias-container {
            margin: 0 1rem;
            padding: 1.5rem;
          }
          
          .idiomas-grid {
            grid-template-columns: 1fr;
          }
          
          .botones {
            flex-direction: column;
          }
        }
      </style>

      <main class="preferencias-container">
        <div class="progress-indicator">
          <div class="progress-step completed"></div>
          <div class="progress-step active"></div>
          <div class="progress-step"></div>
        </div>
        
        <h2>Preferencias de Idiomas</h2>
        <p class="descripcion">Paso 2 de 3: Cuéntanos qué idiomas te interesan y tu nivel actual.</p>
        
        <form class="preferencias-form" id="preferenciasForm">
          <div class="seccion">
            <h3>🎯 ¿Qué idiomas quieres practicar?</h3>
            <div class="idiomas-grid" id="idiomasGrid">
              <!-- Se generará dinámicamente -->
            </div>
          </div>
          
          <div class="seccion">
            <h3>📊 ¿Cuál es tu nivel actual?</h3>
            <div class="niveles-grid" id="nivelesGrid">
              <!-- Se generará dinámicamente -->
            </div>
          </div>
          
          <div class="seccion">
            <h3>❤️ ¿Qué temas te interesan?</h3>
            <div class="intereses-grid" id="interesesGrid">
              <!-- Se generará dinámicamente -->
            </div>
          </div>

          <div class="botones">
            <button type="button" class="btn-volver" id="btnVolver">Volver</button>
            <button type="submit" class="btn-continuar" id="btnContinuar">Continuar</button>
          </div>
        </form>
        
        <div id="mensaje" class="mensaje oculto"></div>
      </main>
    `;

    this.setupData();
    this.setupEventListeners();
  }

  setupData() {
    this.idiomas = [
      { id: 'en', name: 'Inglés', flag: '🇺🇸' },
      { id: 'fr', name: 'Francés', flag: '🇫🇷' },
      { id: 'de', name: 'Alemán', flag: '🇩🇪' },
      { id: 'it', name: 'Italiano', flag: '🇮🇹' },
      { id: 'pt', name: 'Portugués', flag: '🇧🇷' },
      { id: 'ja', name: 'Japonés', flag: '🇯🇵' },
      { id: 'ko', name: 'Coreano', flag: '🇰🇷' },
      { id: 'zh', name: 'Chino', flag: '🇨🇳' },
      { id: 'ru', name: 'Ruso', flag: '🇷🇺' },
      { id: 'ar', name: 'Árabe', flag: '🇸🇦' }
    ];

    this.niveles = [
      { id: 'principiante', name: 'Principiante', desc: 'A1-A2' },
      { id: 'intermedio', name: 'Intermedio', desc: 'B1-B2' },
      { id: 'avanzado', name: 'Avanzado', desc: 'C1-C2' },
      { id: 'nativo', name: 'Nativo', desc: 'Fluido' }
    ];

    this.intereses = [
      'Viajes', 'Cultura', 'Negocios', 'Tecnología', 'Arte', 'Música',
      'Deportes', 'Cocina', 'Literatura', 'Cine', 'Historia', 'Ciencia'
    ];

    this.selectedIdiomas = new Set();
    this.selectedNivel = null;
    this.selectedIntereses = new Set();

    this.renderIdiomas();
    this.renderNiveles();
    this.renderIntereses();
  }

  renderIdiomas() {
    const container = this.shadowRoot.getElementById('idiomasGrid');
    container.innerHTML = this.idiomas.map(idioma => `
      <div class="idioma-card" data-idioma="${idioma.id}">
        <span class="idioma-flag">${idioma.flag}</span>
        <div class="idioma-name">${idioma.name}</div>
      </div>
    `).join('');
  }

  renderNiveles() {
    const container = this.shadowRoot.getElementById('nivelesGrid');
    container.innerHTML = this.niveles.map(nivel => `
      <div class="nivel-btn" data-nivel="${nivel.id}">
        <div>${nivel.name}</div>
        <div class="idioma-level">${nivel.desc}</div>
      </div>
    `).join('');
  }

  renderIntereses() {
    const container = this.shadowRoot.getElementById('interesesGrid');
    container.innerHTML = this.intereses.map(interes => `
      <div class="interes-tag" data-interes="${interes}">
        ${interes}
      </div>
    `).join('');
  }

  setupEventListeners() {
    // Selección de idiomas
    this.shadowRoot.querySelectorAll('.idioma-card').forEach(card => {
      card.addEventListener('click', () => {
        const idiomaId = card.dataset.idioma;
        
        if (this.selectedIdiomas.has(idiomaId)) {
          this.selectedIdiomas.delete(idiomaId);
          card.classList.remove('selected');
        } else {
          this.selectedIdiomas.add(idiomaId);
          card.classList.add('selected');
        }
        
        this.updateContinueButton();
      });
    });

    // Selección de nivel
    this.shadowRoot.querySelectorAll('.nivel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Remover selección previa
        this.shadowRoot.querySelectorAll('.nivel-btn').forEach(b => b.classList.remove('selected'));
        
        // Seleccionar nuevo
        btn.classList.add('selected');
        this.selectedNivel = btn.dataset.nivel;
        
        this.updateContinueButton();
      });
    });

    // Selección de intereses
    this.shadowRoot.querySelectorAll('.interes-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const interes = tag.dataset.interes;
        
        if (this.selectedIntereses.has(interes)) {
          this.selectedIntereses.delete(interes);
          tag.classList.remove('selected');
        } else {
          this.selectedIntereses.add(interes);
          tag.classList.add('selected');
        }
        
        this.updateContinueButton();
      });
    });

    // Botón volver
    this.shadowRoot.getElementById('btnVolver').addEventListener('click', () => {
      window.location.href = 'register.html';
    });

    // Formulario
    this.shadowRoot.getElementById('preferenciasForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.processPreferencias();
    });
  }

  updateContinueButton() {
    const btnContinuar = this.shadowRoot.getElementById('btnContinuar');
    const isValid = this.selectedIdiomas.size > 0 && 
                   this.selectedNivel && 
                   this.selectedIntereses.size > 0;
    
    btnContinuar.disabled = !isValid;
  }

  async processPreferencias() {
    const btnContinuar = this.shadowRoot.getElementById('btnContinuar');
    const mensaje = this.shadowRoot.getElementById('mensaje');
    
    try {
      btnContinuar.disabled = true;
      btnContinuar.textContent = 'Procesando...';
      
      // Obtener datos del primer paso
      const userData = JSON.parse(localStorage.getItem('glottia_temp_registration') || '{}');
      
      // Agregar preferencias
      userData.preferencias = {
        idiomas: Array.from(this.selectedIdiomas),
        nivel: this.selectedNivel,
        intereses: Array.from(this.selectedIntereses)
      };
      
      // Guardar datos actualizados
      localStorage.setItem('glottia_temp_registration', JSON.stringify(userData));
      
      // Mostrar mensaje de éxito
      mensaje.textContent = '✅ ¡Preferencias guardadas! Continuando al último paso...';
      mensaje.className = 'mensaje success';
      mensaje.classList.remove('oculto');
      
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1500);
      
    } catch (error) {
      mensaje.textContent = 'Error al guardar preferencias. Inténtalo de nuevo.';
      mensaje.className = 'mensaje error';
      mensaje.classList.remove('oculto');
      
      btnContinuar.disabled = false;
      btnContinuar.textContent = 'Continuar';
    }
  }
}

customElements.define("glottia-preferencias", GlottiaPreferencias);