create database CRUD;

use CRUD;

create table dados(
id INT auto_increment not null,
nome VARCHAR(200),
email VARCHAR(200),
data_nas VARCHAR(200),
primary key(id)
);


insert into dados(nome,email,data_nas) values ("Pedro Henrique", "pedro@phsolucoes.tech", "19/12/2001");