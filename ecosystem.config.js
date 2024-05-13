// PM2 Config
module.exports = {
    apps: [
        {
            name: 'admin-dropfee',
            script: 'dist/index.js',
            args: 'run',
        },
    ],
};
