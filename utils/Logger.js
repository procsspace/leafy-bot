const chalk = require('chalk');
const TIME = new Date();

class Logger {
    constructor(options) {
        this.options = options;
    }
    log(message) {
        console.log(chalk.green(`[${TIME.getHours()}:${TIME.getMinutes()}:${TIME.getSeconds()}]: ${message}`));
    }
    error(message) {
        console.error(`[${TIME.getHours()}:${TIME.getMinutes()}:${TIME.getSeconds()}]: ${message}`);
    }
    warn(message) {
        console.warn(chalk.yellow(`[${TIME.getHours()}:${TIME.getMinutes()}:${TIME.getSeconds()}]: ${message}`));
    }
    info(message) {
        console.info(chalk.blue(`[${TIME.getHours()}:${TIME.getMinutes()}:${TIME.getSeconds()}]: ${message}`));
    }
    debug(message) {
        if (this.options.debug) {
            console.debug(chalk.magenta(`[${TIME.getHours()}:${TIME.getMinutes()}:${TIME.getSeconds()}]: ${message}`));
        }
        else {
            this.log(`[${TIME.getHours()}:${TIME.getMinutes()}:${TIME.getSeconds()}]: ${message}`);
        }
    }
}
module.exports = Logger;
