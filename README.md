# it-should

### Overview

The basic set of asserts/expected does not have ready-made solutions for many situations, such as determining the ordering of arrays, comparing objects with conditions, and so on. it-should is designed to make it easier to write assertions for situations like this during code testing.

Consider a small example:

We have a certain service that gives a list of students on request. Among the requirements we have the mandatory sorting of the output list.

```typescript
// interface Student {name: string, age: number}
describe('student.service', () => {
   it("getAll ordered", () => {
      let students: Student[] = studentService.getAll();
      //
      should().array(students).ordered({by: e => e?.age});
   });
});
```

If the service fails and returns an unsorted collection, the test will fail, and we will see ```Elements aren't ordered.``` in the console.

Of course, it would be possible to prepare the data by leaving only two records in the returned collection and sorting it in reverse order, and compare only these two records in ```expected```... But all these actions, no matter how primitive and simple they were, create quite an impressive amount of work in a real application. It is for such simplifications that this mini-library is created.

### Warning

At the moment, the project is at the very beginning of its journey and does not have full-fledged functionality, the number (and, hopefully, the quality) of available functions will increase regularly in the near future.

### License

This project is under the MIT license
