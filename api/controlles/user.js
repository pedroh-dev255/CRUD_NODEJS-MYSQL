import { db } from "../db.js";

export const getUsers = (_, res)=>{
    const q = "SELECT * FROM dados";
    db.query(q, (err, data)=> {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = "INSERT INTO dados(nome, email, data_nas) VALUES (?)";


    const values = [
        req.body.nome,
        req.body.email,
        req.body.data_nas,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Dados Criados com sucesso.");
    });
};

export const updateUser = (req, res) => {
    const q = "UPDATE dados SET `nome` = ?, `email` = ?, `data_nas` = ?  WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.data_nas,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Dados atualizados com sucesso.");
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM dados WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Dados deletados com sucesso.");
    });
};