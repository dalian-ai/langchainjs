import assert from "assert";
import { OpenAI } from "@langchain/openai";
import { LLMChain } from "langchain/chains";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { CallbackManager } from "@langchain/core/callbacks/manager";

// Test exports
assert(typeof OpenAI === "function");
assert(typeof LLMChain === "function");
assert(typeof ChatPromptTemplate === "function");
assert(typeof MemoryVectorStore === "function");
assert(typeof OpenAIEmbeddings === "function");
assert(typeof CallbackManager === "function");

const vs = new MemoryVectorStore(new OpenAIEmbeddings({ openAIApiKey: "sk-XXXX" }));

await vs.addVectors(
  [
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    new Document({
      pageContent: "a",
    }),
    new Document({
      pageContent: "b",
    }),
  ]
);

assert((await vs.similaritySearchVectorWithScore([0, 0, 1], 1)).length === 1);

// Test CSVLoader
const loader = new CSVLoader(new Blob(["a,b,c\n1,2,3\n4,5,6"]));

const docs = await loader.load();

assert(docs.length === 2);
