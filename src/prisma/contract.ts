import { defineContract } from '@prisma/orm-postgres/contract-builder';

export const contract = defineContract({}, ({ field, model, rel }) => {
  const User = model('User', {
    fields: {
      id: field.id.uuidv7String(),
      username: field.text(),
      password: field.text(),
      createdAt: field.temporal.createdAtString()
    },
  });

  const Note = model('Note', {
    fields: {
      id: field.id.uuidv7String(),
      userId: field.uuidString(),
      content: field.text().optional(),
      date: field.temporal.timestamp(),
      createdAt: field.temporal.createdAtString()
    },
  });

  const RefreshToken = model('RefreshToken', {
    fields: {
      id: field.id.uuidv7String(),
      userId: field.uuidString(),
      expireAt: field.temporal.timestamp(),
      createdAt: field.temporal.createdAtString()
    }
  });

  return {
    models: {
      User: User.relations({
        notes: rel.hasMany(Note, { by: 'userId' }),
        tokens: rel.hasMany(RefreshToken, { by: 'userId' })
      }),
      Note: Note.relations({
        user: rel.belongsTo(User, { from: 'userId', to: 'id' }),
      }),
      RefreshToken: RefreshToken.relations({
        user: rel.belongsTo(User, { from: 'userId', to: 'id' }),
      })
    },
  };
});
