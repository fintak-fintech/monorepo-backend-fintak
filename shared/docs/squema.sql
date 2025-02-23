CREATE TABLE Users_Companies (
    cognito_sub UUID PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2),
    company_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Users_Financials (
    cognito_sub UUID PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    financials_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Admins (
    cognito_sub UUID PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Employees (
    cognito_sub UUID PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2),
    company_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    nit VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    logo_url TEXT,
    company_type VARCHAR(50) NOT NULL
);

CREATE TABLE Roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Users_roles (
    user_id UUID,
    role_id UUID REFERENCES Roles(id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE Permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Roles_Permissions (
    role_id UUID REFERENCES Roles(id),
    permission_id UUID REFERENCES Permissions(id),
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE Loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID,
    amount DECIMAL(18,2) NOT NULL,
    term INT NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_date TIMESTAMP,
    payment_date TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    disbursement_status VARCHAR(50) NOT NULL,
    disbursement_date TIMESTAMP
);

CREATE TABLE Guarantee_Documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    loan_id UUID REFERENCES Loans(id),
    document_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE Electronic_Signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID,
    document_id UUID NOT NULL,
    hash_signature TEXT NOT NULL,
    signature_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    transaction_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_reference TEXT NOT NULL
);

CREATE TABLE Monthly_Statements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    month VARCHAR(10) NOT NULL,
    total_due DECIMAL(18,2) NOT NULL,
    outstanding_balance DECIMAL(18,2) NOT NULL,
    installment_number INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Employee_Discounts_Files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID,
    file_path TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    total_employees INT NOT NULL,
    total_amount DECIMAL(18,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    generated_by UUID
);

CREATE TABLE Support_Requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID,
    user_id UUID,
    request_type VARCHAR(100) NOT NULL,
    request_description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

CREATE TABLE Benefits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    simulation_type VARCHAR(50) NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    term INT NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    simulation_result TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Products_Promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    installment_plan VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Product_Purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    product_promotion_id UUID REFERENCES Products_Promotions(id),
    amount DECIMAL(18,2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Interest_Charges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID,
    month VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_interest DECIMAL(18,2) NOT NULL,
    fintak_fee_percentage DECIMAL(5,2) NOT NULL,
    fintak_fee_amount DECIMAL(18,2) NOT NULL
);