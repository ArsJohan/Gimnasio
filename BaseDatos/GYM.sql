CREATE DATABASE GIMNASIO
GO
USE GIMNASIO
GO


CREATE TABLE TIPO_DOC(
Codigo_TipoDoc INT PRIMARY KEY NOT NULL,
TipoDoc VARCHAR(50) NOT NULL
)
GO


CREATE TABLE EMPLEADO(
Codigo_Empleado int PRIMARY KEY NOT NULL,
Activo bit DEFAULT 1,
Nombre varchar(50) NOT NULL,
Apellido varchar(50) NOT NULL,
Telefono varchar(100) NOT NULL,
nroDoc varchar(100) NOT NULL,
Salario money NOT NULL,
Fecha_Ingreso date NOT NULL,
Fecha_Nac date NOT NULL,
codigo_TipoDoc int NOT NULL,
id_Empleado int NOT NULL,
FOREIGN KEY (codigo_TipoDoc) REFERENCES TIPO_DOC(Codigo_TipoDoc),
FOREIGN KEY (id_Empleado) REFERENCES EMPLEADO(Codigo_Empleado)
)
GO


CREATE TABLE USUARIO(
Clave int NOT NULL,
Contrasenia varchar(255) NOT NULL,
codigo_EMPLEADO int PRIMARY KEY NOT NULL,
Activo bit DEFAULT 1,
FOREIGN KEY (codigo_EMPLEADO) REFERENCES EMPLEADO(Codigo_Empleado)
)
GO
CREATE TABLE TIPO_TEL(
codigo_Tipo int PRIMARY KEY NOT NULL,
Descripcion varchar(80) NOT NULL
)
GO
CREATE TABLE PROFESION(
codigo_Profesion int PRIMARY KEY NOT NULL,
Descripcion varchar(80) NOT NULL
)
GO
CREATE TABLE CIUDAD(
codigo_Ciudad int PRIMARY KEY NOT NULL,
Descripcion varchar(80) NOT NULL,
)
GO


CREATE TABLE SOCIO(
codigo_Socio int PRIMARY KEY NOT NULL,
Activo bit DEFAULT 1,
nroDoc varchar(100) NOT NULL,
Nombre varchar(50) NOT NULL,
Apellido varchar(50) NOT NULL,
Direccion varchar(50) NOT NULL,
codigo_TipoDoc int NOT NULL,
codigo_Ciudad int NOT NULL,
codigo_Profesion int NOT NULL,
codigo_Empleado int NOT NULL,
FOREIGN KEY (codigo_TipoDoc) REFERENCES TIPO_DOC(codigo_TipoDoc),
FOREIGN KEY (codigo_Ciudad) REFERENCES CIUDAD(codigo_Ciudad),
FOREIGN KEY (codigo_Profesion) REFERENCES PROFESION(codigo_Profesion),
FOREIGN KEY (codigo_Empleado) REFERENCES EMPLEADO(Codigo_Empleado)
);
GO
CREATE TABLE TELEFONO(
codigo_Telefono int PRIMARY KEY NOT NULL,
Numero float NOT NULL,
codigo_Tipo int NOT NULL,
codigo_Socio int NOT NULL,
FOREIGN KEY (codigo_Tipo) REFERENCES TIPO_TEL(codigo_Tipo),
FOREIGN KEY (codigo_Socio) REFERENCES SOCIO(codigo_Socio)
)
GO


