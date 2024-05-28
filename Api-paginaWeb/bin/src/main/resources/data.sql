INSERT INTO socios (nombre, apellidos, dni, telefono, email, password, rol) VALUES
('Juan', 'Pérez', '12345678A', '123456789', 'juan@example.com', '$2a$10$19Upw/aJoLj/KYSdOlzas.gRuIH2TdFUNtBPg2jSodlzRMT8fMZ5W', 'admin'),
('María', 'González', '87654321B', '987654321', 'maria@example.com', '$2a$10$19Upw/aJoLj/KYSdOlzas.gRuIH2TdFUNtBPg2jSodlzRMT8fMZ5W', 'basico'),
('Pedro', 'López', '13579246C', '987123456', 'pedro@example.com', '$2a$10$19Upw/aJoLj/KYSdOlzas.gRuIH2TdFUNtBPg2jSodlzRMT8fMZ5W', 'basico'),
('Luisa', 'Martínez', '24681357D', '654321987', 'luisa@example.com', '$2a$10$19Upw/aJoLj/KYSdOlzas.gRuIH2TdFUNtBPg2jSodlzRMT8fMZ5W', 'admin'),
('Ana', 'Sánchez', '98765432E', '654789123', 'ana@example.com', '$2a$10$19Upw/aJoLj/KYSdOlzas.gRuIH2TdFUNtBPg2jSodlzRMT8fMZ5W','admin');

-- Insertar datos de ejemplo en la tabla patron
INSERT INTO patron (nombre_patron, dni_patron) VALUES
('Antonio', '12345678A'),
('María', '87654321B'),
('Pedro', '13579246C'),
('Luisa', '24681357D'),
('Ana', '98765432E');

INSERT INTO barcos (numero_matricula, nombre_barco, numero_amarre, cuota_mensual, socios_id_socio) VALUES
('ABC123', 'Barco 1', 1, 100.00, 1),
('DEF456', 'Barco 2', 2, 120.00, 2),
('GHI789', 'Barco 3', 3, 150.00, 3),
('JKL012', 'Barco 4', 4, 130.00, 4),
('MNO345', 'Barco 5', 5, 110.00, 5);

-- Insertar datos de ejemplo en la tabla salidas
INSERT INTO salidas (fch_hora_salida, destino, barco_id_barco, patron_id_patron) VALUES
('2024-04-20 10:00:00', 'Destino 1', 1, 1),
('2024-04-21 11:00:00', 'Destino 2', 2, 2),
('2024-04-22 12:00:00', 'Destino 3', 3, 3),
('2024-04-23 13:00:00', 'Destino 4', 4, 4),
('2024-04-24 14:00:00', 'Destino 5', 5, 5);