class AccessConfig {
  private static count = 0;

  public id = 0;
  public dbAccess = false;
  public serverAccess = false;
  public emailAccess = false;
  public awsAccess = false;
  public vpnAccess = false;
  public slackAcess = false;

  constructor() {
    this.id = ++AccessConfig.count;
  }

  display() {
    console.log(
      `      id=${this.id}
      dbAcess=${this.dbAccess}
      serverAccess=${this.serverAccess}
      emailAccess=${this.emailAccess}
      awsAccess=${this.awsAccess}
      vpnAccess=${this.vpnAccess}
      slackAccess=${this.slackAcess}`
    )
  }
}

interface AccessConfigBuilder {
  setId(id: number): this;
  setDbAccess(v: boolean): this;
  setServerAccess(v: boolean): this;
  setEmailAccess(v: boolean): this;
  setAwsAccess(v: boolean): this;
  setVpnAccess(v: boolean): this;
  setSlackAccess(v: boolean): this;
  reset(): this;
  getResultConfig(): AccessConfig;
}

class EmployeeAccessConfigBuilder implements AccessConfigBuilder {
  private config: AccessConfig;

  constructor() {
    this.config = new AccessConfig();
  }

  public reset() {
    this.config = new AccessConfig();
    return this;
  }

  getResultConfig() {
    return this.config;
  }

  public setId(id: number) {
    console.log(`[EmployeeAccessConfigBuilder] setting id: ${id}`);
    this.config.id = id;
    return this;
  }

  public setDbAccess(dbAccess: boolean) {
    console.log(`[EmployeeAccessConfigBuilder] setting db access: ${dbAccess}`);
    this.config.dbAccess = dbAccess;
    return this;
  }

  public setServerAccess(serverAccess: boolean) {
    console.log(`[EmployeeAccessConfigBuilder] setting server access: ${serverAccess}`);
    this.config.serverAccess = serverAccess;
    return this;
  }

  public setEmailAccess(emailAccess: boolean) {
    console.log(`[EmployeeAccessConfigBuilder] setting email access: ${emailAccess}`);
    this.config.emailAccess = emailAccess;
    return this;
  }

  public setAwsAccess(awsAccess: boolean) {
    console.log(`[EmployeeAccessConfigBuilder] setting aws access: ${awsAccess}`);
    this.config.awsAccess = awsAccess;
    return this;
  }

  public setVpnAccess(vpnAccess: boolean) {
    console.log(`[EmployeeAccessConfigBuilder] setting vpn access: ${vpnAccess}`);
    this.config.vpnAccess = vpnAccess;
    return this;
  }

  public setSlackAccess(slackAccess: boolean) {
    console.log(`[EmployeeAccessConfigBuilder] setting slack access: ${slackAccess}`);
    this.config.slackAcess = slackAccess;
    return this;
  }
}

// could also implement class ContractorAccessConfigBuilder


class Director {
  private makeBuilder: () => AccessConfigBuilder;


  constructor(fn: () => AccessConfigBuilder) {
    this.makeBuilder = fn;
  }

  setBuilderMaker(fn: () => AccessConfigBuilder) {
    this.makeBuilder = fn;
  }

  buildNoAccessConfig(): AccessConfig {
    return this.makeBuilder()
      .setDbAccess(false)
      .setServerAccess(false)
      .setEmailAccess(false)
      .setAwsAccess(false)
      .setVpnAccess(false)
      .setSlackAccess(false)
      .getResultConfig();
  }

  buildMaxAccessConfig(): AccessConfig {
    return this.makeBuilder()
      .setDbAccess(true)
      .setServerAccess(true)
      .setEmailAccess(true)
      .setAwsAccess(true)
      .setVpnAccess(true)
      .setSlackAccess(true)
      .getResultConfig();
  }
}

const builderClient = () => {
  const director = new Director(() => new EmployeeAccessConfigBuilder());
  director.buildMaxAccessConfig().display();
  director.buildNoAccessConfig().display();
  director.buildMaxAccessConfig().display();
}


builderClient();
