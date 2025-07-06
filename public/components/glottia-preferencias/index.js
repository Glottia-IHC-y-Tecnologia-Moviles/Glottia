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
          max-width: 700px;
          background-color: #fff;
          padding: 2rem;
          margin: 0 auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          text-align: center;
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
        
        h2 {
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
        
        .form-section {
          text-align: left;
          margin-bottom: 2rem;
        }
        
        .form-section h3 {
          color: #379683;
          font-family: "Raleway", sans-serif;
          font-size: 1.25rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .language-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .language-card {
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .language-card:hover {
          border-color: #667eea;
          background-color: #f8fafc;
        }
        
        .language-card.selected {
          border-color: #379683;
          background-color: #f0fdfa;
        }
        
        .language-flag {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .language-name {
          font-weight: 600;
          color: #333;
          margin-bottom: 0.25rem;
        }
        
        .language-level {
          font-size: 0.875rem;
          color: #666;
        }
        
        .level-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .level-option {
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .level-option:hover {
          border-color: #667eea;
          background-color: #f8fafc;
        }
        
        .level-option.selected {
          border-color: #379683;
          background-color: #f0fdfa;
        }
        
        .level-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 0.25rem;
        }
        
        .level-desc {
          font-size: 0.75rem;
          color: #666;
        }
        
        .interest-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .interest-tag {
          border: 2px solid #e2e8f0;
          border-radius: 20px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          font-size: 0.875rem;
        }
        
        .interest-tag:hover {
          border-color: #667eea;
          background-color: #f8fafc;
        }
        
        .interest-tag.selected {
          border-color: #379683;
          background-color: #f0fdfa;
          color: #379683;
          font-weight: 600;
        }
        
        .time-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .time-option {
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 0.75rem 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        
        .time-option:hover {
          border-color: #667eea;
          background-color: #f8fafc;
        }
        
        .time-option.selected {
          border-color: #379683;
          background-color: #f0fdfa;
        }
        
        .time-number {
          font-weight: bold;
          color: #333;
          font-size: 1.1rem;
        }
        
        .time-label {
          font-size: 0.75rem;
          color: #666;
        }
        
        .checkbox-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .checkbox-option:hover {
          background-color: #f8fafc;
          border-color: #667eea;
        }
        
        .checkbox-option input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #379683;
        }
        
        .checkbox-label {
          flex: 1;
          color: #333;
          font-weight: 500;
        }
        
        .checkbox-desc {
          font-size: 0.875rem;
          color: #666;
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
        
        /* Responsive */
        @media (max-width: 768px) {
          .language-grid,
          .level-grid,
          .interest-grid,
          .time-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          :host {
            padding: 1rem 0;
          }
          
          .preferencias-container {
            margin: 0 1rem;
            padding: 1.5rem;
          }
          
          .botones {
            flex-direction: column;
            gap: 0.8rem;
          }
          
          h2 {
            font-size: 1.5rem;
          }
        }
      </style>

      <main class="preferencias-container">
        <!-- Indicador de progreso -->
        <div class="progress-indicator">
          <div class="progress-step completed"></div>
          <div class="progress-step active"></div>
          <div class="progress-step"></div>
        </div>
        
        <h2>Configurar Preferencias</h2>
        <p class="descripcion">Paso 2 de 3: Personaliza tu experiencia de aprendizaje en Glottia.</p>
        
        <!-- Idioma nativo -->
        <div class="form-section">
          <h3>🌍 ¿Cuál es tu idioma nativo?</h3>
          <div class="language-grid" id="nativeLanguages">
            <div class="language-card" data-lang="es">
              <div class="language-flag">🇪🇸</div>
              <div class="language-name">Español</div>
              <div class="language-level">Nativo</div>
            </div>
            <div class="language-card" data-lang="en">
              <div class="language-flag">🇺🇸</div>
              <div class="language-name">Inglés</div>
              <div class="language-level">Nativo</div>
            </div>
            <div class="language-card" data-lang="fr">
              <div class="language-flag">🇫🇷</div>
              <div class="language-name">Francés</div>
              <div class="language-level">Nativo</div>
            </div>
            <div class="language-card" data-lang="de">
              <div class="language-flag">🇩🇪</div>
              <div class="language-name">Alemán</div>
              <div class="language-level">Nativo</div>
            </div>
            <div class="language-card" data-lang="it">
              <div class="language-flag">🇮🇹</div>
              <div class="language-name">Italiano</div>
              <div class="language-level">Nativo</div>
            </div>
            <div class="language-card" data-lang="pt">
              <div class="language-flag">🇧🇷</div>
              <div class="language-name">Portugués</div>
              <div class="language-level">Nativo</div>
            </div>
          </div>
        </div>

        <!-- Idiomas a aprender -->
        <div class="form-section">
          <h3>📚 ¿Qué idiomas te gustaría practicar?</h3>
          <div class="language-grid" id="learningLanguages">
            <div class="language-card" data-lang="en">
              <div class="language-flag">🇺🇸</div>
              <div class="language-name">Inglés</div>
              <div class="language-level">Practicar</div>
            </div>
            <div class="language-card" data-lang="fr">
              <div class="language-flag">🇫🇷</div>
              <div class="language-name">Francés</div>
              <div class="language-level">Practicar</div>
            </div>
            <div class="language-card" data-lang="de">
              <div class="language-flag">🇩🇪</div>
              <div class="language-name">Alemán</div>
              <div class="language-level">Practicar</div>
            </div>
            <div class="language-card" data-lang="it">
              <div class="language-flag">🇮🇹</div>
              <div class="language-name">Italiano</div>
              <div class="language-level">Practicar</div>
            </div>
            <div class="language-card" data-lang="pt">
              <div class="language-flag">🇧🇷</div>
              <div class="language-name">Portugués</div>
              <div class="language-level">Practicar</div>
            </div>
            <div class="language-card" data-lang="ja">
              <div class="language-flag">🇯🇵</div>
              <div class="language-name">Japonés</div>
              <div class="language-level">Practicar</div>
            </div>
          </div>
        </div>

        <!-- Nivel de competencia -->
        <div class="form-section">
          <h3>📊 ¿Cuál es tu nivel actual?</h3>
          <div class="level-grid" id="proficiencyLevel">
            <div class="level-option" data-level="beginner">
              <div class="level-title">Principiante</div>
              <div class="level-desc">Conozco palabras básicas</div>
            </div>
            <div class="level-option" data-level="elementary">
              <div class="level-title">Elemental</div>
              <div class="level-desc">Puedo formar frases simples</div>
            </div>
            <div class="level-option" data-level="intermediate">
              <div class="level-title">Intermedio</div>
              <div class="level-desc">Converso con dificultades</div>
            </div>
            <div class="level-option" data-level="advanced">
              <div class="level-title">Avanzado</div>
              <div class="level-desc">Converso con fluidez</div>
            </div>
          </div>
        </div>

        <!-- Intereses -->
        <div class="form-section">
          <h3>🎯 ¿Qué temas te interesan?</h3>
          <div class="interest-grid" id="interests">
            <div class="interest-tag" data-interest="travel">✈️ Viajes</div>
            <div class="interest-tag" data-interest="business">💼 Negocios</div>
            <div class="interest-tag" data-interest="culture">🎭 Cultura</div>
            <div class="interest-tag" data-interest="food">🍽️ Gastronomía</div>
            <div class="interest-tag" data-interest="sports">⚽ Deportes</div>
            <div class="interest-tag" data-interest="technology">💻 Tecnología</div>
            <div class="interest-tag" data-interest="music">🎵 Música</div>
            <div class="interest-tag" data-interest="movies">🎬 Películas</div>
            <div class="interest-tag" data-interest="books">📚 Libros</div>
            <div class="interest-tag" data-interest="science">🔬 Ciencia</div>
          </div>
        </div>

        <!-- Tiempo disponible -->
        <div class="form-section">
          <h3>⏰ ¿Cuánto tiempo puedes dedicar por semana?</h3>
          <div class="time-grid" id="timeCommitment">
            <div class="time-option" data-time="1-2">
              <div class="time-number">1-2</div>
              <div class="time-label">horas</div>
            </div>
            <div class="time-option" data-time="3-5">
              <div class="time-number">3-5</div>
              <div class="time-label">horas</div>
            </div>
            <div class="time-option" data-time="6-10">
              <div class="time-number">6-10</div>
              <div class="time-label">horas</div>
            </div>
            <div class="time-option" data-time="10+">
              <div class="time-number">10+</div>
              <div class="time-label">horas</div>
            </div>
          </div>
        </div>

        <!-- Preferencias de notificación -->
        <div class="form-section">
          <h3>🔔 Preferencias de notificación</h3>
          <div class="checkbox-option">
            <input type="checkbox" id="emailNotif" checked>
            <div>
              <div class="checkbox-label">Notificaciones por email</div>
              <div class="checkbox-desc">Recibe recordatorios de eventos y nuevos grupos</div>
            </div>
          </div>
          <div class="checkbox-option">
            <input type="checkbox" id="weeklyDigest" checked>
            <div>
              <div class="checkbox-label">Resumen semanal</div>
              <div class="checkbox-desc">Un email con tu progreso y eventos recomendados</div>
            </div>
          </div>
          <div class="checkbox-option">
            <input type="checkbox" id="eventReminders">
            <div>
              <div class="checkbox-label">Recordatorios de eventos</div>
              <div class="checkbox-desc">Te avisamos 30 minutos antes de cada evento</div>
            </div>
          </div>
        </div>

        <div class="botones">
          <button type="button" class="btn-volver" id="btnVolver">Atrás</button>
          <button type="button" class="btn-continuar" id="btnContinuar" disabled>Finalizar Registro</button>
        </div>
      </main>
    `;

    this.preferences = {
      nativeLanguage: null,
      learningLanguages: [],
      proficiencyLevel: null,
      interests: [],
      timeCommitment: null,
      notifications: {
        email: true,
        weeklyDigest: true,
        eventReminders: false
      }
    };

    this.setupEventListeners();
    this.loadUserData();
  }

  setupEventListeners() {
    // Idioma nativo (solo uno)
    this.shadowRoot.getElementById("nativeLanguages").addEventListener("click", (e) => {
      const card = e.target.closest(".language-card");
      if (card) {
        // Remover selección anterior
        this.shadowRoot.querySelectorAll("#nativeLanguages .language-card").forEach(c => 
          c.classList.remove("selected"));
        // Seleccionar nueva
        card.classList.add("selected");
        this.preferences.nativeLanguage = card.dataset.lang;
        this.validateForm();
      }
    });

    // Idiomas a aprender (múltiple)
    this.shadowRoot.getElementById("learningLanguages").addEventListener("click", (e) => {
      const card = e.target.closest(".language-card");
      if (card) {
        card.classList.toggle("selected");
        const lang = card.dataset.lang;
        
        if (card.classList.contains("selected")) {
          if (!this.preferences.learningLanguages.includes(lang)) {
            this.preferences.learningLanguages.push(lang);
          }
        } else {
          this.preferences.learningLanguages = this.preferences.learningLanguages.filter(l => l !== lang);
        }
        this.validateForm();
      }
    });

    // Nivel de competencia
    this.shadowRoot.getElementById("proficiencyLevel").addEventListener("click", (e) => {
      const option = e.target.closest(".level-option");
      if (option) {
        this.shadowRoot.querySelectorAll("#proficiencyLevel .level-option").forEach(o => 
          o.classList.remove("selected"));
        option.classList.add("selected");
        this.preferences.proficiencyLevel = option.dataset.level;
        this.validateForm();
      }
    });

    // Intereses (múltiple)
    this.shadowRoot.getElementById("interests").addEventListener("click", (e) => {
      const tag = e.target.closest(".interest-tag");
      if (tag) {
        tag.classList.toggle("selected");
        const interest = tag.dataset.interest;
        
        if (tag.classList.contains("selected")) {
          if (!this.preferences.interests.includes(interest)) {
            this.preferences.interests.push(interest);
          }
        } else {
          this.preferences.interests = this.preferences.interests.filter(i => i !== interest);
        }
        this.validateForm();
      }
    });

    // Tiempo disponible
    this.shadowRoot.getElementById("timeCommitment").addEventListener("click", (e) => {
      const option = e.target.closest(".time-option");
      if (option) {
        this.shadowRoot.querySelectorAll("#timeCommitment .time-option").forEach(o => 
          o.classList.remove("selected"));
        option.classList.add("selected");
        this.preferences.timeCommitment = option.dataset.time;
        this.validateForm();
      }
    });

    // Checkboxes de notificaciones
    this.shadowRoot.getElementById("emailNotif").addEventListener("change", (e) => {
      this.preferences.notifications.email = e.target.checked;
    });

    this.shadowRoot.getElementById("weeklyDigest").addEventListener("change", (e) => {
      this.preferences.notifications.weeklyDigest = e.target.checked;
    });

    this.shadowRoot.getElementById("eventReminders").addEventListener("change", (e) => {
      this.preferences.notifications.eventReminders = e.target.checked;
    });

    // Botón volver
    this.shadowRoot.getElementById("btnVolver").addEventListener("click", () => {
      window.location.href = "register.html";
    });

    // Botón continuar
    this.shadowRoot.getElementById("btnContinuar").addEventListener("click", () => {
      this.savePreferences();
      this.completeRegistration();
    });
  }

  validateForm() {
    const isValid = 
      this.preferences.nativeLanguage && 
      this.preferences.learningLanguages.length > 0 && 
      this.preferences.proficiencyLevel && 
      this.preferences.interests.length > 0 && 
      this.preferences.timeCommitment;

    const btnContinuar = this.shadowRoot.getElementById("btnContinuar");
    btnContinuar.disabled = !isValid;
  }

  loadUserData() {
    const userData = localStorage.getItem('glottia_user_registration');
    if (userData) {
      const data = JSON.parse(userData);
      console.log('Datos del usuario:', data);
    }
  }

  savePreferences() {
    const userData = JSON.parse(localStorage.getItem('glottia_user_registration') || '{}');
    userData.preferences = this.preferences;
    localStorage.setItem('glottia_user_registration', JSON.stringify(userData));
    
    console.log('Preferencias guardadas:', this.preferences);
  }

  completeRegistration() {
    // Mostrar mensaje de éxito
    const originalContent = this.shadowRoot.querySelector('.preferencias-container').innerHTML;
    
    this.shadowRoot.querySelector('.preferencias-container').innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
        <h2 style="color: #379683; margin-bottom: 1rem;">¡Registro Completado!</h2>
        <p style="color: #666; font-size: 1.1rem; margin-bottom: 2rem;">
          Bienvenido a Glottia. Tu perfil ha sido configurado exitosamente.
        </p>
        <div style="background: #f0fdfa; padding: 1rem; border-radius: 8px; margin-bottom: 2rem;">
          <p style="color: #379683; font-weight: 600;">
            🌟 Ya puedes empezar a practicar idiomas con hablantes nativos
          </p>
        </div>
        <div style="color: #666; font-size: 0.9rem;">
          Redirigiendo al inicio de sesión en <span id="countdown">3</span> segundos...
        </div>
      </div>
    `;

    // Countdown
    let seconds = 3;
    const countdown = this.shadowRoot.getElementById('countdown');
    const interval = setInterval(() => {
      seconds--;
      countdown.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    
    // Limpiar datos del localStorage y redirigir
    setTimeout(() => {
      localStorage.removeItem('glottia_user_registration');
      window.location.href = "login.html";
    }, 3000);
  }
}

customElements.define("glottia-preferencias", GlottiaPreferencias);