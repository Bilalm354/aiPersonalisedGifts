import { OpenAI } from "openai";
import { PrintifyImageResponse, PrintifyProductRequest, RetrieveProductResponse } from "@/interfaces/PrintifyTypes";

const PRINTIFY_BASE_URL = 'https://api.printify.com';

export async function POST(req: Request) {
    try {
        const reqJson = await req.json();
        const { text } = reqJson;

        if (!text) {
            console.error('Text is required', { reqJson });
            throw new Error('Text is required');
        }

        const url = await generateImageUrl(text);
        const image = await postImageToPrintify(url, 'generatedImage.png');
        const postedProduct = await createProduct(
            {
                blueprint_id: 145, // Unisex Softstyle T-Shirt
                description: 'A product generated by OpenAI and Printify',
                print_areas: [{
                    variant_ids: [
                        38192 // Black Large -- should make these dynamic
                    ],
                    placeholders: [{
                        position: 'front',
                        images: [{
                            id: image.id,
                            x: 0.5,
                            y: 0.5,
                            scale: 1,
                            angle: 0
                        }]
                    }]
                }], 
                print_provider_id: 270, // Dimona Tee
                title: 'Generated Product',
                variants: [{
                    id: 38192,
                    price: 200,
                }]
            });
        
        publishPrintifyProduct(postedProduct.id)
        console.info({ postedProduct, image, url, reqJson, text });
        return Response.json({url, productId: postedProduct.id});
    } catch (error) {
        console.error(error);
        return Response.error();
    }
}

export async function retrieveAProduct(product_id: string) {
    const endpoint = `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/products/${product_id}.json`;
    const response = await fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        }
    });
    const retrievedProduct = await response.json() as RetrieveProductResponse;
    console.log({product: retrievedProduct});
    return retrievedProduct;
}

export async function publishPrintifyProduct(product_id: string) {
    const endpoint =  `${PRINTIFY_BASE_URL}/v1/shops/${process.env.SHOP_ID}/products/${product_id}/publish.json`;
    const body = JSON.stringify({
        title: true,
        description: true,
        images: true,
        variants: true,
        tags: true,
        keyFeatures: true,
        shipping_template: true
    })
    console.log({endpoint, body})
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        },
        body
    });
    const publishProductResponse = await response.json();
    console.log({publishProductResponse});
}

export async function postImageToPrintify(url: string, fileName: string): Promise<PrintifyImageResponse> {
    const imageRequest = {
        file_name: fileName,
        url: url
    };
    const imageRequestString = JSON.stringify(imageRequest);
    const imageResponse = await fetch(`${PRINTIFY_BASE_URL}/v1/uploads/images.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        },
        body: imageRequestString 
    })

    const imageData: PrintifyImageResponse = await imageResponse.json();
    
    console.info({ imageRequest, imageRequestString, imageData })
    
    return imageData;
}

const generateImageUrl: (prompt: string) => Promise<string> = async (prompt: string) => {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error('API key not found. Please set the OPENAI_API_KEY in your .env file.');
            throw new Error('API key not found');
        }

        const openai = new OpenAI({apiKey});

        const response = await openai.images.generate({
            prompt,
            n: 1, 
            response_format: 'url',
            style: 'natural'
        });

        const url = response.data[0].url!;

        return url;
    } catch (error) {
        console.error('Error generating image:', error);
        throw new Error('Error generating image');
    }
};



async function createProduct({ blueprint_id, description, print_areas, print_provider_id, title, variants}: PrintifyProductRequest ) {
    const productRequest: PrintifyProductRequest = {
        blueprint_id,
        description,
        print_areas,
        print_provider_id,
        title,
        variants
    };
    const productRequestString = JSON.stringify(productRequest);
    console.log({ productRequest, productRequestString });
    
    const productResponse: any = await fetch(`https://api.printify.com/v1/shops/${process.env.SHOP_ID}/products.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PRINTIFY_API_TOKEN}`
        },
        body: productRequestString
    })
    const productData = await productResponse.json();
    console.info({ productData })
    return productData;
}
