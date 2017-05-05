export default function() {
  this.transition(
    this.fromRoute('index'),
    this.toRoute('posts'),
    this.use('crossFade'),
    this.reverse('toRight')
  );
}
