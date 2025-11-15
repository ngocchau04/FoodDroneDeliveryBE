import { defineType } from 'sanity'

export default defineType({
  name: 'notification',
  title: 'Notification Management',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Notification Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'message',
      type: 'text',
      title: 'Notification Message',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      type: 'string',
      title: 'Notification Type',
      options: {
        list: [
          { title: 'Order Update', value: 'order_update' },
          { title: 'Delivery Update', value: 'delivery_update' },
          { title: 'Payment Update', value: 'payment_update' },
          { title: 'Promotion', value: 'promotion' },
          { title: 'System Alert', value: 'system' },
          { title: 'Weather Alert', value: 'weather' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'recipient',
      type: 'reference',
      title: 'Recipient',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'relatedOrder',
      type: 'reference',
      title: 'Related Order',
      to: [{ type: 'order' }],
    },
    {
      name: 'priority',
      type: 'string',
      title: 'Priority Level',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Normal', value: 'normal' },
          { title: 'High', value: 'high' },
          { title: 'Urgent', value: 'urgent' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isRead',
      type: 'boolean',
      title: 'Is Read',
      initialValue: false,
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'readAt',
      type: 'datetime',
      title: 'Read At',
    },
    {
      name: 'actionUrl',
      type: 'string',
      title: 'Action URL',
    },
    {
      name: 'metadata',
      type: 'object',
      title: 'Metadata',
      fields: [
        {
          name: 'orderId',
          type: 'string',
          title: 'Order ID',
        },
        {
          name: 'estimatedTime',
          type: 'string',
          title: 'Estimated Time',
        },
        {
          name: 'droneId',
          type: 'string',
          title: 'Drone ID',
        },
        {
          name: 'location',
          type: 'string',
          title: 'Location',
        },
        {
          name: 'amount',
          type: 'number',
          title: 'Amount',
        },
        {
          name: 'restaurant',
          type: 'string',
          title: 'Restaurant',
        },
        {
          name: 'promoCode',
          type: 'string',
          title: 'Promo Code',
        },
        {
          name: 'discount',
          type: 'number',
          title: 'Discount',
        },
        {
          name: 'validUntil',
          type: 'datetime',
          title: 'Valid Until',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      priority: 'priority',
      isRead: 'isRead',
      createdAt: 'createdAt',
    },
    prepare(selection) {
      const { title, type, priority, isRead, createdAt } = selection
      const readStatus = isRead ? '✓' : '●'
      return {
        title: `${readStatus} ${title}`,
        subtitle: `${type.toUpperCase()} | ${priority.toUpperCase()} | ${new Date(createdAt).toLocaleDateString()}`,
      }
    },
  },
  orderings: [
    {
      title: 'Created Date (Newest first)',
      name: 'dateDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Priority',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
    {
      title: 'Read Status',
      name: 'readStatus',
      by: [{ field: 'isRead', direction: 'asc' }],
    },
  ],
})
