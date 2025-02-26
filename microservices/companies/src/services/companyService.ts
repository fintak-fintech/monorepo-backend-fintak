import { queryDatabase } from "../config/db";

export const getCompanies = async () => {
  const result = await queryDatabase({
    query: "SELECT * FROM companies",
    params: [],
  });
  return result.rows;
};

export const createCompany = async (companyData: {
  name: string;
  identification_number: string;
  address: string;
  phone: string;
  contact_email: string;
  status: string;
  logo_url?: string;
  company_type: string;
}) => {
  const {
    name,
    identification_number,
    address,
    phone,
    contact_email,
    status,
    logo_url,
    company_type,
  } = companyData;
  const isDuplicate = await checkDuplicateCompany(identification_number);
  if (isDuplicate) {
    throw new Error("Company with this identification_number already exists");
  }

  const result = await queryDatabase(
    {
      query: `INSERT INTO companies (
            name, identification_number, address, phone, contact_email, status, logo_url, company_type
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
     params: [name, identification_number, address, phone, contact_email, status, logo_url, company_type]
    }
  );
  return result.rows[0];
};

export const checkDuplicateCompany = async (identification_number: string) => {
  const result = await queryDatabase({
    query: `SELECT * FROM companies WHERE identification_number = $1`,
    params: [identification_number]
  });
  return result.rows.length > 0;
};

export const updateCompany = async (
  identification_number: string,
  companyData: {
    name: string;
    address: string;
    phone: string;
    contact_email: string;
    logo_url?: string;
    company_type: string;
  }
) => {
  const { name, address, phone, contact_email, logo_url, company_type } = companyData;
  const company = await findByCompanyByIdNumber(identification_number);
  if (!company) {
    throw new Error("Company not found");
  }

  const updatedFields = {
    name: name || company.name,
    address: address || company.address,
    phone: phone || company.phone,
    contact_email: contact_email || company.contact_email,
    logo_url: logo_url || company.logo_url,
    company_type: company_type || company.company_type,
  };

  const result = await queryDatabase({
    query: `UPDATE companies SET 
            name = $1, address = $2, phone = $3, contact_email = $4, logo_url = $5, company_type = $6, updated_at = CURRENT_TIMESTAMP 
        WHERE identification_number = $7 RETURNING *`,
    params: [
      updatedFields.name,
      updatedFields.address,
      updatedFields.phone,
      updatedFields.contact_email,
      updatedFields.logo_url,
      updatedFields.company_type,
      identification_number,
    ],
  });

  return result.rows[0];
};

export const findByCompanyByIdNumber = async (identification_number: string) => {
  const result = await queryDatabase({
    query: `SELECT * FROM companies WHERE identification_number = $1`,
    params: [identification_number]
  });
  return result.rows[0];
};

export const deleteCompany = async (identification_number: string, status: string) => {
  const result = await queryDatabase({
      query: `UPDATE companies SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE identification_number = $2 RETURNING *`,
      params: [status, identification_number]
  });
  console.log(result.rows[0]);
  return result.rows[0];
};

export const toggleCompanyStatus = async (identification_number: string, status: string) => {
  const company = await findByCompanyByIdNumber(identification_number);
  if (!company) {
    throw new Error("Company not found");
  }
  status = status ? "1" : "0";
  const result = await deleteCompany(identification_number, status);
  return result.rows;
};
