import mongoose from "mongoose";

export const dbConnection = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in environment variables.");
  }
  if (mongoUri.includes("<") || mongoUri.includes(">")) {
    throw new Error(
      'MONGO_URI must not contain < or > around the password. Use: mongodb+srv://USER:PASSWORD@host/... (encode special chars in PASSWORD, e.g. @ as %40).'
    );
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM_DEPLOYED",
      serverSelectionTimeoutMS: 15000,
    });
  } catch (e) {
    const msg = e?.message || String(e);
    if (/bad auth|authentication failed/i.test(msg)) {
      throw new Error(
        "MongoDB rejected username/password. In Atlas: Database Access → reset the DB user password → paste into MONGO_URI with NO angle brackets. If the password contains @ # : / ? encode them (e.g. @ → %40)."
      );
    }
    throw e;
  }

  console.log("Connected to database!");
};
