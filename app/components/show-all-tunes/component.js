import Ember from 'ember';
import { animate } from 'liquid-fire';

const {
  Component,
  observer
} = Ember;

export default Component.extend({
  showTunes: true,
  currentTuneChanged: observer('currentTune', function() {
    if (this.get('showTunes')) {
      let container = this.$(`.${this.get('styles.tunes')}`);
      let target = this.$(`#tune${this.get('currentTune.id')}`);
      let offset = target.height() * (-2);

      animate(target, "scroll", {
        container,
        offset,
        duration: 300,
        easing: 'easeInOutExpo'
      });
    }
  }),
  actions: {
    toggleTunes() {
      this.toggleProperty('showTunes');
    }
  }
});
