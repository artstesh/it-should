/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    '.*.spec.ts': [
      'ts-jest',
      {
        compiler: 'ts-patch/compiler',
        tsconfig: 'tsconfig.spec.json',
        astTransformers: {
          before: ['@artstesh/forger'],
        },
      },
    ],
  },
};
