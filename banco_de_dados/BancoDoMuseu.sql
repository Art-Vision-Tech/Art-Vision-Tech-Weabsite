create database museu;

use museu;

-- 

create table registro (
idRegistro int,
fkSensor int,
primary key (idRegistro, fkSensor),
temperatura float,
umidade float,
dtRegistro timestamp, -- atualizar o horario que foi capturado a temperatura e a umidade (lembrando que para aparecer no gráfico e feita a ligação pela API no vscode)
foreign key (fkSensor)
references sensor(idSensor)
);

--

create table sensor (
idSensor int primary key auto_increment,
nome varchar (45),
fkAmbiente int,
constraint fkAmbiente foreign key (fkAmbiente)
references sensor(idSensor)
);

--

create table ambiente (
idAmbiente int primary key auto_increment,
nome_ambiente varchar (45),
andar varchar(45),
qtd_acervo int,
fkMuseu int,
foreign key (FkMuseu) references ambiente(idAmbiente)
) auto_increment = 100;

-- 

create table funcionario(
idFuncionario int,
FkMuseu int,
primary key (IdFuncionario, FkMuseu),
nome varchar(45),
cpf char(11) unique,
email varchar (45),
senha varchar (45),
foreign key (FkMuseu)
references funcionario(idFuncionario)
) auto_increment = 1000;

-- 

create table museu (
idMuseu int primary key auto_increment,
cnpj char (14) unique,
nome varchar (45),
telefone varchar (45),
fkEndereço int,
constraint fkEndereço foreign key (fkEndereço)
references 	museu(idMuseu)
);

--

create table endereço (
idEndereço int primary key,
cep char(9),
estado varchar(45),
cidade varchar(45),
bairro varchar(45),
numero char(4),
complemento varchar (20)
);

-- 

select * from registro;
select * from sensor;
select * from ambiente;
select * from museu;
select * from funcionario;
select * from endereço;

drop database museu;




