module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db('users').where(filter).select();
    };

    const save = async (user) => {
        if (!user.name) return { error: 'Nome é um atributo obrigatório!' };
        if (!user.email) return { error: 'O email é um atributo obrigatório!' };
        if (!user.password) return {error: 'A palavra-passe é um atributo obrigatório!'};
        if (!user.birthday) return {error: 'A data de nascimento é um atributo obrigatório!'};

        const userDb = await findAll({ email: user.email});
        if (userDb && userDb.length > 0) return { error: 'E-mail duplicado na base de dados!'};
        return app.db('users').insert(user, '*');
    };

    return { findAll, save};
}