export default function(){
  this.transition(
    this.fromRoute('apps.login'),
    this.toRoute('apps.jizhang.edit'),
    this.use('crossFade'),
    this.reverse('toRight')
  )
}
