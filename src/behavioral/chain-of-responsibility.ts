(() => {

  interface LoginRequest {
    ip: string;
    email: string;
    password: string;
  }

  interface LoginRequestValidator {
    validate(r: LoginRequest): boolean;
    setNext(v: LoginRequestValidator | null): void;
  }

  abstract class LoginValidator implements LoginRequestValidator {
    private next: LoginRequestValidator | null = null;

    public setNext(v: LoginRequestValidator): void {
      this.next = v;
    }

    public validate(r: LoginRequest): boolean {
      if (this.next) {
        return this.next.validate(r);
      }

      return true;
    }
  }


  class NetworkValidator extends LoginValidator {
    public validate(r: LoginRequest): boolean {
      return r.ip.startsWith('10.') && super.validate(r);
    }
  }

  class CredentialsValidator extends LoginValidator {
    public validate(r: LoginRequest): boolean {
      return (
        r.email.endsWith('@company.com') &&
        /^\*{8,}$/.test(r.password) &&
        super.validate(r)
      );
    }
  }

  class RoleValidator extends LoginValidator {
    public validate(r: LoginRequest): boolean {
      return r.email.startsWith('admin') && super.validate(r);
    }
  }

  const validatorPipeline = (...validators: LoginRequestValidator[]): LoginRequestValidator => {
    if (validators.length === 0) {
      throw new Error('No validators');
    }

    for (let i = 1; i < validators.length; i++) {
      validators[i - 1].setNext(validators[i]);
    }
    validators[validators.length - 1].setNext(null);
    return validators[0];
  }

  const client = () => {
    // requests
    const guest = { ip: '42.0.0.1', email: 'asdfasdf@email.com', password: '12345678' };
    const wrongNw = { ip: '42.0.0.1', email: 'asdfasdf@company.com', password: '********' };
    const unauthUser = { ip: '10.0.0.1', email: 'user@company.com', password: '********' };
    const badPass = { ip: '10.0.0.1', email: 'admin@company.com', password: '*' };
    const badDomain = { ip: '10.0.0.1', email: 'admin@company.co', password: '********' };
    const admin = { ip: '10.0.0.1', email: 'admin111@company.com', password: '********' };


    const v = validatorPipeline(
      new NetworkValidator(),
      new CredentialsValidator(),
      new RoleValidator()
    );

    console.log(`Guest request succesfull: ${v.validate(guest)}`);
    console.log(`Wrong Network request succesfull: ${v.validate(wrongNw)}`);
    console.log(`Unauthorized request succesfull: ${v.validate(unauthUser)}`);
    console.log(`Bad Password request succesfull: ${v.validate(badPass)}`);
    console.log(`Bad Domain request succesfull: ${v.validate(badDomain)}`);
    console.log(`Admin request succesfull: ${v.validate(admin)}`);
  }

  client();
})()

// Output:

// Guest request succesfull: false
// Wrong Network request succesfull: false
// Unauthorized request succesfull: false
// Bad Password request succesfull: false
// Bad Domain request succesfull: false
// Admin request succesfull: true
