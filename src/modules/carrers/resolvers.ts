import { pick, omitBy, isNil } from "lodash";
import { getRepository } from "typeorm";
import { Carrer } from "../../entity/Carrer";

export const resolvers = {
  Query: {
    getCarrers: async (_, { where }) => {
      const repo = getRepository(Carrer);

      where = omitBy(where, isNil);
      return await repo.find({
        where,
      });
    },

    getCarrer: async (_, { id }) => {
      const repo = getRepository(Carrer);

      return await repo.findOneOrFail(id);
    },
  },

  Mutation: {
    createCarrer: async (_, { data }) => {
      const raw: Carrer = pick(data, ["name"]);
      const repo = getRepository(Carrer);
      const carrer = repo.create(raw);

      return await repo.save(carrer);
    },
  },
};
