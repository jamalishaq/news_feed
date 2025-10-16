import mongoose from 'mongoose';

/**
 * Attempt a graceful shutdown of resources (HTTP server, mongoose connection).
 * Returns an object describing what was closed or any errors encountered.
 */
export default async function gracefulShutdown({ server, timeout = 5000 } = {}) {
    const results = {};

    const serverClosePromise = server && typeof server.close === 'function'
        ? new Promise((resolve) => {
            try {
                server.close((err) => {
                    if (err) {
                        results.server = { closed: false, error: err };
                    } else {
                        results.server = { closed: true };
                    }
                    resolve();
                });
            } catch (err) {
                results.server = { closed: false, error: err };
                resolve();
            }
        })
        : Promise.resolve();

    const mongoosePromise = (mongoose && typeof mongoose.disconnect === 'function')
        ? mongoose.disconnect().then(() => { results.mongoose = { disconnected: true }; }).catch((err) => { results.mongoose = { disconnected: false, error: err }; })
        : Promise.resolve();

    const all = Promise.all([serverClosePromise, mongoosePromise]);

    // enforce timeout so shutdown cannot hang indefinitely
    const timeoutPromise = new Promise((resolve) => setTimeout(() => {
        results.timedOut = true;
        resolve();
    }, timeout));

    await Promise.race([all, timeoutPromise]);

    return results;
}