CREATE TABLE ESPECIALIDAD(
codigo_Especialidad int PRIMARY KEY NOT NULL,
Especialidad varchar(50) NOT NULL
);
GO
CREATE TABLE MONITOR(
codigo_Monitor int PRIMARY KEY NOT NULL,
Activo bit DEFAULT 1,
nroDoc varchar(100) NOT NULL,
Nombre varchar(50) NOT NULL,
Apellido varchar(50) NOT NULL,
Telefono varchar(100) NOT NULL,
Experiencia varchar(80) NOT NULL,
codigo_TipoDoc int NOT NULL,
codigo_Empleado int NOT NULL,
FOREIGN KEY (codigo_TipoDoc) REFERENCES TIPO_DOC(codigo_TipoDoc),
FOREIGN KEY (codigo_Empleado) REFERENCES EMPLEADO(Codigo_Empleado)
);
GO
CREATE TABLE ESPECI_MONI(
codigo_Especi_Moni int PRIMARY KEY NOT NULL,
codigo_Especialidad int NOT NULL,
codigo_Monitor int NOT NULL,
FOREIGN KEY (codigo_Especialidad) REFERENCES ESPECIALIDAD(codigo_Especialidad),
FOREIGN KEY (codigo_Monitor) REFERENCES MONITOR(codigo_Monitor)
);
GO
CREATE TABLE HORAS(
codigo_Horas int PRIMARY KEY NOT NULL,
Descripcion varchar(80) NOT NULL
);
GO
CREATE TABLE DIA(
codigo_Dia int PRIMARY KEY NOT NULL,
Descripcion varchar(80) NOT NULL
);
GO
CREATE TABLE TIPO_SALA(
codigo_Tipo int PRIMARY KEY NOT NULL,
Tipos varchar(80) NOT NULL
);
GO
CREATE TABLE ESTADO(
codigo_Estado int PRIMARY KEY NOT NULL,
Descripcion varchar(80) NOT NULL
);
GO
CREATE TABLE SALA(
codigo_Sala int PRIMARY KEY NOT NULL,
Activo bit DEFAULT 1,
Metros_Cuadrados int NOT NULL,
Ubicacion varchar(80) NOT NULL,
codigo_Tipo int NOT NULL,
codigo_Empleado int NOT NULL,
FOREIGN KEY (codigo_Tipo) REFERENCES TIPO_SALA(codigo_Tipo),
FOREIGN KEY (codigo_Empleado) REFERENCES EMPLEADO(Codigo_Empleado)
);
GO
CREATE TABLE APARATO(
codigo_Aparato int PRIMARY KEY NOT NULL,
Activo bit DEFAULT 1,
Descripcion varchar(80) NOT NULL,
codigo_Estado int NOT NULL,
codigo_Sala int NOT NULL,
codigo_Empleado int NOT NULL,
FOREIGN KEY (codigo_Estado) REFERENCES ESTADO(codigo_Estado),
FOREIGN KEY (codigo_Sala) REFERENCES SALA(codigo_Sala),
FOREIGN KEY (codigo_Empleado) REFERENCES EMPLEADO(Codigo_Empleado)
);
GO
CREATE TABLE CLASE(
codigo_Clase int PRIMARY KEY NOT NULL,
Activo bit DEFAULT 1,
Descripcion varchar(80) NOT NULL,
codigo_Dia int NOT NULL,
codigo_hora int NOT NULL,
codigo_Monitor int NOT NULL,
codigo_Sala int NOT NULL,
codigo_Empleado int NOT NULL,
FOREIGN KEY (codigo_Dia) REFERENCES DIA(codigo_Dia),
FOREIGN KEY (codigo_hora) REFERENCES HORAS(codigo_Horas),
FOREIGN KEY (codigo_Monitor) REFERENCES MONITOR(codigo_Monitor),
FOREIGN KEY (codigo_Sala) REFERENCES SALA(codigo_Sala),
FOREIGN KEY (codigo_Empleado) REFERENCES EMPLEADO(Codigo_Empleado)
);
GO
CREATE TABLE MATRICULA(
codigo_Matricula int PRIMARY KEY NOT NULL,
Precio money NOT NULL,
Descripcion varchar(80) NOT NULL,
codigo_Empleado int NOT NULL,
codigo_Socio int NOT NULL,
FOREIGN KEY (codigo_Empleado) REFERENCES EMPLEADO(Codigo_Empleado),
FOREIGN KEY (codigo_Socio) REFERENCES SOCIO(codigo_Socio)
)
GO
CREATE TABLE DETALLE_MATRICULA(
codigo_DetallesMatr int PRIMARY KEY NOT NULL,
Fecha_Inicio date NOT NULL,
Fecha_Fin date NOT NULL,
codigo_Clase int NOT NULL,
codigo_Matricula int NOT NULL,
FOREIGN KEY (codigo_Clase) REFERENCES CLASE(codigo_Clase),
FOREIGN KEY (codigo_Matricula) REFERENCES MATRICULA(codigo_Matricula)
)
GO






