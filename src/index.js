const  app = require("./app");

const main = () => {
    app.listen(app.get('port'))
    console.log('server on port %d', app.get('port'))
}

main()