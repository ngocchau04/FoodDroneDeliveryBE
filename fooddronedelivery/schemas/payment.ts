import { defineType } from 'sanity'

export default defineType({
  name: 'payment',
  title: 'Payment Management',
  type: 'document',
  fields: [
    {
      name: 'paymentId',
      type: 'string',
      title: 'Payment ID',
      description: 'Unique payment transaction ID',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      type: 'reference',
      title: 'Related Order',
      to: [{ type: 'order' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customer',
      type: 'reference',
      title: 'Customer',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'amount',
      type: 'number',
      title: 'Payment Amount',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'method',
      type: 'string',
      title: 'Payment Method',
      options: {
        list: [
          { title: 'Credit Card', value: 'card' },
          { title: 'Cash on Delivery', value: 'cod' },
          { title: 'Digital Wallet', value: 'wallet' },
          { title: 'Bank Transfer', value: 'bank' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      type: 'string',
      title: 'Payment Status',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Completed', value: 'completed' },
          { title: 'Failed', value: 'failed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Refunded', value: 'refunded' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'currency',
      type: 'string',
      title: 'Currency',
      options: {
        list: [
          { title: 'VND - Vietnamese Dong', value: 'VND' },
          { title: 'USD - US Dollar', value: 'USD' },
        ],
      },
      initialValue: 'VND',
    },
    {
      name: 'transactionDetails',
      type: 'object',
      title: 'Transaction Details',
      fields: [
        {
          name: 'cardType',
          type: 'string',
          title: 'Card Type',
        },
        {
          name: 'cardLastFour',
          type: 'string',
          title: 'Last 4 Digits',
        },
        {
          name: 'authorizationCode',
          type: 'string',
          title: 'Authorization Code',
        },
        {
          name: 'gatewayTransactionId',
          type: 'string',
          title: 'Gateway Transaction ID',
        },
        {
          name: 'processorResponse',
          type: 'string',
          title: 'Processor Response',
        },
        {
          name: 'codCollectorId',
          type: 'string',
          title: 'COD Collector ID',
        },
        {
          name: 'expectedCollectionTime',
          type: 'datetime',
          title: 'Expected Collection Time',
        },
        {
          name: 'walletProvider',
          type: 'string',
          title: 'Wallet Provider',
        },
        {
          name: 'walletTransactionId',
          type: 'string',
          title: 'Wallet Transaction ID',
        },
        {
          name: 'walletBalance',
          type: 'number',
          title: 'Wallet Balance',
        },
        {
          name: 'bankName',
          type: 'string',
          title: 'Bank Name',
        },
        {
          name: 'accountNumber',
          type: 'string',
          title: 'Account Number',
        },
        {
          name: 'transferReference',
          type: 'string',
          title: 'Transfer Reference',
        },
        {
          name: 'bankTransactionId',
          type: 'string',
          title: 'Bank Transaction ID',
        },
      ],
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'processedAt',
      type: 'datetime',
      title: 'Processed At',
    },
    {
      name: 'failureReason',
      type: 'string',
      title: 'Failure Reason',
    },
    {
      name: 'refundAmount',
      type: 'number',
      title: 'Refund Amount',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
    },
    {
      name: 'fees',
      type: 'object',
      title: 'Fees',
      fields: [
        {
          name: 'processingFee',
          type: 'number',
          title: 'Processing Fee',
          validation: (Rule) => Rule.min(0),
        },
        {
          name: 'platformFee',
          type: 'number',
          title: 'Platform Fee',
          validation: (Rule) => Rule.min(0),
        },
      ],
    },
  ],
  preview: {
    select: {
      paymentId: 'paymentId',
      status: 'status',
      amount: 'amount',
      currency: 'currency',
      method: 'method',
    },
    prepare(selection) {
      const { paymentId, status, amount, currency, method } = selection
      return {
        title: `${paymentId}`,
        subtitle: `${status.toUpperCase()} | ${method.toUpperCase()} | ${amount} ${currency}`,
      }
    },
  },
  orderings: [
    {
      title: 'Payment Date (Newest first)',
      name: 'dateDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Payment Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
    {
      title: 'Amount (Highest first)',
      name: 'amountDesc',
      by: [{ field: 'amount', direction: 'desc' }],
    },
  ],
})
