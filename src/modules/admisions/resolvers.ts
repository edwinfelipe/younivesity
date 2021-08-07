import Student from "../../entity/Student";
import { pick, get, repeat, omitBy, isNil } from "lodash";
import { Between, getRepository } from "typeorm";
import { DateTime } from "luxon";
export const resolvers = {
  Query: {
    getStudents: async (_, { where }) => {
      const repo = getRepository(Student);

      where = omitBy(where, isNil);
      return await repo.find({
        where,
      });
    },

    getStudent: async (_, { id }) => {
      const repo = getRepository(Student);

      return await repo.findOneOrFail(id);
    },
  },
  Mutation: {
    registerStudent: async (_, { data }) => {
      const raw: Student = pick(data, [
        "firstname",
        "middlename",
        "lastname",
        "lastname2",
        "birthDate",
        "",
      ]);
      const repo = getRepository(Student);
      const start = DateTime.fromObject({
        day: 1,
        month: 1,
      });

      const end = DateTime.fromObject({
        day: 31,
        month: 12,
      });

      const lastStudent = (
        await repo.find({
          where: {
            createdAt: Between(start.toSQL(), end.toSQL()),
          },
          order: {
            createdAt: "DESC",
          },
          take: 1,
        })
      )[0];

      const seq = get(lastStudent, "seq", 0) + 1;

      const student = repo.create({
        ...raw,
        seq: seq,
        code: `${
          repeat("0", 5 - seq.toString().length) + seq.toString()
        }${start.year.toString().substring(2)}`,
      });

      return await repo.save(student);
    },
  },
};
