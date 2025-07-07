class HomeManager {
  constructor() {
    this.init();
  }

  async init() {
    // Esperar a que UserStorage esté disponible
    await this.waitForUserStorage();
    
    // Verificar autenticación
    this.checkAuthentication();
    
    // Cargar datos del usuario
    this.loadUserData();
    
    // Configurar event listeners
    this.setupEventListeners();
  }

  waitForUserStorage() {
    return new Promise((resolve) => {
      if (window.UserStorage) {
        resolve();
      } else {
        setTimeout(() => this.waitForUserStorage().then(resolve), 100);
      }
    });
  }

  checkAuthentication() {
    if (!window.UserStorage.isLoggedIn()) {
      // Si no hay sesión activa, verificar datos temporales de registro
      const tempData = localStorage.getItem('glottia_temp_registration');
      if (!tempData) {
        // Redirigir al login si no hay datos
        window.location.href = 'login.html';
        return;
      }
    }
  }

  loadUserData() {
    let userData = null;
    
    // Intentar obtener usuario logueado
    if (window.UserStorage.isLoggedIn()) {
      userData = window.UserStorage.getCurrentUser();
    } else {
      // Si no hay usuario logueado, usar datos temporales del registro
      const tempData = localStorage.getItem('glottia_temp_registration');
      if (tempData) {
        userData = JSON.parse(tempData);
      }
    }

    if (userData) {
      this.updateWelcomeSection(userData);
      this.updateUserStats(userData);
    }
  }

  updateWelcomeSection(userData) {
    const welcomeSection = document.querySelector('.welcome-section h1');
    const welcomeMessage = document.querySelector('.welcome-section p');
    
    if (welcomeSection) {
      // Crear nombre completo
      const firstName = userData.nombres ? userData.nombres.split(' ')[0] : 'Usuario';
      
      // Actualizar saludo con animación
      welcomeSection.style.opacity = '0';
      setTimeout(() => {
        welcomeSection.innerHTML = `¡Hola, ${firstName}! 👋`;
        welcomeSection.style.opacity = '1';
        welcomeSection.style.transition = 'opacity 0.5s ease';
      }, 200);
    }

    if (welcomeMessage) {
      // Actualizar mensaje con información dinámica
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      let timeGreeting = '';
      
      if (currentHour < 12) {
        timeGreeting = 'Buenos días';
      } else if (currentHour < 18) {
        timeGreeting = 'Buenas tardes';
      } else {
        timeGreeting = 'Buenas noches';
      }

      setTimeout(() => {
        welcomeMessage.innerHTML = `${timeGreeting}! Tienes 3 eventos próximos esta semana. ¡Sigue practicando! 🚀`;
        welcomeMessage.style.opacity = '1';
        welcomeMessage.style.transition = 'opacity 0.5s ease';
      }, 400);
    }
  }

  updateUserStats(userData) {
    // Actualizar estadísticas basadas en el usuario
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statCards.length >= 3) {
      // Simular datos basados en el tiempo de registro
      const joinDate = userData.createdAt ? new Date(userData.createdAt) : new Date();
      const daysSinceJoin = Math.floor((new Date() - joinDate) / (1000 * 60 * 60 * 24));
      
      const stats = {
        events: Math.max(1, Math.floor(daysSinceJoin * 0.8)),
        groups: Math.max(1, Math.floor(daysSinceJoin * 0.2)),
        points: Math.max(10, daysSinceJoin * 5 + Math.floor(Math.random() * 50))
      };

      // Animar actualización de estadísticas
      setTimeout(() => {
        this.animateStatUpdate(statCards[0].querySelector('.stat-number'), stats.events);
        this.animateStatUpdate(statCards[1].querySelector('.stat-number'), stats.groups);
        this.animateStatUpdate(statCards[2].querySelector('.stat-number'), stats.points);
      }, 600);
    }
  }

  animateStatUpdate(element, newValue) {
    if (!element) return;
    
    const startValue = parseInt(element.textContent) || 0;
    const increment = (newValue - startValue) / 20;
    let current = startValue;
    
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= newValue) || (increment < 0 && current <= newValue)) {
        current = newValue;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 50);
  }

  setupEventListeners() {
    // Event listener para cuando se completa el registro
    window.addEventListener('registrationCompleted', (event) => {
      this.loadUserData();
    });

    // Event listener para logout
    const logoutButtons = document.querySelectorAll('[data-action="logout"]');
    logoutButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.logout();
      });
    });
  }

  logout() {
    window.UserStorage.logoutUser();
    localStorage.removeItem('glottia_temp_registration');
    window.location.href = 'login.html';
  }

  // Método público para actualizar datos desde otros componentes
  refreshUserData() {
    this.loadUserData();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.homeManager = new HomeManager();
});

// Exponer globalmente para uso desde otros scripts
window.HomeManager = HomeManager;