import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;

/**
 * Encrypts a string using AES-256-GCM encryption
 * @param text - The text to encrypt
 * @param encryptionKey - The encryption key (should be 32 bytes for AES-256)
 * @returns Encrypted string in format: salt:iv:tag:encryptedData (all base64 encoded)
 */
export function encrypt(text: string, encryptionKey: string): string {
  if (!encryptionKey) {
    throw new Error("Encryption key is required");
  }

  // Generate a random salt
  const salt = crypto.randomBytes(SALT_LENGTH);

  // Derive key from encryption key and salt using PBKDF2
  const key = crypto.pbkdf2Sync(
    encryptionKey,
    salt,
    100000, // iterations
    KEY_LENGTH,
    "sha512"
  );

  // Generate a random IV
  const iv = crypto.randomBytes(IV_LENGTH);

  // Create cipher
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  // Encrypt the text
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  // Get the auth tag
  const tag = cipher.getAuthTag();

  // Combine salt:iv:tag:encryptedData
  return [
    salt.toString("base64"),
    iv.toString("base64"),
    tag.toString("base64"),
    encrypted,
  ].join(":");
}

