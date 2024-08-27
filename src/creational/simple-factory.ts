interface IUser {
  toJson(): string;
}

class GuestUser implements IUser {
  private fullName: string;

  constructor(fName: string) {
    this.fullName = fName;
  }

  toJson(): string {
    return JSON.stringify({ type: 'guest', name: this.fullName })
  }
};

class AdminUser implements IUser {
  private fullName: string;

  constructor(fName: string) {
    this.fullName = fName;
  }

  toJson(): string {
    return JSON.stringify({ type: 'admin', name: this.fullName })
  }
};


const createUser = (type: string, fullName: string) => {
  if (type === 'guest') {
    return new GuestUser(fullName);
  }

  if (type === 'admin') {
    return new AdminUser(fullName);
  }

  throw new Error("Unknown user type");
}


const simpleFactoryClient = () => {
  const guest1 = createUser('guest', 'Jack Smith')
  const guest2 = createUser('guest', 'Anna Martinez')
  const admin1 = createUser('admin', 'Julia Barr')
  const admin2 = createUser('admin', 'David Hu')

  console.log(guest1.toJson())
  console.log(guest2.toJson())
  console.log(admin1.toJson())
  console.log(admin2.toJson())
}


simpleFactoryClient();
