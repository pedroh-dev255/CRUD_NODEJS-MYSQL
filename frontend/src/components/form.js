import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-raius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(()=>{
        if (onEdit){
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.data_nas.value = onEdit.data_nas;
        }
    }, [onEdit]);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const user = ref.current;

        if (
            !user.nome.value ||
            !user.email.value||
            !user.data_nas.value
        ){
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit){
            await axios
                .put("http://localhost:500/" + onEdit.id, {
                    nome: user.nome.value,
                    email: user.email.value,
                    data_nas: user.data_nas.value
                })
                .then(({data}) =>toast.success(data))
                .catch(({data}) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:500", {
                    nome: user.nome.value,
                    email: user.email.value,
                    data_nas: user.data_nas.value,
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data));
        }
        user.nome.value = "";
        user.email.value= "" ;
        user.data_nas.value="";

        setOnEdit(null);
        getUsers();
    };

    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome"/>
            </InputArea>
            <InputArea>
                <Label>Email</Label>
                <Input name="email" type="email"/>
            </InputArea>
            <InputArea>
                <Label>Data Nascimento</Label>
                <Input name="data_nas" type="date"/>
            </InputArea>
            <Button type="submit">Salvar</Button>
        </FormContainer>
    );
};

export default Form;