import { queryDatabase } from "../config/db";

export const getInterestRate = async (company_id: string): Promise<number | null> => {
  try {
    const query = `
      SELECT total_interest, fintak_fee_percentage 
      FROM Interest_Charges 
      WHERE company_id = $1 
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    
    const result = await queryDatabase({
      query,
      params: [company_id]
    });

    if (result.rows.length === 0) return null;

    const { total_interest, fintak_fee_percentage } = result.rows[0];

    // Estimación de la tasa de interés anual
    const estimated_annual_interest = (total_interest / 1000) * 12; // Suponiendo base de 1000 en créditos

    return estimated_annual_interest;
  } catch (error) {
    console.error("Error obteniendo tasa de interés:", error);
    return null;
  }
};