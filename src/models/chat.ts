import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  content: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  collection: "chat",
  versionKey: false,
});

export const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);