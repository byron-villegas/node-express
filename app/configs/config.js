const { readFileSync } = require('fs');
const { join } = require('path');
const expressPackage = require('express/package.json');

const config = {
    bannerFilename: 'banner.txt',
    jwt: {
        algorithm: 'RS256',
        secretKey: 'gMnZjVODmU',
        expiresIn: 60 * 60
    },
    server: {
        context: '/api',
        port: process.env.PORT || 3000
    },
    routes: {
        auth: '/auth',
        productos: '/productos',
        usuarios: '/usuarios'
    },
    swagger: {
        title: 'Node Express',
        version: '1.0.0',
        path: '/swagger-ui',
        document: require('../docs/swagger.json')
    }
}


const showBanner = () => {
    const banner = readFileSync(join(__dirname, config.bannerFilename), 'utf8');

    const bannerLog = banner.replace('package.name', config.swagger.title)
        .replace('package.version', config.swagger.version)
        .replace('express.version', expressPackage.version)
        .replace('node.version', process.version)
        .replace('server.path', config.server.context)
        .replace('server.port', config.server.port);

    console.log(bannerLog);
}

module.exports = { config, showBanner };