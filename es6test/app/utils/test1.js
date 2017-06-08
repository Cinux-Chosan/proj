export default function test1() {
  function testable(target) {
    target.isTestable = true;
  }

  @testable
  class MyTestableClass {};

  console.log(MyTestableClass.isTestable) // true
}
