const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { user_id } = request.user;

    const todos = await connection('todos')
                    .select([ '*' ])
                    .where('user_id', user_id);

    return response.json(todos);
  },

  async create(request, response) {
    const { item } = request.body;
    const { user_id } = request.user;

    const [id] = await connection('todos').insert({ item, user_id });
    const todo = await connection('todos').first().where('id', id);

    return response.json(todo);
  },

  async delete(request, response) {
    const { id } = request.params;
    const { user_id } = request.user;

    await connection('todos')
          .where('id', id)
          .andWhere('user_id', user_id)
          .delete();

    return response.status(204).send();
  },

  async toggle(request, response) {
    const { id } = request.params;
    const { user_id } = request.user;

    const todo = await connection('todos')
                  .where('id', id)
                  .andWhere('user_id', user_id)
                  .first();
    await connection('todos').where('id', id).update({ 'complete': !todo.complete });

    return response.json({ ...todo, complete:!todo.complete ? 1 : 0 });
  }
  
};