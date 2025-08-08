# 🚀 Card Upgrade Study Case (Next.js + MongoDB)

This project is an HTML5 web application where users can upgrade their cards by clicking on them. Each click increases the card’s progress bar and consumes energy. Energy is limited and automatically regenerates over time.
---

## 📌 Features

- ✅ 10 cards are created per user.
- ✅ Each card has a level between 1 and 3.
- ✅ Users can upgrade cards using progress buttons.
- ✅ Each click increases card progress and consumes energy.
- ✅ Energy regenerates at a rate of 1 unit per minute.
- ✅ When a card’s progress reaches 100%, the Level Up button becomes active.
- ✅ The maximum card level is 3.
- ✅ All data is stored in a MongoDB database.

---

## ⚙️ Tech Stack

- **Next.js 13+ (App Router)**
- **TypeScript**
- **MongoDB & Mongoose**
- **Tailwind CSS**<
- **Axios**

---

## 🗂️ Environment Variables (`.env.local`)

Create a `.env.local` file in the project root directory and add your MongoDB connection string:

MONGODB_URI=<mongodb_connection_string>

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kuyucucaner/card-upgrade-app
cd card-upgrade-app
npm install 
npm run dev 
