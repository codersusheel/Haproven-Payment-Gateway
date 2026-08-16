console.log("HAPROVEN PAYMENT SCRIPT LOADED");


// ============================================================
// ELEMENTS
// ============================================================

const payButton =
    document.getElementById("pay-button");

const paymentStatus =
    document.getElementById("payment-status");


// ============================================================
// PAYMENT AMOUNT
// ============================================================

const amount = 101;


// ============================================================
// RAZORPAY TEST KEY ID
// ============================================================
// यहाँ केवल TEST KEY ID डालनी है.
// Secret नहीं डालना है.

const RAZORPAY_KEY_ID = "your_test_key_id";



// ============================================================
// PAY BUTTON
// ============================================================

if (!payButton) {

    console.error(
        "Pay button not found."
    );

}
else {

    payButton.addEventListener(
        "click",
        startPayment
    );

}


// ============================================================
// START PAYMENT
// ============================================================

async function startPayment() {

    payButton.disabled = true;

    paymentStatus.textContent =
        "Creating payment order...";


    // ========================================================
    // CREATE QR
    // ========================================================

    createQRCode(amount);


    try {

        const response =
            await fetch(
                "/create-order",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            amount: amount
                        })

                }
            );


        const data =
            await response.json();


        console.log(
            "ORDER RESPONSE:",
            data
        );


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(

                data.error ||
                data.message ||
                "Unable to create order"

            );

        }


        const order =
            data.order;


        // ====================================================
        // RAZORPAY CHECKOUT
        // ====================================================

        const options = {

            key:
                RAZORPAY_KEY_ID,

            amount:
                order.amount,

            currency:
                order.currency,

            name:
                "Haproven",

            description:
                "Test Payment",

            order_id:
                order.id,


            handler:
                function (response) {

                    console.log(
                        "PAYMENT RESPONSE:",
                        response
                    );


                    paymentStatus.textContent =
                        "Payment successful! Payment ID: " +
                        response.razorpay_payment_id;


                    payButton.disabled =
                        false;

                },


            modal: {

                ondismiss:
                    function () {

                        paymentStatus.textContent =
                            "Payment window closed.";

                        payButton.disabled =
                            false;

                    }

            },


            theme: {

                color:
                    "#111111"

            }

        };


        const razorpay =
            new Razorpay(options);


        razorpay.on(
            "payment.failed",
            function (response) {

                console.error(
                    "PAYMENT FAILED:",
                    response.error
                );


                paymentStatus.textContent =
                    "Payment failed. Please try again.";


                payButton.disabled =
                    false;

            }
        );


        razorpay.open();

    }

    catch (error) {

        console.error(
            "PAYMENT ERROR:",
            error
        );


        paymentStatus.textContent =
            error.message ||
            "Something went wrong.";


        payButton.disabled =
            false;

    }

}


// ============================================================
// CREATE QR CODE
// ============================================================

async function createQRCode(amount) {

    const qrSection =
        document.getElementById(
            "qr-section"
        );

    const qrImage =
        document.getElementById(
            "qr-image"
        );

    const qrStatus =
        document.getElementById(
            "qr-status"
        );


    if (
        !qrSection ||
        !qrImage ||
        !qrStatus
    ) {

        console.error(
            "QR HTML elements not found."
        );

        return;

    }


    qrSection.style.display =
        "block";


    qrStatus.textContent =
        "Generating QR code...";


    qrImage.style.display =
        "none";


    try {

        const response =
            await fetch(
                "/create-qr",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            amount: amount
                        })

                }
            );


        const data =
            await response.json();


        console.log(
            "QR RESPONSE:",
            data
        );


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(

                data.error ||
                data.message ||
                "QR creation failed"

            );

        }


        const qr =
            data.qr;


        if (
            qr &&
            qr.image_data
        ) {

            qrImage.src =
                qr.image_data;


            qrImage.style.display =
                "block";


            qrStatus.textContent =
                "Scan this QR code to pay ₹" +
                amount;

        }

        else {

            throw new Error(
                "QR image was not generated."
            );

        }


        console.log(
            "QR ID:",
            qr.id
        );


        console.log(
            "QR STATUS:",
            qr.status
        );

    }

    catch (error) {

        console.error(
            "QR ERROR:",
            error
        );


        qrStatus.textContent =
            error.message ||
            "Unable to generate QR code.";

    }

}