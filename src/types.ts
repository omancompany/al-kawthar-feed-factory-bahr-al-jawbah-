export type Language = 'ar' | 'en';

export interface B2BInquiryFormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  businessType: 'trader' | 'distributor' | 'farm' | 'company' | 'other';
  quantity: string;
  message: string;
}

export interface ConsultationFormData {
  fullName: string;
  companyName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  topic: string;
  notes: string;
}
