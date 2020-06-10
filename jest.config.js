module.exports = {
    roots: ['./server/api','./server/data','./server/auth','./server/images'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    globals:{
      'ts-jest':{
        diagnostics:true,
        tsConfig:{
          esModuleInterop: true  
        }
      }
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}