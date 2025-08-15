const admin = require("firebase-admin");
const serviceAccount =
 require("./learnify-1d003-firebase-adminsdk-fbsvc-d6cd2fe3bd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const adminUid = "xTweFJyHZBfluUvw3kLYeeBJHQm1"; // <-- Paste your UID here

admin.auth().setCustomUserClaims(adminUid, { admin: true })
    .then(() => {
      console.log("Admin custom claim set successfully.");
      process.exit(); // Exit the script after a successful run
    })
    .catch((error) => {
      console.error("Error setting custom claim:", error);
      process.exit();
    });