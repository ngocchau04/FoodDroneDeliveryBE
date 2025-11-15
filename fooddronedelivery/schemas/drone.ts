import { defineType } from 'sanity'

export default defineType({
  name: 'drone',
  title: 'Drone Fleet Management',
  type: 'document',
  fields: [
    {
      name: 'droneId',
      type: 'string',
      title: 'Drone ID',
      description: 'Unique identifier for the drone',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      type: 'string',
      title: 'Drone Name',
      description: 'Friendly name for the drone (e.g., Eagle Swift, Hawk Thunder)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'model',
      type: 'string',
      title: 'Drone Model',
      description: 'Manufacturer and model information',
    },
    {
      name: 'status',
      type: 'string',
      title: 'Current Status',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'In Transit', value: 'in_transit' },
          { title: 'Charging', value: 'charging' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Offline', value: 'offline' },
          { title: 'Emergency Landing', value: 'emergency' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'batteryLevel',
      type: 'number',
      title: 'Battery Level (%)',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 100,
    },
    {
      name: 'currentLocation',
      type: 'geopoint',
      title: 'Current GPS Location',
    },
    {
      name: 'baseStation',
      type: 'geopoint',
      title: 'Base Station Location',
    },
    {
      name: 'maxPayload',
      type: 'number',
      title: 'Maximum Payload (kg)',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'maxRange',
      type: 'number',
      title: 'Maximum Range (km)',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'specifications',
      type: 'object',
      title: 'Drone Specifications',
      fields: [
        {
          name: 'weight',
          type: 'number',
          title: 'Weight (kg)',
          validation: (Rule) => Rule.min(0),
        },
        {
          name: 'maxSpeed',
          type: 'number',
          title: 'Maximum Speed (km/h)',
          validation: (Rule) => Rule.min(0),
        },
        {
          name: 'flightTime',
          type: 'number',
          title: 'Max Flight Time (minutes)',
          validation: (Rule) => Rule.min(0),
        },
        {
          name: 'weatherResistance',
          type: 'string',
          title: 'Weather Resistance Rating',
        },
        {
          name: 'camera',
          type: 'string',
          title: 'Camera Model',
        },
      ],
    },
    {
      name: 'isActive',
      type: 'boolean',
      title: 'Active Status',
      description: 'Is this drone active in the fleet?',
      initialValue: true,
    },
    {
      name: 'lastMaintenance',
      type: 'datetime',
      title: 'Last Maintenance Date',
    },
    {
      name: 'nextMaintenance',
      type: 'datetime',
      title: 'Next Scheduled Maintenance',
    },
    {
      name: 'totalFlightHours',
      type: 'number',
      title: 'Total Flight Hours',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
    },
    {
      name: 'totalDeliveries',
      type: 'number',
      title: 'Total Successful Deliveries',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
    },
    {
      name: 'operator',
      type: 'reference',
      title: 'Assigned Operator',
      to: [{ type: 'user' }],
      description: 'User responsible for this drone',
    },
  ],
  preview: {
    select: {
      name: 'name',
      droneId: 'droneId',
      status: 'status',
      batteryLevel: 'batteryLevel',
    },
    prepare(selection) {
      const { name, droneId, status, batteryLevel } = selection
      return {
        title: `${name} (${droneId})`,
        subtitle: `Status: ${status} | Battery: ${batteryLevel}%`,
      }
    },
  },
  orderings: [
    {
      title: 'Drone Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
    {
      title: 'Battery Level',
      name: 'batteryDesc',
      by: [{ field: 'batteryLevel', direction: 'desc' }],
    },
  ],
})
