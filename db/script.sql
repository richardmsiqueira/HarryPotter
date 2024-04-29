CREATE DATABASE harrypotter;
\c harrypotter;

CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    casa VARCHAR(255) NOT NULL,
    habilidade VARCHAR(255) NOT NULL,
    sangue VARCHAR(255) NOT NULL,
    patrono VARCHAR(255) NOT NULL
);

CREATE TABLE varinha (
    id SERIAL PRIMARY KEY,
    material VARCHAR(255) NOT NULL,
    comprimento VARCHAR(255) NOT NULL,
    nucleo VARCHAR(255) NOT NULL,
    fabricacao DATE NOT NULL
);

INSERT INTO bruxos (nome, idade, casa, habilidade, sangue, patrono) VALUES ('Harry Potter', 17, 'Grifinória', 'Apanhar o pomo de ouro', 'Mestiço', 'Golfinho');

INSERT INTO varinha (material, comprimento, nucleo, fabricacao) VALUES ('Madeira de Teixo', '30 cm', 'Pena de Fênix', '1991-07-31');