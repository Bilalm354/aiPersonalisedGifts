export interface Image {
  id: string;
}

export interface PrintifyProductRequest {
  title: string;
  description: string;
  blueprint_id: number;
  print_provider_id: number;
  variants: PrintifyVariantRequest[];
  print_areas: PrintifyPrintAreaRequest[];
}

export interface CreateProductResponse {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  images: ProductImage[];
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  is_printify_express_eligible: boolean;
  is_printify_express_enabled: boolean;
  blueprint_id: number;
  user_id: number;
  shop_id: number;
  print_provider_id: number;
  print_areas: PrintArea[];
  sales_channel_properties: any[]; // Adjust type accordingly
}

export interface ProductOption {
  name: string;
  type: string;
  values: { id: number; title: string }[];
}

export interface ProductVariant {
  id: number;
  sku: string;
  cost: number;
  price: number;
  title: string;
  grams: number;
  is_enabled: boolean;
  is_default: boolean;
  is_available: boolean;
  is_printify_express_eligible: boolean;
  options: number[];
}

export interface ProductImage {
  src: string;
  variant_ids: number[];
  position: string;
  is_default: boolean;
}

export interface PrintArea {
  variant_ids: number[];
  placeholders: Placeholder[];
  background: string;
}

export interface Placeholder {
  position: string;
  images: {
      id: string;
      name: string;
      type: string;
      height: number;
      width: number;
      x: number;
      y: number;
      scale: number;
      angle: number;
  }[];
}

export interface PrintifyVariantRequest {
  id: number;
  price: number;
  is_enabled?: boolean;
}

export interface PrintifyPrintAreaRequest {
  variant_ids: number[];
  placeholders: PrintifyPlaceholderRequest[];
}

export interface PrintifyPlaceholderRequest {
  position: string;
  images: PrintifyImageRequest[];
}

export interface PrintifyImageRequest {
  id: string;
  x: number;
  y: number;
  scale: number;
  angle: number;
}

export interface PrintifyImageResponse { 
  id: string; 
  file_name: string; 
  height: number;
  width: number;
  size: number;
  mime_type: string;
  preview_url: string;
  upload_time: string;
}

export interface RetrieveProductResponse {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  images: ProductImage[];
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  is_printify_express_eligible: boolean;
  is_printify_express_enabled: boolean;
  blueprint_id: number;
  user_id: number;
  shop_id: number;
  print_provider_id: number;
  print_areas: PrintArea[];
  sales_channel_properties: any[]; // Adjust type accordingly
}