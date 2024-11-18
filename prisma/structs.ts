import * as s from 'superstruct';
import isEmail from 'is-email';
import isUuid from 'is-uuid';

export const Uuid = s.define('Uuid', value => isUuid.v4(value));
export const Email = s.define('Email', value => isEmail(value));
