CREATE TABLE IF NOT EXISTS inquiry_limits (key TEXT PRIMARY KEY NOT NULL, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS inquiry_limits_expiry ON inquiry_limits(expires_at);
CREATE TABLE IF NOT EXISTS inquiry_requests (id TEXT PRIMARY KEY NOT NULL, ip_hash TEXT NOT NULL, email_hash TEXT NOT NULL, status TEXT NOT NULL, created_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS inquiry_requests_ip ON inquiry_requests(ip_hash, created_at);
CREATE INDEX IF NOT EXISTS inquiry_requests_email ON inquiry_requests(email_hash, created_at);
CREATE INDEX IF NOT EXISTS inquiry_requests_time ON inquiry_requests(created_at);
