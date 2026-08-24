FROM node:20-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy Prisma schema and generate client
COPY backend/prisma ./backend/prisma
RUN cd backend && npx prisma generate

# Copy source code
COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend

EXPOSE 5000

ENV NODE_ENV=production

CMD ["npm", "start"]
