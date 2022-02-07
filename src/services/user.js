module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db('users').where(filter).select();
    };

    const save = async (user) => {
        if (!user.name) return { error: 'Nome é um atributo obrigatório!' };
        if (!user.email) return { error: 'O email é um atributo obrigatório!' };
        if (!user.password) return {error: 'A palavra-passe é um atributo obrigatório!'};
        if (!user.birthday) return {error: 'A data de nascimento é um atributo obrigatório!'};
        if (!user.NIF) return {error: 'O NIF é um atributo obrigatório!'};
        if (!user.BI) return {error: 'O BI é um atributo obrigatório!'};
        if (!user.gender) return {error: 'O género é um atributo obrigatório!'};
        if (!user.address) return {error: 'A morada é um atributo obrigatório!'};
        if (!user.zip) return {error: 'O código postal é um atributo obrigatório!'};
        if (!user.location) return {error: 'A localidade é um atributo obrigatório!'};
        if (!user.admin) return {error: 'O admin é um atributo obrigatório!'};


        const userDb = await findAll({ email: user.email});
        if (userDb && userDb.length > 0) return { error: 'E-mail duplicado na base de dados!'};
        return app.db('users').insert(user, '*');
    };

    return { findAll, save};
}