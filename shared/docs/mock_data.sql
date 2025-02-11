-- Mock Data for PostgreSQL Database Schema

-- Insert Users
INSERT INTO Users (cognito_sub, first_name, last_name, email, status, company_id, created_at, updated_at, identification_number, document_type) VALUES
('sub123', 'John', 'Doe', 'johndoe@example.com', 'active', 1, NOW(), NOW(), '123456789', 'CC'),
('sub124', 'Jane', 'Smith', 'janesmith@example.com', 'active', 2, NOW(), NOW(), '987654321', 'CC');

-- Insert Companies
INSERT INTO Companies (id, name, address, phone, contact_email, status, created_at, updated_at, logo_url, company_type) VALUES
(1, 'Company A', '123 St', '1234567890', 'contact@companya.com', 'active', NOW(), NOW(), 'logo_url_a', 'finance'),
(2, 'Company B', '456 St', '0987654321', 'contact@companyb.com', 'active', NOW(), NOW(), 'logo_url_b', 'tech');

-- Insert Roles
INSERT INTO Roles (id, name, description, created_at, updated_at) VALUES
(1, 'Admin', 'Administrator role', NOW(), NOW()),
(2, 'User', 'Standard user role', NOW(), NOW());

-- Insert Permissions
INSERT INTO Permissions (id, name, description, created_at, updated_at) VALUES
(1, 'view_reports', 'Can view reports', NOW(), NOW()),
(2, 'manage_users', 'Can manage users', NOW(), NOW());

-- Insert Users_roles
INSERT INTO Users_roles (user_id, role_id) VALUES
('sub123', 1),
('sub124', 2);

-- Insert Loans
INSERT INTO Loans (id, user_id, amount, term, interest_rate, status, request_date, approval_date, payment_date, created_at, updated_at, disbursement_status, disbursement_date) VALUES
(1, 'sub123', 5000, 12, 5.5, 'approved', NOW(), NOW(), NOW(), NOW(), NOW(), 'disbursed', NOW()),
(2, 'sub124', 3000, 6, 4.2, 'pending', NOW(), NULL, NULL, NOW(), NOW(), 'pending', NULL);

-- Insert Transactions
INSERT INTO Transactions (id, user_id, transaction_type, created_at, updated_at, transaction_reference) VALUES
(1, 'sub123', 'loan_payment', NOW(), NOW(), 'TXN123'),
(2, 'sub124', 'loan_payment', NOW(), NOW(), 'TXN124');

-- Insert Products_Promotions
INSERT INTO Products_Promotions (id, company_id, product_name, product_description, price, installment_plan, status, created_at) VALUES
(1, 1, 'Laptop', 'High-end laptop', 1500, 12, 'active', NOW()),
(2, 2, 'Smartphone', 'Latest smartphone', 1000, 24, 'active', NOW());

-- Insert Monthly_Statements
INSERT INTO Monthly_Statements (id, user_id, month, total_due, outstanding_balance, installment_number, created_at) VALUES
(1, 'sub123', '2024-02', 500, 4500, '1/12', NOW()),
(2, 'sub124', '2024-02', 300, 2700, '1/6', NOW());

-- Insert Employee_Discounts_Files
INSERT INTO Employee_Discounts_Files (id, company_id, file_path, status, total_employees, total_amount, created_at, updated_at, generated_by) VALUES
(1, 1, '/files/discounts_feb.csv', 'processed', 100, 50000, NOW(), NOW(), 'admin1');

-- Insert Support_Requests
INSERT INTO Support_Requests (id, company_id, user_id, request_type, request_description, status, created_at, updated_at, resolved_at) VALUES
(1, 1, 'sub123', 'loan_issue', 'Issue with loan disbursement', 'pending', NOW(), NOW(), NULL);

-- Insert Tips
INSERT INTO Tips (id, title, description, created_at, updated_at) VALUES
(1, 'Savings Tip', 'Save at least 20% of your salary.', NOW(), NOW());

-- Insert Benefits
INSERT INTO Benefits (id, title, description, created_at, updated_at) VALUES
(1, 'Health Insurance', 'Company-sponsored health insurance.', NOW(), NOW());

-- Insert Electronic_Signatures
INSERT INTO Electronic_Signatures (id, user_id, document_id, hash_signature, signature_date, state, created_at) VALUES
(1, 'sub123', 1, 'hash_123', NOW(), 'signed', NOW());

-- Insert Guarantee_Documents
INSERT INTO Guarantee_Documents (id, loan_id, document_path, created_at, status) VALUES
(1, 1, '/documents/guarantee_loan1.pdf', NOW(), 'approved');

-- Insert Interest_Charges
INSERT INTO Interest_Charges (id, company_id, month, created_at, total_interest, fintak_fee_percentage, fintak_fee_amount) VALUES
(1, 1, '2024-02', NOW(), 5000, 2.5, 125);

-- Mock data successfully inserted.
