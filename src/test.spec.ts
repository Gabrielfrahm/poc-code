import { resolve } from 'path';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

import { CodeRepository } from './code-repository';
import { db } from './prisma/db';

describe('code prisma repository integration test', () => {
  let codeRepository: CodeRepository;

  jest.setTimeout(90 * 10000);
  beforeEach(async () => {
    // await db.code.deleteMany({ where: {} });
    codeRepository = new CodeRepository(db);
  });

  afterEach(async () => {
    // await db.code.deleteMany({ where: {} });
  });

  it('should be able insert a code', async () => {
    // await new Promise((resolve, reject) => {
    //   const worker = new Worker(__dirname + '/test-prisma.js', { workerData });
    //   const worker2 = new Worker(__dirname + '/test-prisma.js', { workerData });
    //   worker.once('message', (message) => {
    //     console.log('primeira thread');
    //     return resolve(
    //       db.code
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
    //       db.code
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

    console.log(await db.code.count());
  });
});
