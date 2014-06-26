module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            console.log("development environment set");
            return {
              port  : 3000,
              redis : {port: 6379, host: "127.0.0.1"}
            };

        case 'production':
            console.log("production environment set");
            return {
              port  : process.env.PORT,
              redis : {port: 6379, host: "127.0.0.1"}
            };

        default:
            console.log("default environment set");
            return {
              port  : 3000,
              redis : {port: 6379, host: "127.0.0.1"}
            };
    }
};