--INSERCION DE DATOS

-- CIUDAD
INSERT INTO CIUDAD (codigo_Ciudad, Descripcion) VALUES 
(1, 'MEDELLÍN'),(2, 'CALI'),(3, 'BOGOTÁ'),
(4, 'BARRANQUILLA'),(5, 'CARTAGENA'),(6, 'SANTA MARTA');
GO


--TIPO DOCUMENTO
INSERT INTO TIPO_DOC(Codigo_TipoDoc,TipoDoc) VALUES
(1,'Cedula de Ciudadania'),(2,'Cedula de Extranjería'), (3,'Pasaporte'),(4,'Targeta de Identidad');
GO
--EMPLEADO
INSERT INTO EMPLEADO (Codigo_Empleado,Activo,Nombre,Apellido,Telefono,nroDoc,Salario,Fecha_Ingreso,Fecha_Nac,codigo_TipoDoc, id_Empleado) VALUES
(1, 1, 'OSCAR', 'RODRIGUEZ', '3209878336', '1029283888', 1350000, '2024-02-17', '1993-02-17', 1, 1),
(2, 1, 'DANIEL', 'ALVAREZ', '320989996', '1029283888', 175000, '2024-02-17', '1994-03-20', 2, 1),
(3, 1, 'CARLOS', 'PEREZ', '3207778336', '1055830939', 1350000, '2024-02-13', '1995-02-17', 1, 1),
(4, 1, 'MARIA', 'LOPEZ', '3249757336', '1029283555', 1500000, '2024-05-13', '1993-06-22', 1, 1),
(5, 1, 'ANA', 'GOMEZ', '3209768637', '1059990939', 1350000, '2024-03-23', '2000-07-07', 1, 1),
(6, 1, 'MIGUEL', 'SANCHEZ', '3239464336', '1028283777', 1450000, '2024-08-16', '1995-08-11', 2, 1),
(7, 1, 'JORGE', 'RAMIREZ', '3179878339', '1055550940', 1350000, '2024-06-25', '1993-02-17', 1, 1),
(8, 1, 'ALICIA', 'CRUZ', '3139234536', '1028983888', 1350000, '2024-08-31', '1997-02-27', 2, 1),
(9, 1, 'CRISTINA', 'MORENO', '3199878336', '1059770474', 1350000, '2024-07-27', '1993-02-17', 1, 2),
(10, 1, 'PABLO', 'RIVERA', '3212987833', '1029283588', 1350000, '2024-10-10', '1998-03-14', 1, 5),
(11, 1, 'ANTONIO', 'ORTEGA', '3119678339', '1358893339', 1350000, '2024-05-24', '1993-02-17', 1, 3),
(12, 1, 'MARTA', 'CASTRO', '3209878338', '1029283567', 1600000, '2024-11-11', '1997-02-12', 2, 4),
(13, 1, 'VERONICA', 'HERRERA', '3105316232', '1059330949', 1350000, '2024-02-26', '1993-02-17', 1, 1),
(14, 1, 'ALFREDO', 'GIL', '3209878334', '1029283765', 1780000, '2024-12-11', '2001-09-18', 2, 3);
GO
--PROFESION
INSERT INTO PROFESION (codigo_Profesion, Descripcion) VALUES
(1,'Ingeniero de Sistemas'),(2,'Analista de Requisitos'),(3,'Analista de Ciberseguridad'),(4,'Contador'),(5,'Psicologo');

