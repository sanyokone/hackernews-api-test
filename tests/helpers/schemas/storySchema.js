module.exports = {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' },
      type: { type: 'string', enum: ['story'] },
      by: { type: 'string' },
      time: { type: 'number' },
      title: { type: 'string' },
      url: { type: 'string' },
      text: { type: 'string' }, 
      kids: {
        type: 'array',
        items: { type: 'number' },
      },
      descendants: { type: 'number' },
    },
    additionalProperties: true, // allow extra fields by default
  };
  