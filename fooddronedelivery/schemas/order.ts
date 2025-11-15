import { defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Order Management',
  type: 'document',
  fields: [
    {
      name: 'orderId',
      type: 'string',
      title: 'Order ID',
      description: 'Auto-generated order ID (e.g., QB001, QB002)',
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
      name: 'restaurant',
      type: 'reference',
      title: 'Restaurant',
      to: [{ type: 'restaurant' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'items',
      type: 'array',
      title: 'Order Items',
      of: [
        {
          type: 'object',
          title: 'Order Item',
          fields: [
            {
              name: 'dish',
              type: 'reference',
              title: 'Dish',
              to: [{ type: 'dish' }],
            },
            {
              name: 'quantity',
              type: 'number',
              title: 'Quantity',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'unitPrice',
              type: 'number',
              title: 'Unit Price',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'specialInstructions',
              type: 'text',
              title: 'Special Instructions',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'dish.name',
              quantity: 'quantity',
              price: 'unitPrice',
            },
            prepare(selection) {
              const { title, quantity, price } = selection
              return {
                title: title,
                subtitle: `Qty: ${quantity} x $${price}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'deliveryAddress',
      type: 'object',
      title: 'Delivery Address',
      fields: [
        {
          name: 'street',
          type: 'string',
          title: 'Street Address',
        },
        {
          name: 'city',
          type: 'string',
          title: 'City',
        },
        {
          name: 'district',
          type: 'string',
          title: 'District',
        },
        {
          name: 'coordinates',
          type: 'geopoint',
          title: 'GPS Coordinates',
        },
        {
          name: 'contactPhone',
          type: 'string',
          title: 'Contact Phone',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'deliveryNotes',
          type: 'text',
          title: 'Delivery Notes',
          rows: 2,
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      type: 'string',
      title: 'Order Status',
      options: {
        list: [
          { title: 'New Order', value: 'new' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Preparing', value: 'preparing' },
          { title: 'Ready for Pickup', value: 'ready' },
          { title: 'Drone Assigned', value: 'assigned' },
          { title: 'In Transit', value: 'in_transit' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'paymentMethod',
      type: 'string',
      title: 'Payment Method',
      options: {
        list: [
          { title: 'Credit Card', value: 'card' },
          { title: 'Cash on Delivery', value: 'cod' },
          { title: 'Digital Wallet', value: 'wallet' },
          { title: 'Bank Transfer', value: 'bank' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    // Quick pricing fields (for compatibility)
    {
      name: 'totalAmount',
      type: 'number',
      title: 'Total Amount',
      validation: (Rule) => Rule.min(0),
    },
    {
      name: 'finalAmount',
      type: 'number',
      title: 'Final Amount',
      validation: (Rule) => Rule.min(0),
    },
    // Timing fields
    {
      name: 'orderTime',
      type: 'datetime',
      title: 'Order Time',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'estimatedDeliveryTime',
      type: 'datetime',
      title: 'Estimated Delivery Time',
    },
    {
      name: 'actualDeliveryTime',
      type: 'datetime',
      title: 'Actual Delivery Time',
    },
    // Delivery fee field
    {
      name: 'deliveryFee',
      type: 'number',
      title: 'Delivery Fee',
      validation: (Rule) => Rule.min(0),
    },
    {
      name: 'assignedDrone',
      type: 'reference',
      title: 'Assigned Drone',
      to: [{ type: 'drone' }],
    },
    // Drone assignment
    {
      name: 'droneOperator',
      type: 'reference',
      title: 'Drone Operator',
      to: [{ type: 'user' }],
    },
    // Tracking information
    {
      name: 'trackingInfo',
      type: 'object',
      title: 'Tracking Information',
      fields: [
        {
          name: 'pickupTime',
          type: 'datetime',
          title: 'Pickup Time',
        },
        {
          name: 'estimatedArrival',
          type: 'datetime',
          title: 'Estimated Arrival',
        },
        {
          name: 'currentLocation',
          type: 'geopoint',
          title: 'Current Location',
        },
      ],
    },
    // Order completion
    {
      name: 'rating',
      type: 'number',
      title: 'Customer Rating',
      validation: (Rule) => Rule.min(1).max(5),
    },
    {
      name: 'feedback',
      type: 'text',
      title: 'Customer Feedback',
      rows: 3,
    },
    {
      name: 'customerNotes',
      type: 'text',
      title: 'Customer Notes',
      rows: 3,
    },
    {
      name: 'internalNotes',
      type: 'text',
      title: 'Internal Notes',
      description: 'Notes for restaurant/admin only',
      rows: 2,
    },
  ],
  preview: {
    select: {
      orderId: 'orderId',
      customerName: 'customer.fullName',
      status: 'status',
      total: 'finalAmount',
    },
    prepare(selection) {
      const { orderId, customerName, status, total } = selection
      return {
        title: `${orderId} - ${customerName}`,
        subtitle: `Status: ${status} | Total: ${total}`,
      }
    },
  },
  orderings: [
    {
      title: 'Order Date (Newest first)',
      name: 'dateDesc',
      by: [{ field: 'orderTime', direction: 'desc' }],
    },
    {
      title: 'Order ID',
      name: 'orderIdAsc',
      by: [{ field: 'orderId', direction: 'asc' }],
    },
  ],
})
