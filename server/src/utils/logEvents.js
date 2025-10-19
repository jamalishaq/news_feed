import { mkdir, appendFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

const logEvents = async (logFileName, message) => {
    const __dirname = import.meta.dirname;
    const logsDirectory = join(__dirname, '..', '..', 'logs');
    const logItem = `Timestamp: ${new Date().toISOString()} | ${message} \n`

    try {
        if (!existsSync(logsDirectory)) {
            await mkdir(logsDirectory);
        }
    
        await appendFile(join(logsDirectory, logFileName), logItem);
        
    } catch (err) {
        console.error(err);
    }
}

export default logEvents;