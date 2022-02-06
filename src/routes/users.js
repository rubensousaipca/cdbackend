module.exports = (app) => {
    const findAll = (req, res) => {
        const users = [
            { name: 'Ruben Sousa', email: 'rubensousayt@gmail.com', id: '24357'},            
        ];
        res.status(200).json(users);
    };

    const create = (req, res) => {
        res.status(201).json(req.body);
    };

    return { findAll, create};
};