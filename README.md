# Haproven Payment Gateway

A Razorpay-based payment gateway project developed for Haproven, supporting **Razorpay Checkout** and **UPI QR payments** in Test Mode.

## 🚀 Features

- Razorpay Test Mode
- Razorpay Checkout
- Payment Order Creation
- UPI QR Code Generation
- Test Payment
- Express.js Backend
- Environment Variable Configuration
- Local Development Server

## 🛠️ Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Razorpay
- QRCode
- dotenv

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/codersusheel/Haproven-Payment-Gateway.git
```

### 2. Open the Project Directory

```bash
cd Haproven-Payment-Gateway
```

### 3. Install Dependencies

```bash
npm install
```

---

## 🔐 Razorpay Configuration

This project uses **Razorpay Test Mode**.

You need your own Razorpay Test API credentials:

- Test Key ID
- Test Key Secret

### 4. Create the `.env` File

Create a file named:

```text
.env
```

in the root directory of the project.

Your project should look like:

```text
Haproven-Payment-Gateway/
├── .env
├── server.js
├── package.json
└── public/
```

### 5. Add Razorpay Credentials

Inside `.env`, add:

```env
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
PORT=3000
```

Replace:

```text
your_test_key_id
```

with your Razorpay Test Key ID.

Replace:

```text
your_test_key_secret
```

with your Razorpay Test Key Secret.

### ⚠️ Security

**Never upload your `.env` file to GitHub.**

Your `.env` contains your private Razorpay credentials.

Make sure `.gitignore` contains:

```gitignore
.env
node_modules/
```

Never put your Razorpay Key Secret inside:

- `server.js`
- `script.js`
- `index.html`
- `README.md`

---

## ▶️ Run the Project

After installing dependencies and configuring `.env`, start the server:

```bash
node server.js
```

If everything is configured correctly, you should see:

```text
Server running at http://localhost:3000
```

---

## 🌐 Open the Payment Page

Open your browser and visit:

```text
http://localhost:3000
```

Do **not** open `index.html` directly using `file://`.

The Node.js server must be running.

---

## 💳 Test Payment

The current test payment amount is:

```text
₹101
```

The payment page contains:

```text
Pay ₹101
```

Clicking the button will:

1. Create a Razorpay payment order.
2. Open Razorpay Checkout.
3. Generate a UPI QR code.
4. Display the QR code on the page.
5. Allow testing of the payment flow.

> This project is currently configured for Razorpay Test Mode.

---

## 📱 UPI QR Payment

The application creates a Razorpay UPI QR code dynamically.

The process is:

```text
Pay ₹101
     ↓
Create Razorpay Order
     ↓
Create UPI QR
     ↓
Generate QR Image
     ↓
Display QR Code
```

---

## 📁 Project Structure

```text
Haproven-Payment-Gateway/
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

> `.env` is shown in the structure for explanation only. It must not be committed to GitHub.

---

## 📂 Important Files

### `server.js`

Node.js backend responsible for:

- Razorpay configuration
- Creating payment orders
- Creating UPI QR codes
- Serving the frontend
- Handling API requests

### `public/index.html`

Contains the payment page interface.

### `public/script.js`

Handles:

- Pay button
- Razorpay Checkout
- Payment status
- QR code generation
- Frontend API requests

### `public/style.css`

Contains the website styling.

### `.env`

Stores private Razorpay credentials.

### `package.json`

Contains project information, scripts and dependencies.

---

## 🔌 API Endpoints

### Create Payment Order

```http
POST /create-order
```

Example request:

```json
{
  "amount": 101
}
```

### Create QR Code

```http
POST /create-qr
```

Example request:

```json
{
  "amount": 101
}
```

---

## 💰 Payment Amount

The current amount is:

```text
₹101
```

Razorpay uses paise as the smallest currency unit.

Therefore:

```text
₹101 × 100 = 10100 paise
```

The backend uses:

```javascript
Math.round(amount * 100)
```

---

## 🧪 Test Mode

This project is intended for:

- Development
- Learning
- Razorpay integration testing
- Local payment testing

Use **Razorpay Test Mode credentials**.

Do not use production credentials for this demo.

---

## 🧰 Useful Commands

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

Check Node.js:

```bash
node -v
```

Check npm:

```bash
npm -v
```

Stop the server:

```text
Ctrl + C
```

---

## 🐛 Troubleshooting

### `node is not recognized`

Check whether Node.js is installed:

```bash
node -v
```

If it is not installed, install Node.js and reopen your terminal.

### `Cannot find module 'server.js'`

Make sure you are inside the project directory:

```bash
cd Haproven-Payment-Gateway
```

Then run:

```bash
node server.js
```

### `key_id or oauthToken is mandatory`

Check your `.env` file:

```env
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
PORT=3000
```

Then restart the server.

### `Authentication failed`

Check:

- Razorpay Key ID
- Razorpay Key Secret
- Razorpay Test Mode
- `.env` file location

After changing `.env`, restart:

```bash
node server.js
```

### Payment button does not work

Open browser Developer Tools:

```text
F12 → Console
```

Check for JavaScript errors.

Also make sure the server is running:

```text
http://localhost:3000
```

---

## 🔒 Production Warning

This project is currently intended for **Test Mode and development**.

Before using it for real payments, additional security measures should be implemented, including:

- Payment signature verification
- Server-side payment verification
- Razorpay webhooks
- Payment database records
- HTTPS
- Proper authentication
- Input validation
- Production Razorpay credentials
- Error logging and monitoring

This demo should **not be considered production-ready** without these additional measures.

---

## 👨‍💻 Developer

**Haproven**

GitHub:

https://github.com/codersusheel

---

## 📄 License

This project is intended for educational, development and testing purposes.
