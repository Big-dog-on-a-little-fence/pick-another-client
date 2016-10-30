import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

const {
  Component,
  computed,
  copy,
  isBlank
} = Ember;

export default Component.extend(RecognizerMixin, {
  classNameBindings: ['styles.tune-picker'],
  recognizers: 'swipe',
  swipeRight(e) {
    this.goToPreviousTune();
  },
  swipeLeft(e) {
    this.goToNextTune();
  },
  tagName: 'vbox',
  init() {
    this._super(...arguments);
    this.set('unplayedTunes', this.get('tunes').slice(0));
    this.set('currentTune', this.get('unplayedTunes').shiftObject());
  },
  unplayedTunes: [],
  playedTunes: [],
  currentTune: null,
  nextTune: computed('unplayedTunes.[]', function() {
    return this.get('unplayedTunes.firstObject.name');
  }),
  previousTune: computed('playedTunes.[]', function() {
    return this.get('playedTunes.lastObject.name');
  }),
  actions: {
    playNextTune() {
      this.goToNextTune();
    },
    playPreviousTune() {
      this.goToPreviousTune();
    }
  },
  goToNextTune() {
    if (isBlank(this.get('unplayedTunes'))) {
      return;
    }

    this.get('playedTunes').pushObject(this.get('currentTune'));
    this.set('currentTune', this.get('unplayedTunes').shiftObject());
  },
  goToPreviousTune() {
    if (isBlank(this.get('playedTunes'))) {
      return;
    }

    this.get('unplayedTunes').unshiftObject(this.get('currentTune'));
    this.set('currentTune', this.get('playedTunes').popObject());
  }
});
