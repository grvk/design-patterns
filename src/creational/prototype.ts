(() => {
  interface Configuration {
    timestamp: number;
    location: string;
    isPrivate: boolean;
    clone: () => Configuration;
    print: () => void;
  }

  interface UserConfiguration extends Configuration {
    userId: string;
    balance: number;
  }

  const client = () => {
    const config: Configuration = {
      timestamp: 12345,
      location: 'Earth',
      isPrivate: false,
      clone: function () {
        // make sure this method works for your use case:
        // do you need to copy-over any values?
        // is shallow-copying ok?
        return Object.create(this);
      },
      print: function () {
        console.log(`~~~~~ private config: ${this.isPrivate}`);
      }
    };
    config.print();

    const userConfig = <UserConfiguration>config.clone();
    userConfig.userId = '15';
    userConfig.balance = 591.15;
    userConfig.isPrivate = true;
    userConfig.print();
    config.print();
    userConfig.print();

    const anotherClone = userConfig.clone();
    anotherClone.isPrivate = false;
    anotherClone.print();


  }

  client();
})()

// Output:

// ~~~~~ private config: false
// ~~~~~ private config: true
// ~~~~~ private config: false
// ~~~~~ private config: true
// ~~~~~ private config: false
