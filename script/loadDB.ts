import {DataAPIClient} from "@datastax/astra-db-ts"

//import {PuppeteerWebBaseLoader} from "langchain/document_loaders/web/pupeteer"
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

import OpenAI from "openai"

import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"

import "dotenv/config"
//import { SimilarityMetric } from "@langchain/community/vectorstores/rockset";
//import { SimilarityMetric } from "@langchain/community/vectorstores/rockset";

type SimilarityMetric = "dot_product" | "cosine" | "euclidean" //used to compute the similarity of two vectors

const {ASTRA_DB_NAMESPACE, 
    ASTRA_DB_COLLECTION, 
    ASTRA_DB_API_ENDPOINT, 
    ASTRA_DB_APPLICATION_TOKEN, 
    OPEN_AI_API_KEY
} = process.env //only access values inside .env with process.env because we import "dotenv/config"


const openai = new OpenAI({apiKey: OPEN_AI_API_KEY})

const my_next_app_data = [
    'https://publications.uh.edu/content.php?catoid=52&navoid=20440',
    'https://uh.edu/retention-graduation-initiatives/uhin4/maps/_maps-documents/2024-205/nsm-computer-science,-bs-2024-2025.pdf',
    'https://publications.uh.edu/preview_program.php?catoid=52&poid=17791&returnto=19557'
]

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)

const db = client.db(ASTRA_DB_API_ENDPOINT, {namespace: ASTRA_DB_NAMESPACE})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100
})

const scrapePage = async (url: string): Promise<string> => {
    // Create an instance of PuppeteerWebBaseLoader
    const loader = new PuppeteerWebBaseLoader(url, {
      launchOptions: { headless: true }, // Puppeteer-specific launch options
    });

    // Use the loader to load the content of the page
    const docs = await loader.load();

    // Return the combined content of all loaded documents
    return docs.map((doc) => doc.pageContent).join("\n");
};

const createCollection = async(similarityMetric: SimilarityMetric = "dot_product") => {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 1536,
            metric: similarityMetric
        }
    })

    console.log(res)
}

const loadSampleData = async () => {
    const collection = await db.collection(ASTRA_DB_COLLECTION)
    for await(const url of my_next_app_data){
        const content  = await scrapePage(url)
        const chunks = await splitter.splitText(content)

        for await (const chunk of chunks){
            const embedding = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: chunk,
                encoding_format: "float"
            })
        }

    }
}