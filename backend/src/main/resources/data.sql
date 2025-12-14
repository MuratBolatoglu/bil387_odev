INSERT INTO users (email, password, name, role) VALUES ('test@example.com', 'password', 'Test User', 'USER') ON CONFLICT (email) DO NOTHING;
INSERT INTO users (email, password, name, role) VALUES ('admin@example.com', 'admin', 'Admin User', 'ADMIN') ON CONFLICT (email) DO NOTHING;
