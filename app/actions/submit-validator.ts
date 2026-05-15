'use server';

import { supabase } from '@/utils/supabase';

export interface ValidatorData {
    businessType: string;
    customBusinessDescription: string;
    location: string;
    monthlyRevenue: string;
    monthlyCustomers: string;
    revenueConcentration: string;
    buyingPattern: string;
    repeatCustomers: string;
    customerSource: string;
    followUpSystem: string;
    tracking: string;
    fullName: string;
    designation: string;
    email: string;
    phone: string;
    businessVintage: string;
}

export async function submitValidatorAction(data: ValidatorData) {
    // Step 1: Insert into Leads
    const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert([{
            full_name: data.fullName,
            email: data.email,
            phone: data.phone || '',
        }])
        .select()
        .single();

    if (leadError) {
        const msg = `Lead save failed: ${leadError.message} (code: ${leadError.code})`;
        console.error('[HMB] Lead insert failed (Validator):', JSON.stringify(leadError));
        return { success: false, error: msg };
    }

    // Step 2: Insert into the existing `consultations` table to trigger the AI Email Webhook!
    const { data: consultationData, error: consultationError } = await supabase
        .from('consultations')
        .insert([{
            lead_id: leadData.id,
            business_type: data.businessType === 'Other' ? data.customBusinessDescription : data.businessType,
            city: data.location,
            num_customers: data.monthlyCustomers,
            current_revenue: data.monthlyRevenue,
            current_expense: 'Not specified',
            profit_after_tax: 'Not specified',
            short_term_goal: `Business Vintage: ${data.businessVintage}. Revenue Concentration: ${data.revenueConcentration}. Buying Pattern: ${data.buyingPattern}.`,
            long_term_goal: `Repeat Customers: ${data.repeatCustomers}. Customer Source: ${data.customerSource}. Follow-up System: ${data.followUpSystem}. Drop-off Tracking: ${data.tracking}.`
        }])
        .select()
        .single();

    if (consultationError) {
        const msg = `Save failed: ${consultationError.message}`;
        console.error('[HMB] Validator insert failed:', JSON.stringify(consultationError));
        return { success: false, error: msg };
    }

    return { success: true, validatorId: consultationData?.id };
}
