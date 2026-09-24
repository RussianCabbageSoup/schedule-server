import { defineContract } from '@prisma/orm-postgres/contract-builder';

export const contract = defineContract({}, ({ field, model, rel }) => {
  const User = model('User', {
    fields: {
      id: field.id.uuidv7String(),
      username: field.text(),
      password: field.text(),
      createdAt: field.temporal.createdAtString(),
    },
  });

  const Note = model('Note', {
    fields: {
      id: field.id.uuidv7String(),
      content: field.text().optional(),
      userId: field.uuidString(),
      createdAt: field.temporal.createdAtString(),
    },
  });

  return {
    models: {
      User: User.relations({
        notes: rel.hasMany(Note, { by: 'userId' }),
      }),
      Note: Note.relations({
        user: rel.belongsTo(User, { from: 'userId', to: 'id' }),
      }),
    },
  };
});
