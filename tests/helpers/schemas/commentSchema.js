module.exports = {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
      type: { type: 'string', enum: ['comment'] },
      by: { type: 'string' },
      parent: { type: 'number' },
      text: { type: 'string' },
      kids: {
        type: 'array',
        items: { type: 'number' },
      },
      time: { type: 'number' },
    },
    additionalProperties: true,
  };
  