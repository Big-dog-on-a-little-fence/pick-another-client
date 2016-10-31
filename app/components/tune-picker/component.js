import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import config from 'pick-another-client/config/environment';

const {
  Component,
  computed,
  isBlank
} = Ember;

export default Component.extend(RecognizerMixin, {
  cableService: Ember.inject.service('cable'),
  classNameBindings: ['styles.tune-picker'],
  recognizers: 'swipe',
  swipeRight() {
    this.goToPreviousTune();
  },
  swipeLeft() {
    this.goToNextTune();
  },
  tagName: 'vbox',
  init() {
    this._super(...arguments);
    let consumer = this.get('cableService').createConsumer(config.wsHost);

    const subscription = consumer.subscriptions.create(
      {
        channel: 'CurrentTuneChannel',
        room: this.get('jamId')
      },
      {
        received: (data) => {
          if (this.get('currentTune.id') === data.currentTuneId) {
            return;
          }

          let tune = this.get('tunes').findBy('id', data.currentTuneId);
          this.goToTune(tune);
        }
      }
    );

    this.set('subscription', subscription);
    this.set('unplayedTunes', this.get('tunes').slice(0));
    this.set('currentTune', this.get('unplayedTunes').shiftObject());
    this.broadcastCurrentTune();
  },
  willDestroyElement() {
    this._super(...arguments);
    this.get('subscription').unsubscribe();
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
  goToNextTune() {
    if (isBlank(this.get('unplayedTunes'))) {
      return;
    }

    this.get('playedTunes').pushObject(this.get('currentTune'));
    this.set('currentTune', this.get('unplayedTunes').shiftObject());
    this.broadcastCurrentTune();
  },
  goToPreviousTune() {
    if (isBlank(this.get('playedTunes'))) {
      return;
    }

    this.get('unplayedTunes').unshiftObject(this.get('currentTune'));
    this.set('currentTune', this.get('playedTunes').popObject());
    this.broadcastCurrentTune();
  },
  goToTune(tune, broadcast) {
    let tunes = this.get('tunes');
    let currentTuneIndex = tunes.indexOf(tune);

    this.set('playedTunes', tunes.slice(0, currentTuneIndex));
    this.set('unplayedTunes', tunes.slice(currentTuneIndex, tunes.get('length')));

    this.set('currentTune', this.get('unplayedTunes').shiftObject());
    if (broadcast) {
      this.broadcastCurrentTune();
    }
  },
  broadcastCurrentTune() {
    this.get('subscription').send({ currentTuneId: this.get('currentTune.id') });
  },
  actions: {
    playNextTune() {
      this.goToNextTune();
    },
    playPreviousTune() {
      this.goToPreviousTune();
    },
    chooseTune(tune) {
      this.goToTune(tune, true);
    }
  }
});
