const connection = require('./database/connection');

module.exports = async function(request, response, next) {

        if(request.headers["authorization"]) {
            const [bearer, token] = request.headers["authorization"].split(" ");

            const user = await connection('users')
                            .where('user_token', token)                
                            .first('id', 'name', 'username', 'user_token', 'picture');

            if (!user) {
                response.status(401).json({"error": "Token de sessão inválido, por favor refaça o login"}); 
            } else {
                request.user = { ...user, user_id: user.id };
                next();
            }
            
        } else {
            response.status(401).json({"error": "Sessão inválida, por favor faça o login"});  
        }

    }