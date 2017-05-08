export default function() {
  this.transition(
    this.fromRoute('index'),
    this.toRoute('posts'),
    this.use('crossFade'),
    this.reverse('toRight')
  );
  this.transition(
    this.childOf('#liquid-bind-demo'),
    this.use('toUp'),
    // this.debug()
  );
  this.transition(
    this.fromRoute(null),
    this.toRoute('testnull.test'),
    this.use('toUp'),
    // this.reverse('toDown')
  );
  this.transition(
  this.outletName('main'),
  // this.fromRoute(null),
  this.media('(min-width: 321px) and (max-width: 768px)'),
  this.use('toLeft', { duration: 100, easing: 'easeInOut' }),
  this.reverse('toRight', { duration: 500, easing: 'easeInOut' })
);
}
