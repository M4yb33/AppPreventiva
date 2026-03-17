export declare function loadEnvConfig(): {
    database: {
        url: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    app: {
        port: number;
        name: string;
        version: string;
        nodeEnv: string;
    };
};
