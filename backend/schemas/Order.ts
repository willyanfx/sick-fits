import { list } from '@keystone-next/keystone/schema';
import {
  integer,
  relationship,
  select,
  text,
  virtual,
} from '@keystone-next/fields';
import formatMoney from '../lib/formatMoney';
import { isSignedIn, rules } from '../access';

export const Order = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: () => false,
    delete: () => false,
  },
  // ui
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver: (item) => formatMoney(item.total),
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    charge: text(),
  },
});
