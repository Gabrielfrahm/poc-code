import { PrismaClient } from '@prisma/client';

import { Code } from './code';

export class CodeRepository {
  constructor(private codeModel: PrismaClient) {}

  async insert(qtd: number): Promise<any> {
    // let code: unknown;
    const allCodes = await this.codeModel.code.findMany({
      select: {
        code: true,
      },
    });
    const codes: string[] = [];
    let sum = 0;

    while (sum < qtd) {
      const code = new Code({
        active: true,
      });

      if (
        !allCodes.some((item) => item.code === code.code) &&
        !codes.some((item) => item === code.code)
      ) {
        codes.push(code.code);
        sum++;
      }
    }

    console.log(codes);
    // while (!test) {
    //   if (allCodes.includes({ code: entity.code })) {
    //     entity.makeCode();
    //     console.log(entity.code);
    //     test = true;
    //     return;
    //   }
    // }
    // const code = await this.codeModel.code.create({
    //   data: {
    //     ...(entity.id && { id: entity.id }),
    //     code: entity.code,
    //     active: entity.active,
    //     groupName: entity.groupName,
    //     responsiblePerson: entity.responsiblePerson,
    //     createdAt: entity.createdAt,
    //     updatedAt: entity.updatedAt,
    //     deletedAt: entity.deletedAt,
    //   },
    // });

    // return code;
  }

  private async _checkCode(code: string): Promise<boolean> {
    const foundCode = await this.codeModel.code.findUnique({
      where: {
        code,
      },
    });

    if (foundCode) {
      return true;
    }

    return false;
  }
}
