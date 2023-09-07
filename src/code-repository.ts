import { PrismaClient } from '@prisma/client';

import { isMainThread, Worker, parentPort, workerData } from 'worker_threads';

import { Code } from './code';
import { db } from './prisma/db';

export class CodeRepository {
  constructor(private codeModel: PrismaClient) {}

  async insert(qtd: number): Promise<any> {
    // await new Promise((resolve, reject) => {
    //   const worker = new Worker(__dirname + '/test-prisma.js', { workerData });
    //   const worker2 = new Worker(__dirname + '/test-prisma.js', { workerData });
    //   worker.once('message', (message) => {
    //     console.log('primeira thread');
    //     return resolve(
    //       this.codeModel.code
    //         .createMany({
    //           data: message.map((item) => {
    //             return {
    //               active: true,
    //               code: item,
    //             };
    //           }),
    //         })
    //         .then((res) => console.log(res))
    //     );
    //   });
    //   worker.on('error', reject);
    //   worker2.once('message', (message) => {
    //     console.log('segunda thread');
    //     return resolve(
    //       this.codeModel.code
    //         .createMany({
    //           data: message.map((item) => {
    //             return {
    //               active: true,
    //               code: item,
    //             };
    //           }),
    //         })
    //         .then((res) => console.log(res))
    //     );
    //   });
    //   worker2.on('error', reject);
    // });
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
