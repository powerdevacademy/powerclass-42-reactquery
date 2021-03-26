import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3333'
});

http.interceptors.request.use(config => {
    const user_token = localStorage.getItem('USER_TOKEN');
    
    if (user_token) {
        config.headers["authorization"] = `Bearer ${user_token}`;
    }

    if (config.method === "POST" || config.method === "PUT")
        config.headers["Content-Type"] = 'application/json; charset=UTF-8';

    return config;
});


const api = { 
    'user': { 
        'signup': values => http.post('/users', {
            name: values.name,
            password: values.password,
            username: values.username
        }),
        'login': data => http.post('/login', data),
        'me': async () => {
            try { 
                const res = await http.get('/me');
                return res.data;
            } catch(err) {
              throw err;
            }
        },
        'update': (id, values) => http.put('/users/' + id, {
            name: values.name,
            password: values.password,
            username: values.username,
        }),
    }, 

    'todos': {
        'add' : item => http.post('/todos', {
            item
        }),
        'list': async () => {
            try{
                const res = await http.get('/todos');
                return res.data;
            } catch(err) {
                throw err;
            }
            
        },
        'delete': id => http.delete('/todos/'+id),
        'toggle': id => http.put('/todos/'+id+'/toggle')
    }
};


export default api;