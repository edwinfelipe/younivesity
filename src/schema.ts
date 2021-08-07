import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLSchema } from "graphql";
import { join } from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { mergeResolvers } from "@graphql-tools/merge";
import { addResolversToSchema } from "@graphql-tools/schema";

const schemas: GraphQLSchema = loadSchemaSync(
  join(__dirname, "./modules/**/*.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);
const resolvers = loadFilesSync(join(__dirname, "./modules/**/resolvers.*"));

const merged = mergeResolvers(resolvers);

const schema = addResolversToSchema({
  schema: schemas,
  resolvers: merged,
});

export default schema;
