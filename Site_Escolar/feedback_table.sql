CREATE TABLE IF NOT EXISTS user_feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) DEFAULT 'Anônimo',
    email VARCHAR(255),
    user_type VARCHAR(50) NOT NULL,
    other_technology VARCHAR(255),
    features_used TEXT,
    experience_rating INT NOT NULL,
    feedback TEXT NOT NULL,
    suggestions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_type (user_type),
    INDEX idx_experience_rating (experience_rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
