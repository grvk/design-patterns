class Singleton {
  private static _instance: Singleton;
  private static count = 0;

  private constructor() {
    Singleton.count++;
    console.log('Initializing Singleton');
  }

  public static get instance(): Singleton {
    if (!Singleton._instance) {
      Singleton._instance = new Singleton();
    }
    console.log("Returning Singleton instance");
    return Singleton._instance;
  }

  public count(): void {
    console.log(`Count Singleton instances: ${Singleton.count}`);
  }
}


const slingletonClient = () => {
  const singleton1 = Singleton.instance;
  const singleton2 = Singleton.instance;
  const singleton3 = Singleton.instance;

  singleton1.count();
  singleton2.count();
  singleton3.count();
};

slingletonClient();