--SOCIO

INSERT INTO SOCIO (codigo_Socio, Activo,nroDoc,Nombre,Apellido,Direccion,codigo_TipoDoc,codigo_Ciudad,codigo_Profesion,codigo_Empleado) VALUES 
(1, 1,'1029283889','Juan', 'Perez', 'Cr 56 #62-19', 3, 1, 1, 1),
(2, 1,'1029283899','Maria', 'Gomez', 'Cr. 30 #56-12', 2, 2, 2, 2),
(3, 1,'1029283856','Carlos', 'Lopez', 'Cr. 54 #7-10', 1, 3, 3, 3),
(4, 1,'1029273845','Ana', 'Martinez', 'Cr. 65 #52', 2, 4, 4, 4),
(5, 1,'1029283834','Luis', 'Garcia', 'Cr.45 #23', 4, 5, 5, 5),
(6, 1,'1028283299','Elena', 'Rodriguez', 'Cr.46 #26', 2, 6, 3, 6),
(7, 1,'1027263555','Jorge', 'Fernandez', 'Cr.55 #23', 3, 1, 1, 7),
(8, 1,'1025233666','Laura', 'Sanchez', 'Cr.41 #23', 2, 2, 2, 8),
(9, 1,'1024243123','Miguel', 'Ramirez', 'Cr.48 #23', 3, 3, 3, 9),
(10, 1,'1026283567','Diana', 'Vasquez', 'Cr.56 #23', 4, 4, 1, 10);


-- USUARIO
INSERT INTO USUARIO (Clave,Contrasenia,codigo_EMPLEADO)VALUES 
(1001505127, 'yeison23', 1),(1055830939, 'johan89', 2);



-- TIPO TELEFONO
INSERT INTO TIPO_TEL(codigo_Tipo, descripcion) VALUES
(1,'FIJO'),(2,'CELULAR'),(3,'Satelital');

-- TELEFONO  
INSERT INTO TELEFONO(codigo_Telefono,Numero,codigo_Tipo,codigo_Socio) VALUES
(1, 3001234567, 2, 1),(2, 3001234568,  2, 2),(3, 3001234569,  2, 3),(4, 3111234567,  2, 4),
(5, 3111234568, 2, 5),(6, 3111234569, 2, 6),(7, 3221234567, 2, 7),(8, 3221234568, 2, 8),
(9, 3221234569, 2, 9),(10, 3331234567,  2, 10),(11, 3331234568, 2, 1),(12, 3331234569, 2, 2),
(17, 3551234568, 2, 3),(18, 3551234569, 2, 4),(19, 3661234567, 2, 5),(20, 3661234568, 2, 6);

--HORAS
INSERT INTO HORAS(codigo_Horas,Descripcion) VALUES
(1, '6:00-8:00'),(2,'8:00-10:00'),(3,'10:00-12:00'),(4,'13:00-15:00'),(5,'15:00:17:00'),(6,'17:00-19:00'),(7,'19:00-21:00');
GO
--DIA
INSERT INTO DIA(codigo_Dia,Descripcion) VALUES
(1,'Lunes'),(2,'Martes'),(3,'Miercoles'),(4,'Jueves'),(5,'Viernes'),(6,'Sabado'),(7,'Domingo');
GO
--TIPO SALA
INSERT INTO TIPO_SALA(codigo_Tipo,Tipos) VALUES
(1,'Cardio'),(2,'General'),(3,'Muscular');

GO
--ESTADO
INSERT INTO ESTADO(codigo_Estado,Descripcion) VALUES
(1,'Bueno'),(2,'Regular'),(3,'Malo');
GO

--- ESPECIALIDAD
INSERT INTO ESPECIALIDAD(codigo_Especialidad,Especialidad) VALUES
(1,'Aerobic'),(2,'Step'),(3,'Stretching'),(4,'Zumba'),(5,'AeroBox'),(6,'Yoga');
GO

