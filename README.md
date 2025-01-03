# GOUMKM STORE

Welcome to the UMKM Landing Page project! This platform empowers small and medium enterprises (UMKM) in Semarang to showcase their products, connect with customers, and grow their businesses through innovative features. This README provides an overview of the project, its structure, and setup instructions.

---

## 🌟 Features

### 🔖 User Registration & Product Upload

- **Account Creation**: UMKM can create accounts and manage their profiles.
- **Product Upload**: Businesses can upload products, including images, descriptions, and prices.

### 📂 Product and Store Listings

- **Product Listings**: Display all products uploaded by UMKM with search and filter functionality.
- **Store Listings**: Discover stores in Semarang, complete with contact information and ratings.

### 📞 Contact the Seller

- Integrated messaging system allowing users to contact sellers directly.

### 📚 Learn Section

- Access educational videos to help UMKM improve their business strategies and digital presence.

### 🤖 AI Assistant & Image Generator

- **AI Chat**: A chatbot to assist UMKM with queries related to marketing, business management, and more.
- **AI Image Generator**: Create high-quality visuals for product marketing.

### 🗺️ Map Integration

- Interactive maps to view store locations and navigate easily.

---

## 📂 Project Structure

```
📦 umkm-landingpage
├── 📂 public
├── 📂 src
│   ├── 📂 app
│   ├── 📂 components
│   ├── 📂 styles
│   ├── 📂 utils
│   ├── 📂 services
│   ├── 📂 hooks
├── 📄 .env
├── 📄 README.md
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 next.config.js
```

### Key Directories:

- `public`: Static assets like images and icons.
- `src/app`: App structure following Next.js conventions.
- `src/components`: Reusable UI components.
- `src/styles`: Global and component-specific stylesheets.
- `src/utils`: Utility functions.
- `src/services`: API services.
- `src/hooks`: Custom React hooks.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- A `.env` file with necessary configurations (see below).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ikhwanhsn/go-umkm-new.git
   ```
2. Navigate to the project directory:
   ```bash
   cd go-umkm-new
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_MONGODB_URI=your-mongodb-uri

NEXT_PUBLIC_API_URL=http://localhost:3000

NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-google-client-secret

NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_NEXTAUTH_SECRET=your-random-secret

NEXT_PUBLIC_FIREBASE_APIKEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECTID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APPID=your-firebase-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENTID=your-firebase-measurement-id

NEXT_PUBLIC_ADMIN_1=admin1@example.com
NEXT_PUBLIC_ADMIN_2=admin2@example.com

NEXT_PUBLIC_API_GOOGLE=your-google-api-key
NEXT_PUBLIC_API_PRODIA=your-prodia-api-key
```

### Running the Project

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the project.

Build for production:

```bash
npm run build
```

---

## 🧩 Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend API**: Node.js
- **Database**: MongoDB
- **AI**: Gemini API, Prodia API
- **Maps**: Google Maps

---

## 🤝 Contribution Guidelines

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## 🛠️ Deployment

Deployed on [Vercel](https://vercel.com/) for seamless CI/CD. Follow these steps for deployment:

1. Connect your GitHub repository.
2. Configure environment variables in the Vercel dashboard.
3. Deploy your project.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 👏 Acknowledgements

Special thanks to the Semarang UMKM community for their support and feedback in developing this project.

---

Let’s empower local businesses together! 💪
