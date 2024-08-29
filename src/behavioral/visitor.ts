type RecordType = string | boolean | number | null;

interface Visitor {
  visitStringRecord(node: StringRecord): string;
  visitBooleanRecord(node: BooleanRecord): string;
  visitNumberRecord(node: NumberRecord): string;
  visitNullRecord(node: NullRecord): string;
}

interface ConfigRecord {
  get(): [string, RecordType];
  // from visitor pattern
  accept(visitor: Visitor): string;
}

// ----------------- NODE IMPLEMENTAION ---------------------------
class StringRecord implements ConfigRecord {
  constructor(private key: string, private value: string) { }

  get(): [string, string] {
    if (
      typeof this.key !== 'string' ||
      typeof this.value !== 'string'
    ) {
      throw new Error('Undefined String Record');
    }

    return [this.key, this.value];
  }

  accept(visitor: Visitor): string {
    return visitor.visitStringRecord(this);
  }
}

class NumberRecord implements ConfigRecord {
  constructor(private key: string, private value: number) { }

  get(): [string, number] {
    if (
      typeof this.key !== 'string' ||
      typeof this.value !== 'number'
    ) {
      throw new Error('Undefined Number Record');
    }
    return [this.key, this.value];
  }

  accept(visitor: Visitor): string {
    return visitor.visitNumberRecord(this);
  }
}

class BooleanRecord implements ConfigRecord {
  constructor(private key: string, private value: boolean) { }

  get(): [string, boolean] {
    if (
      typeof this.key !== 'string' ||
      typeof this.value !== 'boolean'
    ) {
      throw new Error('Undefined Boolean Record');
    }
    return [this.key, this.value];
  }

  accept(visitor: Visitor): string {
    return visitor.visitBooleanRecord(this);
  }
}

class NullRecord implements ConfigRecord {
  constructor(private key: string, private value: null) { }

  get(): [string, null] {
    if (
      typeof this.key !== 'string' ||
      this.value !== null
    ) {
      throw new Error('Undefined Null Record');
    }

    return [this.key, this.value];
  }

  accept(visitor: Visitor): string {
    return visitor.visitNullRecord(this);
  }
}

// ---------------- CONFIG IMPLEMENTATION -----------------------------

class VisitorConfig {

  private _records: ConfigRecord[] = [];

  constructor() {
    this._records = [
      new StringRecord('id', 'who-knows'),
      new StringRecord('name', 'i-hope'),
      new NumberRecord('orderNum', 2424),
      new BooleanRecord('enable', false),
      new BooleanRecord('trust', true),
      new NullRecord('friend', null)
    ]
  }

  get records(): ConfigRecord[] {
    return this._records;
  }
}

// VISITORS
class JsonVisitor implements Visitor {

  visit(key: string, value: RecordType): string {
    const delim = typeof value === 'string' ? '"' : '';
    return `"${key}": ${delim}${value}${delim}`;
  }

  visitStringRecord(node: StringRecord): string {
    return this.visit(...node.get());
  }

  visitBooleanRecord(node: BooleanRecord): string {
    return this.visit(...node.get());
  }

  visitNumberRecord(node: NumberRecord): string {
    return this.visit(...node.get());
  }

  visitNullRecord(node: NullRecord): string {
    return this.visit(...node.get());
  }
}

class XmlVisitor implements Visitor {
  visit(key: string, value: RecordType): string {
    return `<${key}>${value}</${key}>`;
  }

  visitStringRecord(node: StringRecord): string {
    return this.visit(...node.get());
  }

  visitBooleanRecord(node: BooleanRecord): string {
    return this.visit(...node.get());
  }

  visitNumberRecord(node: NumberRecord): string {
    return this.visit(...node.get());
  }

  visitNullRecord(node: NullRecord): string {
    return this.visit(...node.get());
  }
}

// Exporters (extension of visitors; not necessary for the pattern)
class JsonExporter {
  private visitor = new JsonVisitor();

  export({ records }: VisitorConfig) {
    const recordsStr = records.map(r => r.accept(this.visitor));
    console.log(`{\n\t${recordsStr.join(',\n\t')}\n}`);
  }
}

class XmlExporter {
  private visitor = new XmlVisitor();

  export({ records }: VisitorConfig) {
    const recordsStr = records.map(r => r.accept(this.visitor));
    console.log(`<xml>\n\t${recordsStr.join('\n\t')}\n</xml>`);
  }
}


// ---------------- CLIENT -----------------------------

const visitorClient = () => {
  const config = new VisitorConfig();
  const jsonExporter = new JsonExporter();
  const xmlExporter = new XmlExporter();
  jsonExporter.export(config);
  xmlExporter.export(config);
}

visitorClient();
