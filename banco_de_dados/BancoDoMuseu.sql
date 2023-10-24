create database museu;

use museu;

-- 

create table registro (
idRegistro int primary key auto_increment,
dht11_temperatura float,
dht11_umidade float,
dtRegistro timestamp default now(), -- atualizar o horario que foi capturado a temperatura e a umidade (lembrando que para aparecer no gráfico e feita a ligação pela API no vscode)
fkAmbiente int,
constraint fkAmbiente foreign key (fkAmbiente)
references ambiente(idAmbiente)
);

--

 insert into registro (dht11_temperatura, dht11_umidade) values
 ('24.7', '20'),
 ('24.7', '27'),
('22.2', '22'),
 ('21.9', '29');

--

create table ambiente (
idAmbiente int primary key auto_increment,
nome_ambiente varchar (45),
andar varchar(45),
qtd_acervo int,
fkMuseu int,
constraint fkMuseu foreign key (FkMuseu) references museu(idMuseu)
) auto_increment = 100;

--

 insert into ambiente (nome_ambiente, andar, qtd_acervo, fkMuseu) values
 ('Sala 1', '1º andar', '200', 1),
 ('Sala 1', '1º andar', '67', 2),
 ('Sala 1', '1º andar', '240', 3),
 ('Sala 2', '2º andar', '80', 1),
 ('Sala 2', '2º andar', '47', 2),
 ('Sala 2', '2º andar', '240', 3),
 ('Sala 3', '3º andar', '240', 1),
 ('Sala 3', '3º andar', '240', 2),
 ('Sala 3', '3º andar', '240', 3);
 
 
--
 
create table funcionario(
idFuncionario int auto_increment,
FkMuseu int,
primary key (IdFuncionario, FkMuseu),
nome varchar(45),
cpf char(11) unique,
email varchar (45),
senha varchar (45),
foreign key (FkMuseu)
references museu(idMuseu)
) auto_increment = 1000;

-- 

insert into funcionario (nome, cpf, email, senha, fkMuseu) values
('Lucas', '00565860860', 'lucas1990@outlook.com', 'Lluquinhas123', 1),
('Marcos', '16321760846', 'marcoslindo@gmail.com', 'mar55cosS', 2),
('Bruno', '86793705849', 'nanatsunotazai@sptech.school', 'brunoBruno231', 3);

--

create table museu (
idMuseu int primary key auto_increment,
cnpj char (14) unique,
nome varchar (45),
telefone varchar (45),
fkEndereço int,
constraint fkEndereço foreign key (fkEndereço)
references 	endereço(idEndereço)
);

--

insert into museu (cnpj, nome, telefone, fkEndereço) values
('27685616000108', 'Catavento', '958238976', 1),
('92486446000196', 'Nacional', '998838976', 2),
('15123795000100', 'Bacia', '999784576', 3);

--

create table endereço (
idEndereço int primary key auto_increment,
cep char(8),
estado varchar(45),
cidade varchar(45),
bairro varchar(45),
numero varchar(4)
);

-- 

insert into endereço (cep, estado, cidade, bairro, numero) values
('04856680', 'São Paulo', 'São Paulo', 'Jardim das Pedras(Zona Sul)', '239'),
('39990972', 'Minas Gerais', 'Água Vermelhas', 'Mocó', '560'),
('87055607', 'Paraná', 'Maringá', 'Conjunto Habitacional Céu Azul', '45');	



-- selects

select * from registro as reg join sensor as sen
on reg.fkSensor = sen.idSensor;

select * from sensor as sen join ambiente as amb
on sen.fkAmbiente = amb.idAmbiente;

select * from ambiente as amb join museu as mus
on amb.fkMuseu = mus.idMuseu;

select * from funcionario as func join museu as mus
on func.fkMuseu = mus.idMuseu;

select * from museu as mus join endereço as ende
on mus.FkEndereço = ende.idEndereço;



-- 

select * from registro;
select * from sensor;
select * from ambiente;
select * from museu;
select * from funcionario;
select * from endereço;

drop database museu;




