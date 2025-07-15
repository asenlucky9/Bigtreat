# Big Treat Unique Centre Nigeria Ltd

A professional full-stack web application for Big Treat Unique Centre Nigeria Ltd, offering event planning, decoration, makeup, bead making, and hair styling services in Benin City, Edo State.

## 🎯 Features

### For Customers
- **Service Browsing**: Explore all available services with detailed descriptions and pricing
- **Online Booking**: Book appointments for services with date and time selection
- **User Authentication**: Secure registration and login system
- **Personal Dashboard**: View booking history and manage appointments
- **Gallery**: Browse portfolio of past work and projects
- **Contact Form**: Easy communication with the business

### For Business Owners
- **Admin Dashboard**: Manage bookings, services, and customer inquiries
- **Service Management**: Add, edit, and remove services
- **Gallery Management**: Upload and organize portfolio images
- **Booking Management**: View and update booking statuses
- **Customer Management**: Access customer information and history

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Firebase Admin SDK** - Backend services
- **Firestore** - NoSQL database
- **Firebase Auth** - Authentication
- **Firebase Storage** - File storage

### Infrastructure
- **Firebase** - Backend as a Service
- **Firebase Hosting** - Static hosting
- **Firebase Functions** - Serverless functions (optional)

## 📁 Project Structure

```
big-treat-unique-centre/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd big-treat-unique-centre
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore database
5. Enable Storage
6. Get your Firebase configuration

#### Download Service Account Key
1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save the JSON file as `server/config/firebase-service-account.json`

### 3. Environment Variables

#### Backend (.env)
Create `server/.env` file:
```env
PORT=5000
NODE_ENV=development
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
CLIENT_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-here
```

#### Frontend (.env)
Create `client/.env` file:
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 4. Install Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

### 5. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

## 📱 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run install-all` - Install dependencies for all packages
- `npm run build` - Build frontend for production

### Backend (server/)
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend (client/)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/category/:category` - Get services by category
- `POST /api/services` - Create new service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PATCH /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/category/:category` - Get gallery by category
- `POST /api/gallery` - Add gallery item (Admin)
- `PUT /api/gallery/:id` - Update gallery item (Admin)
- `DELETE /api/gallery/:id` - Delete gallery item (Admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin)
- `PATCH /api/contact/:id/status` - Update contact status (Admin)

## 🎨 Customization

### Branding
- Update colors in `client/tailwind.config.js`
- Modify logo and branding in components
- Update business information in footer and contact sections

### Services
- Add/remove services in the services array
- Update service categories and descriptions
- Modify pricing and availability

### Styling
- Customize CSS in `client/src/index.css`
- Update Tailwind classes for different themes
- Modify animations and transitions

## 🚀 Deployment

### Frontend (Firebase Hosting)
```bash
cd client
npm run build
firebase deploy --only hosting
```

### Backend (Firebase Functions or Vercel)
```bash
cd server
npm run build
# Deploy to your preferred platform
```

## 📞 Contact Information

**Big Treat Unique Centre Nigeria Ltd**
- **Address**: No 1 Upper Lawani Road, By New Benin Market, Benin City, Edo State, Nigeria
- **Phone**: +234 XXX XXX XXXX
- **Email**: info@bigtreatunique.com
- **Hours**: Monday - Saturday, 8:00 AM - 6:00 PM

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Firebase for backend services
- React community for excellent tools and libraries
- Tailwind CSS for the utility-first approach
- All contributors and supporters

---

**Made with ❤️ for Big Treat Unique Centre Nigeria Ltd** 