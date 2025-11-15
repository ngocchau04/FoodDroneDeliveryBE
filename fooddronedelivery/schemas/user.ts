import { defineType } from 'sanity'

export default defineType({
  name: 'user',
  title: 'User Management',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      type: 'string',
      title: 'Full Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email Address',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'role',
      type: 'string',
      title: 'User Role',
      options: {
        list: [
          { title: 'Customer', value: 'customer' },
          { title: 'Restaurant Owner', value: 'restaurant' },
          { title: 'Admin', value: 'admin' },
          { title: 'Drone Operator', value: 'operator' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'addresses',
      type: 'array',
      title: 'Delivery Addresses',
      of: [
        {
          type: 'object',
          title: 'Address',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Address Label',
              description: 'e.g., Home, Office, etc.',
            },
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
              name: 'isDefault',
              type: 'boolean',
              title: 'Default Address',
              initialValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'preferences',
      type: 'object',
      title: 'User Preferences',
      fields: [
        {
          name: 'preferredPayment',
          type: 'string',
          title: 'Preferred Payment Method',
          options: {
            list: [
              { title: 'Credit Card', value: 'card' },
              { title: 'Cash on Delivery', value: 'cod' },
              { title: 'Digital Wallet', value: 'wallet' },
              { title: 'Bank Transfer', value: 'bank' },
            ],
          },
        },
        {
          name: 'notifications',
          type: 'object',
          title: 'Notification Settings',
          fields: [
            {
              name: 'orderUpdates',
              type: 'boolean',
              title: 'Order Status Updates',
              initialValue: true,
            },
            {
              name: 'promotions',
              type: 'boolean',
              title: 'Promotions & Offers',
              initialValue: true,
            },
            {
              name: 'droneTracking',
              type: 'boolean',
              title: 'Drone Tracking Updates',
              initialValue: true,
            },
          ],
        },
      ],
    },
    {
      name: 'isActive',
      type: 'boolean',
      title: 'Active Status',
      initialValue: true,
    },
    {
      name: 'joinDate',
      type: 'datetime',
      title: 'Join Date',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'lastLogin',
      type: 'datetime',
      title: 'Last Login',
    },
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      media: 'avatar',
      role: 'role',
    },
    prepare(selection) {
      const { title, subtitle, media, role } = selection
      return {
        title: title,
        subtitle: `${subtitle} (${role})`,
        media: media,
      }
    },
  },
})
