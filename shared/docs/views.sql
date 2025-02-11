
-- View: Una vista para generar el resumen mensual de créditos y desempeño por empresa.
CREATE VIEW MonthlyCompanyPerformance AS
SELECT 
    c.id AS company_id,
    c.name AS company_name,
    COUNT(lr.id) AS total_loans,
    SUM(lr.amount) AS total_loan_amount,
    SUM(lr.interest_rate * lr.amount / 100) AS total_interest_generated,
    COUNT(DISTINCT lr.user_id) AS total_borrowers,
    (
        SELECT COUNT(DISTINCT u.id)
        FROM Users u
        WHERE u.company_id = c.id AND u.role = 'Employee'
    ) - COUNT(DISTINCT lr.user_id) AS total_non_borrowers
FROM Companies c
LEFT JOIN LoanRequests lr ON c.id = lr.company_id AND EXTRACT(MONTH FROM lr.request_date) = EXTRACT(MONTH FROM CURRENT_DATE)
GROUP BY c.id, c.name;

-- View: A view to summarize loans by company for quick reporting.
CREATE VIEW LoanSummary AS
SELECT 
    c.id AS company_id,
    c.name AS company_name,
    COUNT(l.id) AS total_loans,
    SUM(l.amount) AS total_amount,
    SUM(l.term) AS total_term,
    COUNT(DISTINCT l.user_id) AS total_applicants
FROM Loans l
JOIN Companies c ON l.company_id = c.id
GROUP BY c.id, c.name;

-- View: Loan Details per User
CREATE VIEW Loan_Details AS
SELECT l.id AS loan_id, u.first_name, u.last_name, l.amount, l.term, l.interest_rate, l.status, l.request_date, l.approval_date, l.payment_date, l.disbursement_status
FROM Loans l
JOIN Users u ON l.user_id = u.cognito_sub;

-- View: Total Interest Charges per Company
CREATE VIEW Interest_Charges_Report AS
SELECT c.name AS company_name, ic.month, ic.total_interest, ic.fintak_fee_percentage, ic.fintak_fee_amount
FROM Interest_Charges ic
JOIN Companies c ON ic.company_id = c.id;

-- View: Monthly Statements Summary
CREATE VIEW Monthly_Statements_Summary AS
SELECT ms.user_id, u.first_name, u.last_name, ms.month, ms.total_due, ms.outstanding_balance, ms.installment_number
FROM Monthly_Statements ms
JOIN Users u ON ms.user_id = u.cognito_sub;

-- View: Employee Discount Reports
CREATE VIEW Employee_Discounts_Report AS
SELECT edf.company_id, c.name AS company_name, edf.file_path, edf.total_employees, edf.total_amount, edf.generated_by
FROM Employee_Discounts_Files edf
JOIN Companies c ON edf.company_id = c.id;