--MONITOR
INSERT INTO MONITOR(codigo_Monitor,Activo,nroDoc,Nombre,Apellido,Telefono,Experiencia,codigo_TipoDoc,codigo_Empleado)
VALUES (1,1,'134858484','Scott','Perez','455868555','3 Años',1,1),(2,1,'134548447','Bryan','Torres','455868555','2 Años',1,3),
(3,1,'1358584894','Alicia','Macias','4558685659','4 Años',1,5),(4,1,'134678484','Tayler','Buitrago','455444455','1 Años',1,1);
GO

--ESPECIALIDAD MONITOR
INSERT INTO ESPECI_MONI(codigo_Especi_Moni, codigo_Especialidad,codigo_Monitor)VALUES
(1,5,1),(2,6,2),(3,3,3),(4,4,4),(5,1,3),(6,3,2),(7,2,1),(8,1,4);
GO

--SALA
INSERT INTO SALA(codigo_Sala,Activo,Metros_Cuadrados,Ubicacion,codigo_Tipo,codigo_Empleado)VALUES
(1,1,120,'A-101',1,1),(2,1,300,'A-201',2,1),(3,1,140,'A-301',3,1),(4,1,180,'A-102',1,1),(5,1,160,'A-302',3,1);
GO

--APARATO
INSERT INTO APARATO(codigo_Aparato,Activo,Descripcion,codigo_Estado ,codigo_Sala,codigo_Empleado) VALUES
(1,1,'Bicicletas Estáticas',1,1,1),(2,1,'Escaladoras ',1,1,2),(3,1,'Elípticas',1,1,3),(4,1,'Cinta de Correr',1,1,4),(5,1,'Colchoneta',1,2,1),(6,1,'Bandas elásticas',1,2,2),(7,1,'Rueda abdominal',1,2,3),(8,1,'Mancuernas',1,3,4),
(9,1,'Prensa',1,3,5),(10,1,'Barras',1,3,3);
GO


--CLASE
INSERT INTO CLASE(codigo_Clase,Activo,Descripcion,codigo_Dia,codigo_hora,codigo_Monitor,codigo_Sala,codigo_Empleado) VALUES
(1, 1, 'Zumba Power: Muévete con Tayler', 1, 2, 4, 1, 4),
(2, 1, 'Yoga Zen con Bryan', 5, 6, 2, 2, 3),
(3, 1, 'Dance Energy con Scott', 3, 4, 1, 4, 6),
(4, 1, 'Aerobic Flow: Vibra con Alicia', 4, 3, 3, 1, 1),
(5, 1, 'Stretch & Relax con Alicia', 4, 4, 3, 1, 1),
(6, 1, 'AeroBox Challenge con Scott', 2, 7, 1, 3, 5),
(7, 1, 'Aerobic Beats con Tayler', 7, 4, 4, 1, 5);

--MATRICULA

INSERT INTO MATRICULA(codigo_Matricula, Precio,Descripcion,codigo_Empleado,codigo_Socio) VALUES
(1,600000,'Matricula para Zumba',4,1),(2,450000,'Matricula para Yoga',5,2),(3,690000,'Matricula para Aerobic',1,3),(4,900000,'Matricula para AeroBox',1,4),
(5,500000,'Matricula para Step',2,5),(6,600000,'Matricula para Stretching',2,6);
--DETALLE MATRICULA
INSERT INTO DETALLE_MATRICULA(codigo_DetallesMatr,Fecha_Inicio,Fecha_Fin,codigo_Clase,codigo_Matricula) VALUES
(1, '2024-11-13', '2025-02-13', 1, 1),
(2, '2024-12-25', '2025-05-27', 2, 2),
(3, '2024-12-12', '2025-03-02', 7, 3),
(4, '2025-11-25', '2025-05-27', 6, 4),
(5, '2024-12-27', '2025-05-27', 3, 5),
(6, '2024-12-28', '2025-05-02', 5, 6);