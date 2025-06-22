# StayFinder

StayFinder is a full-stack web application that enables users to list, browse, and book properties for short-term and long-term stays—similar to popular platforms like Airbnb. It demonstrates a complete end-to-end implementation, covering frontend UI, backend API, authentication, and database integration.

---

## 🚀 Features

* **Browse Listings**: View a grid of property cards with images, location, and pricing.
* **Search & Filters**: Search properties by location, price range, and availability dates.
* **Listing Details**: Detailed page with image carousel, description, and booking calendar.
* **User Authentication**: Sign up, log in (via email/password, Google, and Facebook), and manage sessions.
* **Booking System**: Reserve properties via a bookings endpoint and view reservation status.
* **Host Dashboard**: (Optional) Hosts can create, update, and delete their listings.

---

## 🛠️ Tech Stack

| Layer          | Technology                           |
| -------------- | ------------------------------------ |
| Frontend       | React, Next.js, Tailwind CSS         |
| Backend        | Node.js, Express, Prisma             |
| Database       | MongoDB (Atlas)                      |
| Authentication | NextAuth.js, Google & Facebook OAuth |
| Deployment     | Vercel                               |

---

## 📥 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Pratith544/Stayfinder-assignment.git
   cd Stayfinder-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following keys:

   ```env
   DATABASE_URL=<your-mongodb-connection-string>
   NEXTAUTH_URL=<your-deployed-app-url>

   GOOGLE_CLIENT_ID=<google-client-id>
   GOOGLE_CLIENT_SECRET=<google-client-secret>

   FACEBOOK_CLIENT_ID=<facebook-app-id>
   FACEBOOK_CLIENT_SECRET=<facebook-app-secret>
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Your app should now be running at `http://localhost:3000`.

---

## 🔧 Scripts

* `npm run dev` — Start development server
* `npm run build` — Build for production
* `npm start` — Start production server

---

## 🌐 Deployment

This project is configured for deployment on Vercel. Push your repository to GitHub and link it in your Vercel account. Ensure your environment variables are set in the Vercel dashboard under **Settings → Environment Variables**.

**Live Site**: [https://stayfinder-assignment-r8wh.vercel.app](https://stayfinder-assignment-r8wh.vercel.app)

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with your proposed changes.

---

## 📄 License

This project is licensed under the MIT License.
