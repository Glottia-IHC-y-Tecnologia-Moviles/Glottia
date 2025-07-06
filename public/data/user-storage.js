class UserStorage {
  constructor() {
    this.users = this.loadUsers();
    this.currentUser = this.getCurrentUser();
  }

  // Cargar usuarios del localStorage
  loadUsers() {
    const users = localStorage.getItem('glottia_users');
    return users ? JSON.parse(users) : [];
  }

  // Guardar usuarios en localStorage
  saveUsers() {
    localStorage.setItem('glottia_users', JSON.stringify(this.users));
  }

  // Registrar nuevo usuario
  registerUser(userData) {
    // Verificar si el email ya existe
    if (this.users.find(user => user.email === userData.email)) {
      throw new Error('Este email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser = {
      id: this.generateId(),
      nombres: userData.nombres,
      apellidos: userData.apellidos,
      email: userData.email,
      password: userData.password, // En producción esto debería estar hasheado
      preferences: userData.preferences || {},
      createdAt: new Date().toISOString(),
      isActive: true
    };

    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  // Autenticar usuario
  authenticateUser(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Email o contraseña incorrectos');
    }
    if (!user.isActive) {
      throw new Error('Cuenta inactiva');
    }
    return user;
  }

  // Iniciar sesión
  loginUser(email, password) {
    const user = this.authenticateUser(email, password);
    this.currentUser = user;
    localStorage.setItem('glottia_current_user', JSON.stringify(user));
    return user;
  }

  // Cerrar sesión
  logoutUser() {
    this.currentUser = null;
    localStorage.removeItem('glottia_current_user');
  }

  // Obtener usuario actual
  getCurrentUser() {
    const user = localStorage.getItem('glottia_current_user');
    return user ? JSON.parse(user) : null;
  }

  // Verificar si hay sesión activa
  isLoggedIn() {
    return this.currentUser !== null;
  }

  // Generar ID único
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Obtener todos los usuarios (para debug)
  getAllUsers() {
    return this.users;
  }

  // Actualizar usuario
  updateUser(userId, updates) {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('Usuario no encontrado');
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    this.saveUsers();

    // Si es el usuario actual, actualizar también la sesión
    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = this.users[userIndex];
      localStorage.setItem('glottia_current_user', JSON.stringify(this.currentUser));
    }

    return this.users[userIndex];
  }
}

// Instancia global
window.UserStorage = new UserStorage();

// Debug
console.log('Sistema de usuarios cargado correctamente');