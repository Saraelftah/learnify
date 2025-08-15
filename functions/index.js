const functions = require("firebase-functions");
const admin = require("firebase-admin");

// تأكد من أنك قمت بتهيئة Firebase Admin SDK في بداية الملف
admin.initializeApp();

// هذه الدالة ستُستدعى من تطبيقك في React
exports.setAdminRole = functions.https.onCall(async (data, context) => {
  // 1. تحقق أن المستخدم الحالي لديه صلاحية 'admin'
  if (context.auth.token.admin !== true) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admins can perform this action."
    );
  }

  // 2. احصل على الـUID من البيانات المرسلة من تطبيقك
  const userUid = data.uid;

  if (!userUid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function requires a UID."
    );
  }

  // 3. استخدم Admin SDK لتعيين صلاحية 'admin' للمستخدم
  try {
    await admin.auth().setCustomUserClaims(userUid, { admin: true });
    return { message: `Success! User ${userUid} now has admin privileges.` };
  } catch (error) {
    console.error("Error setting custom claim:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while setting the admin role."
    );
  }
});
