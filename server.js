const express = require("express");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const path = require("path");
const QRCode = require("qrcode");

dotenv.config();

const app = express();


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ============================================================
// RAZORPAY
// ============================================================

const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_KEY_SECRET

});


// ============================================================
// CREATE PAYMENT ORDER
// ============================================================

app.post("/create-order", async (req, res) => {

    try {

        const amount = Number(req.body.amount);

        if (!amount || amount <= 0) {

            return res.status(400).json({
                success: false,
                message: "Invalid amount"
            });

        }

        const order = await razorpay.orders.create({

            amount: Math.round(amount * 100),

            currency: "INR",

            receipt: `receipt_${Date.now()}`

        });

        console.log(
            "ORDER CREATED:",
            order.id
        );

        res.json({

            success: true,

            order: order

        });

    }

    catch (error) {

        console.error(
            "ORDER ERROR:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Unable to create order",

            error:
                error.error?.description ||
                error.message

        });

    }

});


// ============================================================
// CREATE RAZORPAY QR CODE
// ============================================================

app.post("/create-qr", async (req, res) => {

    try {

        const amount = Number(req.body.amount);

        if (!amount || amount <= 0) {

            return res.status(400).json({

                success: false,

                message: "Invalid amount"

            });

        }


        const qr =
            await razorpay.qrCode.create({

                type: "upi_qr",

                name: "Haproven",

                usage: "single_use",

                fixed_amount: true,

                // ₹101 = 10100 paise

                payment_amount:
                    Math.round(amount * 100),

                description:
                    "Haproven Test Payment",

                close_by:
                    Math.floor(
                        Date.now() / 1000
                    ) + (15 * 60)

            });


        console.log(
            "QR CREATED:",
            qr
        );


        if (!qr.image_content) {

            return res.status(500).json({

                success: false,

                message:
                    "QR image content was not returned."

            });

        }


        // Convert UPI content to an actual QR image

        const qrImage =
            await QRCode.toDataURL(
                qr.image_content,
                {
                    width: 300,
                    margin: 2
                }
            );


        res.json({

            success: true,

            qr: {

                id: qr.id,

                status: qr.status,

                payment_amount:
                    qr.payment_amount,

                image_url:
                    qr.image_url,

                image_content:
                    qr.image_content,

                image_data:
                    qrImage

            }

        });

    }

    catch (error) {

        console.error(
            "QR ERROR:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to create QR code",

            error:
                error.error?.description ||
                error.message

        });

    }

});


// ============================================================
// START SERVER
// ============================================================

const PORT =
    process.env.PORT || 3000;


app.listen(
    PORT,
    () => {

        console.log(
            `Server running at http://localhost:${PORT}`
        );

    }
);