interface Config {
    encode(): string;
}

class XmlConfig implements Config {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    encode() {
        const escapedName = this.name
            .replace('<', '\\<')
            .replace('>', '\\>');

        return `<xml><name>${escapedName}</name></xml>`;
    }
}

class JsonConfig implements Config {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    encode() {
        const escapedName = this.name.replace('"', '\\"');
        return `{"name": "${escapedName}"}`;
    }
}

interface Creator {
    createConfig(name: string): Config;
}

class XmlConfigCreator implements Creator {
    createConfig(name: string) {
        return new XmlConfig(name);
    }
}

class JsonConfigCreator implements Creator {
    createConfig(name: string) {
        return new JsonConfig(name);
    }
}

// optional generic creator
// not a part of the factory method pattern
// use with care as it hardcodes specific
// config implementations
const createConfig = (() => {
    const creators: Record<string, Creator> = {
        'json': new JsonConfigCreator(),
        'xml': new XmlConfigCreator()
    };

    return (type: string, name: string) => {
        const cnf = creators?.[type]?.createConfig(name);
        if (!cnf) {
            throw new Error(`Unknown config type: ${type}`)
        }
        return cnf;
    }
})()

function client() {
    const cnf1 = createConfig('json', 'Julia Smith');
    const cnf2 = createConfig('xml', 'Kim Hunter');
    console.log(cnf1.encode());
    console.log(cnf2.encode());
}

client();
