// https://en.wikipedia.org/wiki/Syslog
import "reflect-metadata";
import { injectable, inject, Container } from "inversify";

@injectable()
class Logger {
    private level: number;
    private key: string;

    constructor(level: number, key: string){
        this.level = level;
        this.key = key;
    }

    public info(log: string){
        if (this.level >= 5){
            console.log(`INFO: ${log}`)
        }
    }

    public warn(log: string){
        if (this.level >= 4){
            console.log(`WARN: ${log}`)
        }
    }

    public error(log: string){
        if (this.level >= 3){
            console.log(`ERROR: ${log}`)
        }    
    }
}

@injectable()
class Service{

    constructor(@inject('Logger') private logger: Logger){}

    public main(): void{
        // some code
        this.logger.info('here is a log');
        // some buggy codes
        this.logger.error('here is an error log');
    }
}

@injectable()
class Gateway {

    constructor(@inject('Logger') private logger: Logger){}

    public main(): void{
        // some code
        this.logger.info('here is a log');
        // some buggy code
        this.logger.warn('here is a warning log');

    }
}


// booting the app

// Creating the map
const myContainer = new Container()

// create one instance only
const logger = new Logger(6, 'dflkhsfdflkfhdslkh');

// mapping it to the map
myContainer.bind('Logger').toConstantValue(logger)

// mapping the others to the map so we could re-call them
myContainer.bind('Service').to(Service) 
myContainer.bind('Gateway').to(Gateway) 

// call them
const service = myContainer.get<Service>('Service');
const gateway = myContainer.get<Gateway>('Gateway');

service.main();
gateway.main();







