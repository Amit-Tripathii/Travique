

````markdown
# Travique 🌍

A full-stack travel accommodation platform where users can discover, create, and manage property listings with secure authentication, cloud image uploads, reviews, and interactive maps.

## 🚀 Live Demo

🔗 **[Visit Travique](https://travique-ppcu.onrender.com)**

## ✨ Features

- 🔐 User authentication and authorization
- 🏠 Create, edit, and delete property listings
- 🖼️ Cloud-based image uploads using Cloudinary
- 📍 Location-based listings with Google Maps
- 🗺️ Interactive maps for property locations
- ⭐ Reviews and ratings
- 💬 Flash messages for user feedback
- 🛡️ Secure session management
- ✅ Server-side form validation
- 📱 Responsive user interface
- ☁️ Cloud deployment using Render
- 🗄️ MongoDB Atlas database integration

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap
- EJS
- EJS-Mate

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

### Authentication & Security

- Passport.js
- Passport Local Strategy
- Passport-Local-Mongoose
- Express Session
- Connect-Mongo
- Method Override

### Cloud & APIs

- Cloudinary
- Multer
- Multer-Storage-Cloudinary
- Google Maps API
- Axios

### Validation & Utilities

- Joi
- Connect-Flash
- Dotenv
- Cookie-Parser

---

## 🏗️ Application Architecture

Travique follows an **MVC (Model-View-Controller)** architecture.

```text
                    ┌──────────────────┐
                    │      Client      │
                    │  Browser / User  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Express      │
                    │      Routes     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Controllers    │
                    │ Business Logic   │
                    └───────┬───┬──────┘
                            │   │
                  ┌─────────┘   └──────────┐
                  ▼                        ▼
          ┌──────────────┐         ┌──────────────┐
          │    Models    │         │    Services  │
          │ MongoDB      │         │ Cloudinary   │
          │ / Mongoose   │         │ Google Maps  │
          └──────────────┘         └──────────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │      Views       │
                    │  EJS / Bootstrap │
                    └──────────────────┘
````

---

## 📂 Project Structure

```text
Travique/
│
├── controllers/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│
├── middleware.js
├── cloudConfig.js
├── app.js
├── package.json
└── README.md
```

---

## 🔑 Authentication

Travique uses **Passport.js** for authentication.

Users can:

* Register an account
* Log in securely
* Log out
* Create listings after authentication
* Edit their own listings
* Delete their own listings
* Add and manage reviews

Sessions are stored in MongoDB using **Connect-Mongo**.

---

## 🏠 Listing Management

Authenticated users can create and manage property listings.

Each listing contains:

* Title
* Description
* Price
* Location
* Country
* Property image
* Geographic coordinates
* Owner information
* Reviews

The application supports complete CRUD operations:

```text
Create
  ↓
Read
  ↓
Update
  ↓
Delete
```

---

## 🖼️ Image Uploads

Travique uses **Cloudinary** for property image storage.

The upload flow is:

```text
User
  ↓
Listing Form
  ↓
Multer
  ↓
Cloudinary
  ↓
Image URL + Filename
  ↓
MongoDB
```

This keeps uploaded property images stored separately from the application server.

---

## 📍 Google Maps Integration

Travique uses Google Maps for location-based functionality.

When a listing is created:

```text
Location + Country
        ↓
Google Geocoding API
        ↓
Latitude + Longitude
        ↓
MongoDB
        ↓
Interactive Map
```

The geographic coordinates are stored as GeoJSON:

```js
{
    type: "Point",
    coordinates: [longitude, latitude]
}
```

The application can then display the property's location on an interactive map.

---

## ⭐ Reviews & Ratings

Users can leave reviews on listings.

Reviews include:

* Rating
* Comment
* Author
* Listing reference

Users can also delete their own reviews.

---

## 💬 Flash Messages

Travique uses `connect-flash` to provide feedback after actions such as:

* Successful login
* Successful registration
* Listing creation
* Listing updates
* Listing deletion
* Review submission
* Authentication errors
* Invalid requests

---

## 🔒 Environment Variables

Create a `.env` file in the root directory.

```env
ATLASDB_URL=your_mongodb_connection_url

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_google_maps_server_api_key
```

If your browser-side Google Maps configuration uses a separate key, also add:

```env
MAPS_BROWSER_TOKEN=your_google_maps_browser_api_key
```

### ⚠️ Security

Never commit your `.env` file or expose API credentials publicly.

Make sure `.env` is included in `.gitignore`:

```text
.env
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Amit-Tripathii/Travique.git
```

### 2. Move into the Project

```bash
cd Travique
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file:

```env
ATLASDB_URL=your_mongodb_connection_url
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_google_maps_server_api_key
```

### 5. Start the Application

```bash
node app.js
```

Or, if using Nodemon:

```bash
nodemon app.js
```

The application will run locally at:

```text
http://localhost:8080
```

---

## 📸 Screenshots

### 🏠 Home Page

Add a screenshot of the Travique listings homepage here.

### 🏡 Listing Details

Add a screenshot showing:

* Property details
* Price
* Reviews
* Map

### 🔐 Authentication

Add screenshots of:

* Login
* Registration

### ➕ Create Listing

Add a screenshot of the listing creation form.

---

## ☁️ Deployment

Travique is deployed using:

* **Render** — Application hosting
* **MongoDB Atlas** — Cloud database
* **Cloudinary** — Image storage
* **Google Maps API** — Maps and geocoding

### Production URL

🔗 [https://travique-ppcu.onrender.com](https://travique-ppcu.onrender.com)

---

## 🧪 Development

Run the application locally with:

```bash
npm install
```

```bash
nodemon app.js
```

For production, the application uses the environment-provided `PORT`:

```js
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
```

---

## 🚀 Future Enhancements

Planned improvements include:

* ❤️ Wishlist / Favorites
* 💳 Payment integration
* 🔍 Advanced search and filtering
* 📅 Booking and reservation system
* 📱 Mobile application
* 🔔 Booking notifications
* 👤 Enhanced user profiles
* 🏷️ More property categories
* 📊 Host dashboard and analytics

---

## 👨‍💻 Author

### Amit Tripathi

Computer Science Engineering Student & Software Developer

### Connect With Me

* **GitHub:** [https://github.com/Amit-Tripathii](https://github.com/Amit-Tripathii)
* **LinkedIn:** [https://www.linkedin.com/in/amit-kumar-tripathi-446277310/](https://www.linkedin.com/in/amit-kumar-tripathi-446277310/)

---

## 📄 License

This project was developed for educational and learning purposes.

````
