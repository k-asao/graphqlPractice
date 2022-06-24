import * as moment from 'moment-timezone';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import {
  FindOperator,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
  IsNull,
} from 'typeorm';

interface MomentTransformerOptions {
  enableAutoDateTime: boolean;
}
export class MomentTransformer implements ValueTransformer {
  constructor(
    private _options: MomentTransformerOptions = { enableAutoDateTime: false },
  ) {}

  // DB -> Entity
  from(value: Date) {
    if (!value) return value;

    return moment(value).tz('Asia/Tokyo');
  }

  // Entity -> DB
  to(value: moment.Moment) {
    if (value instanceof FindOperator) {
      if (value.type === 'between') {
        return Between(value.value[0].toDate(), value.value[1].toDate());
      } else if (value.type === 'moreThanOrEqual') {
        return MoreThanOrEqual(value.value.toDate());
      } else if (value.type === 'lessThanOrEqual') {
        return LessThanOrEqual(value.value.toDate());
      } else if (value.type === 'isNull') {
        return IsNull();
      }
    }

    if (this._options.enableAutoDateTime) {
      return moment().toDate();
    }

    if (!value) return value;

    return value.toDate();
  }
}
