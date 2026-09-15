import { should } from '@artstesh/it-should';

// A representative slice of the public API, compiled and run against the packed tarball.
const students = [
  { name: 'Bruno', age: 20 },
  { name: 'Amanda', age: 30 },
];

should().array(students).defined().length(2).ordered({ by: (e) => e?.age });
should().array(students).contain(students[0], (e) => e?.name);
should().array([3, 1, 2]).uniq();

should().number(42).positive().inRange(0, 100);
should().string("It should work!.. Shouldn't it? ;)").contains("Shouldn't");
// 'year' accuracy keeps the pair on the same calendar value in any timezone
// (finer accuracies would make the check timezone-dependent: truncation is local).
should().date('2024-05-06T10:00:00.000Z').equals('2024-05-06T22:15:30.000Z', 'year');

should()
  .objects({ id: 1, name: 'a' }, { id: 1, name: 'A' })
  .rule('name', (a, b) => a.toLowerCase() === b.toLowerCase())
  .equal();

should().method(() => JSON.parse('not json')).throws();
const answer = should().method(() => 42).returns();
should().number(answer).equals(42);

should().string(null).not.defined();

// The failure path: a broken chain must throw a ShouldError with the documented message.
let failed = false;
try {
  should().array([2, 1]).ordered();
} catch (e) {
  failed = e instanceof Error && e.message === "Elements aren't ordered.";
}
if (!failed) throw new Error('smoke: expected a failing chain to throw ShouldError');

console.log('smoke ok');
