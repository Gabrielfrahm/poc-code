import { CodeRepository } from './code-repository';
import { db } from './prisma/db';

describe('code prisma repository integration test', () => {
  let codeRepository: CodeRepository;

  jest.setTimeout(90 * 10000);
  beforeEach(async () => {
    await db.code.deleteMany({ where: {} });
    codeRepository = new CodeRepository(db);
  });

  afterEach(async () => {
    await db.code.deleteMany({ where: {} });
  });

  it('should be able insert a code', async () => {
    await codeRepository.insert(300000);

    console.log(await db.code.count());
  });
});
