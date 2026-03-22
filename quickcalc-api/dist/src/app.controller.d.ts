export declare class AppController {
    getRoot(): {
        success: boolean;
        message: string;
        version: string;
        endpoints: {
            auth: string;
            devices: string;
            alerts: string;
            dashboard: string;
            operators: string;
        };
        documentation: string;
    };
    getHealth(): {
        success: boolean;
        message: string;
        timestamp: string;
        uptime: number;
    };
}
