import { queryDatabase } from "../config/db";

export const getProductsPromotions = async () => {
  const result = await queryDatabase({
    query: "SELECT * FROM Products_Promotions",
    params: [],
  });
  return result.rows;
};

export const getProductPromotionById = async (productId: string) => {
  const result = await queryDatabase({
    query: "SELECT * FROM Products_Promotions WHERE id=$1",
    params: [productId],
  });
  if (result.rows.length === 0) return [];
  return result.rows[0];
};

export const createProductPromotion = async (body: any) => {
  const {
    company_id,
    product_name,
    product_description,
    price,
    installment_plan,
    status,
  } = body;
  const result = await queryDatabase(
    {
      query: "INSERT INTO Products_Promotions (company_id, product_name, product_description, price, installment_plan, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      params: [company_id, product_name, product_description, price, installment_plan, status],
    }
  );
  return result.rows[0];
};

export const updateProductPromotion = async (id: string, body: any) => {
  const {
    company_id,
    product_name,
    product_description,
    price,
    installment_plan,
    status,
  } = body;
  const result = await queryDatabase(
    {
      query: "UPDATE Products_Promotions SET company_id=$1, product_name=$2, product_description=$3, price=$4, installment_plan=$5, status=$6 WHERE id=$7 RETURNING *",
      params: [company_id, product_name, product_description, price, installment_plan, status, id],
    }
  );
  if (result.rows.length === 0)
    throw new Error(`Promotion with id ${id} not found`);
  return result.rows[0];
};

export const deleteProductPromotion = async (id: string) => {
  const result = await queryDatabase(
    {
      query: "DELETE FROM Products_Promotions WHERE id=$1 RETURNING",
      params: [id],
    }
  );
  if (result.rows.length === 0)
    return false;
  return true;
};

export const disableByCompany = async (
  company_id: string,
  product_id: string,
  state = 'disabled') => {
  const result = await queryDatabase(
    {
      query: 'UPDATE Products_Promotions SET status = $1 WHERE id = $2 AND company_id = $3 RETURNING *',
      params: [state, product_id, company_id],
    }
  );
  if (result.rows.length === 0)
    return false;
  return true;
}