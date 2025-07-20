
const cron = require("node-cron");

cron.schedule("* 8 * * *", () => {
    const yesterday = new Date() - 1;
    
});