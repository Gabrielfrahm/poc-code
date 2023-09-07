const { PrismaClient } = require('@prisma/client')
const parentPort = require('node:worker_threads').parentPort

generateCode()
async function generateCode () {
  const codes = [];
  let sum = 0;
  const prisma = new PrismaClient()
   const allCodes = await prisma.code.findMany({
      select: {
        code: true,
      },
    });


     while (sum < 10000) {
      const code = makeCode()

      if (
        !allCodes.some((item) => item.code === code) &&
        !codes.some((item) => item === code)
      ) {
        codes.push(code);
        sum++;
      }
    }
    // await prisma.code.createMany({
    //   data: codes.map((item) => {
    //     return {
    //       active: true,
    //       code: item,
    //     };
    //   }),
    // });
    parentPort.postMessage(codes)
}


function makeCode() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let letters = '';

  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * alphabet.length);

    letters += alphabet.charAt(idx);
  }

  const numbers = '0123456789';
  let number = '';

  while (number.length < 4) {
    const digito = numbers.charAt(Math.floor(Math.random() * numbers.length));

    if (!number.includes(digito)) {
      number += digito;
    }
  }

  const code = letters + number;

  return code;
}
