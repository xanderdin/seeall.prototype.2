import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';

export const History = new Mongo.Collection('history');


History.helpers({

  date() {
    return moment(this.createdAt).format('YYYY-MM-DD');
  },

  time() {
    return moment(this.createdAt).format('HH:mm:ss');
  }
});
