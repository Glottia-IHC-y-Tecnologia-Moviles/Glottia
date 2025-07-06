class GlottiaRegister extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          font-family: "Segoe UI", sans-serif;
          background-color: #fdfdfd;
          display: block;
          min-height: calc(100vh - 180px); /* Ajustar para header y footer */
          padding: 2rem 0;
        }
        
        .registro-container {
          max-width: 450px;
          background-color: #fff;
          padding: 2rem;
          margin: 0 auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          text-align: center;
        }
        
        .registro-container h2 {
          margin-bottom: 0.5rem;
          color: #333;
          font-family: "Raleway", sans-serif;
          font-size: 2rem;
          font-weight: bold;
        }
        
        .descripcion {
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
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
        
        .progress-step.active {
          background-color: #667eea;
        }
        
        .progress-step.completed {
          background-color: #379683;
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
        
        form {
          text-align: left;
        }
        
        label {
          display: block;
          margin-top: 1rem;
          color: #444;
          font-weight: 500;
          font-family: "Raleway", sans-serif;
        }
        
        input {
          width: 100%;
          padding: 0.7rem;
          margin-top: 0.3rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 0.95rem;
          box-sizing: border-box;
          font-family: "Raleway", sans-serif;
        }
        
        input:focus {
          outline: none;
          border-color: #379683;
          box-shadow: 0 0 0 2px rgba(55, 150, 131, 0.2);
        }
        
        .botones {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.8rem;
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
        
        .btn-registro {
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
        
        .btn-registro:hover {
          background-color: #2a6b5c;
        }
        
        #mensajeConfirmacion {
          margin-top: 1.5rem;
          background-color: #e6ffee;
          color: #137c4c;
          padding: 1rem;
          border-radius: 6px;
          font-weight: 500;
          font-family: "Raleway", sans-serif;
          animation: slideIn 0.5s ease-out;
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
        
        .oculto {
          display: none;
        }
        
        .password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .password-wrapper input {
          padding-right: 42px;
        }
        
        .toggle-password {
          position: absolute;
          right: 12px;
          cursor: pointer;
          font-size: 1.2rem;
          color: #999;
          user-select: none;
          transition: color 0.3s ease;
        }
        
        .toggle-password:hover {
          color: #379683;
        }
        
        /* Validación visual */
        .input-error {
          border-color: #e74c3c;
          box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
        }
        
        .input-success {
          border-color: #27ae60;
          box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.2);
        }
        
        .error-message {
          color: #e74c3c;
          font-size: 0.8rem;
          margin-top: 0.3rem;
          font-family: "Raleway", sans-serif;
        }
        
        /* Responsive */
        @media (max-width: 480px) {
          :host {
            padding: 1rem 0;
          }
          
          .registro-container {
            margin: 0 1rem;
            padding: 1.5rem;
          }
          
          .botones {
            flex-direction: column;
            gap: 0.8rem;
          }
          
          .registro-container h2 {
            font-size: 1.5rem;
          }
        }
      </style>

      <main class="registro-container">
        <!-- Indicador de progreso -->
        <div class="progress-indicator">
          <div class="progress-step active"></div>
          <div class="progress-step"></div>
          <div class="progress-step"></div>
        </div>
        
        <h2>Crear Cuenta</h2>
        <p class="descripcion">Paso 1 de 3: Información básica para tu cuenta de Glottia.</p>
        
        <form id="registroForm">
          <label for="nombres">Nombres *</label>
          <input type="text" id="nombres" name="nombres" placeholder="Tu nombre" required />
          <div id="nombresError" class="error-message oculto"></div>
          
          <label for="apellidos">Apellidos *</label>
          <input type="text" id="apellidos" name="apellidos" placeholder="Tus apellidos" required />
          <div id="apellidosError" class="error-message oculto"></div>
          
          <label for="email">Correo Electrónico *</label>
          <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" required />
          <div id="emailError" class="error-message oculto"></div>
          
          <label for="password">Contraseña *</label>
          <div class="password-wrapper">
            <input type="password" id="password" placeholder="Mínimo 6 caracteres" required minlength="6" />
            <span class="toggle-password">👁️</span>
          </div>
          <div id="passwordError" class="error-message oculto"></div>
          
          <label for="confirmar">Confirmar Contraseña *</label>
          <div class="password-wrapper">
            <input type="password" id="confirmar" placeholder="Repite tu contraseña" required />
            <span class="toggle-password">👁️</span>
          </div>
          <div id="confirmarError" class="error-message oculto"></div>

          <div class="botones">
            <button type="button" class="btn-volver" id="btnVolver">Volver a Iniciar Sesión</button>
            <button type="submit" class="btn-registro">Continuar</button>
          </div>
        </form>
        <div id="mensajeConfirmacion" class="oculto">✅ ¡Información guardada! Continuando...</div>
      </main>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Formulario de registro
    this.shadowRoot.getElementById("registroForm").addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        this.showSuccessMessage();
        // Guardar datos en localStorage para el siguiente paso
        this.saveUserData();
        setTimeout(() => {
          // Redirigir a preferencias
          window.location.href = "preferencias-register.html";
        }, 1500);
      }
    });

    // Botón volver a login
    this.shadowRoot.getElementById("btnVolver").addEventListener("click", () => {
      window.location.href = "login.html";
    });

    // Toggle password visibility
    this.shadowRoot.querySelectorAll(".toggle-password").forEach((icon) => {
      icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        icon.textContent = isHidden ? "🙈" : "👁️";
      });
    });

    // Validación en tiempo real
    this.shadowRoot.getElementById("email").addEventListener("blur", () => {
      this.validateEmail();
    });

    this.shadowRoot.getElementById("password").addEventListener("blur", () => {
      this.validatePassword();
    });

    this.shadowRoot.getElementById("confirmar").addEventListener("blur", () => {
      this.validatePasswordConfirm();
    });

    this.shadowRoot.getElementById("nombres").addEventListener("blur", () => {
      this.validateRequired("nombres", "El nombre es obligatorio");
    });

    this.shadowRoot.getElementById("apellidos").addEventListener("blur", () => {
      this.validateRequired("apellidos", "Los apellidos son obligatorios");
    });
  }

  saveUserData() {
    const userData = {
      nombres: this.shadowRoot.getElementById("nombres").value,
      apellidos: this.shadowRoot.getElementById("apellidos").value,
      email: this.shadowRoot.getElementById("email").value,
      password: this.shadowRoot.getElementById("password").value
    };
    
    localStorage.setItem('glottia_user_registration', JSON.stringify(userData));
  }

  // ...existing validation methods...
  validateForm() {
    let isValid = true;
    
    isValid = this.validateRequired("nombres", "El nombre es obligatorio") && isValid;
    isValid = this.validateRequired("apellidos", "Los apellidos son obligatorios") && isValid;
    isValid = this.validateEmail() && isValid;
    isValid = this.validatePassword() && isValid;
    isValid = this.validatePasswordConfirm() && isValid;
    
    return isValid;
  }

  validateRequired(fieldId, message) {
    const field = this.shadowRoot.getElementById(fieldId);
    const errorDiv = this.shadowRoot.getElementById(fieldId + "Error");
    
    if (!field.value.trim()) {
      this.showFieldError(field, errorDiv, message);
      return false;
    } else {
      this.showFieldSuccess(field, errorDiv);
      return true;
    }
  }

  validateEmail() {
    const email = this.shadowRoot.getElementById("email");
    const errorDiv = this.shadowRoot.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.value.trim()) {
      this.showFieldError(email, errorDiv, "El email es obligatorio");
      return false;
    } else if (!emailRegex.test(email.value)) {
      this.showFieldError(email, errorDiv, "Por favor ingresa un email válido");
      return false;
    } else {
      this.showFieldSuccess(email, errorDiv);
      return true;
    }
  }

  validatePassword() {
    const password = this.shadowRoot.getElementById("password");
    const errorDiv = this.shadowRoot.getElementById("passwordError");
    
    if (!password.value) {
      this.showFieldError(password, errorDiv, "La contraseña es obligatoria");
      return false;
    } else if (password.value.length < 6) {
      this.showFieldError(password, errorDiv, "La contraseña debe tener al menos 6 caracteres");
      return false;
    } else {
      this.showFieldSuccess(password, errorDiv);
      return true;
    }
  }

  validatePasswordConfirm() {
    const password = this.shadowRoot.getElementById("password");
    const confirmar = this.shadowRoot.getElementById("confirmar");
    const errorDiv = this.shadowRoot.getElementById("confirmarError");
    
    if (!confirmar.value) {
      this.showFieldError(confirmar, errorDiv, "Debes confirmar tu contraseña");
      return false;
    } else if (password.value !== confirmar.value) {
      this.showFieldError(confirmar, errorDiv, "Las contraseñas no coinciden");
      return false;
    } else {
      this.showFieldSuccess(confirmar, errorDiv);
      return true;
    }
  }

  showFieldError(field, errorDiv, message) {
    field.classList.add("input-error");
    field.classList.remove("input-success");
    errorDiv.textContent = message;
    errorDiv.classList.remove("oculto");
  }

  showFieldSuccess(field, errorDiv) {
    field.classList.remove("input-error");
    field.classList.add("input-success");
    errorDiv.classList.add("oculto");
  }

  showSuccessMessage() {
    const mensaje = this.shadowRoot.getElementById("mensajeConfirmacion");
    mensaje.classList.remove("oculto");
    
    // Limpiar clases de validación
    this.shadowRoot.querySelectorAll("input").forEach(input => {
      input.classList.remove("input-error", "input-success");
    });
    this.shadowRoot.querySelectorAll(".error-message").forEach(error => {
      error.classList.add("oculto");
    });
  }
}

customElements.define("glottia-register", GlottiaRegister);