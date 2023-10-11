import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { schemaFromExecutor, wrapSchema } from "@graphql-tools/wrap";
import { addMocksToSchema } from "@graphql-tools/mock";
import { createYoga } from "graphql-yoga";

const executor = buildHTTPExecutor({
  endpoint: 'https://anilist.co/graphql'
})

const introspectionSchema = await schemaFromExecutor(executor)

const executableSchema = wrapSchema({schema: introspectionSchema, executor})

const schema = addMocksToSchema({schema: executableSchema})

const yoga = createYoga({schema})

const server = Bun.serve({fetch: yoga})
  
console.info(
  `Server is running on ${new URL(
    yoga.graphqlEndpoint,
    `http://${server.hostname}:${server.port}`
  )}`
)