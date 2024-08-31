(() => {
  interface LoginScreen {
    render(): void;
  }

  interface HomeScreen {
    render(): void;
  }

  interface LogoutScreen {
    render(): void;
  }

  interface AppFactory {
    createLoginScreen(): LoginScreen;
    createLogoutScreen(): LogoutScreen;
    createHomeScreen(): HomeScreen;
  }

  // iOS application
  class IOSLoginScreen implements LoginScreen {
    render() {
      console.log('Please, log in to this iOS app');
    }
  }

  class IOSHomeScreen implements HomeScreen {
    render() {
      console.log('Welcome to this iOS app!');
    }
  }

  class IOSLogoutScreen implements LogoutScreen {
    render() {
      console.log('Good bye! I hope you endjoyed this iOS app.');
    }
  }

  class IOSAppFactory implements AppFactory {
    createLoginScreen() {
      return new IOSLoginScreen();
    }
    createLogoutScreen() {
      return new IOSLogoutScreen();
    }
    createHomeScreen() {
      return new IOSHomeScreen();
    }
  }

  // Web application
  class WebLoginPage implements LoginScreen {
    render() {
      console.log('Please, log in to this Web app');
    }
  }

  class WebHomePage implements HomeScreen {
    render() {
      console.log('Welcome to this Web app!');
    }
  }

  class WebLogoutPage implements LogoutScreen {
    render() {
      console.log('Good bye! I hope you endjoyed this Web app.');
    }
  }

  class WebAppFactory implements AppFactory {
    createLoginScreen() {
      return new WebLoginPage();
    }
    createLogoutScreen() {
      return new WebLogoutPage();
    }
    createHomeScreen() {
      return new WebHomePage();
    }
  }

  // optional, not a part of the pattern
  const getFactory = (type: string) => {
    if (type === 'web') {
      return new WebAppFactory();
    }

    if (type === 'iOS') {
      return new IOSAppFactory();
    }

    throw new Error(`Cannot create app factory of the unknown type: ${type}`)
  }

  const client = () => {
    const factory1 = getFactory('web');

    factory1.createLoginScreen().render();
    factory1.createHomeScreen().render();
    factory1.createLogoutScreen().render();

    const factory2 = getFactory('iOS');

    factory2.createLoginScreen().render();
    factory2.createHomeScreen().render();
    factory2.createLogoutScreen().render();
  }

  client();
})()

// Output:

// Please, log in to this Web app
// Welcome to this Web app!
// Good bye! I hope you endjoyed this Web app.

// Please, log in to this iOS app
// Welcome to this iOS app!
// Good bye! I hope you endjoyed this iOS app.
