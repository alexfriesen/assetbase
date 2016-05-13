import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Activities = new Mongo.Collection('activities');

