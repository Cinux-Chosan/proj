export function initialize(application) {
  application.inject('component', 'appController', 'controller:application');
}

export default {
  name: 'controller-inject',
  initialize
};
