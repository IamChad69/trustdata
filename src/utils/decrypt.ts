import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;

/**
 * Decrypts a string that was encrypted using AES-256-GCM encryption
 * @param encryptedData - The encrypted string in format: salt:iv:tag:encryptedData
 * @param encryptionKey - The encryption key used for encryption
 * @returns Decrypted string
 * @throws Error if decryption fails
 */
export function decrypt(
  encryptedData: string,
  encryptionKey: string
): string {
  if (!encryptionKey) {
    throw new Error("Encryption key is required");
  }

  if (!encryptedData) {
    throw new Error("Encrypted data is required");
  }

  try {
    // Split the encrypted data
    const parts = encryptedData.split(":");
    if (parts.length !== 4) {
      throw new Error("Invalid encrypted data format");
    }

    const [saltBase64, ivBase64, tagBase64, encrypted] = parts;

    // Decode from base64
    const salt = Buffer.from(saltBase64, "base64");
    const iv = Buffer.from(ivBase64, "base64");
    const tag = Buffer.from(tagBase64, "base64");

    // Validate lengths
    if (salt.length !== SALT_LENGTH) {
      throw new Error("Invalid salt length");
    }
    if (iv.length !== IV_LENGTH) {
      throw new Error("Invalid IV length");
    }
    if (tag.length !== TAG_LENGTH) {
      throw new Error("Invalid tag length");
    }

    // Derive key from encryption key and salt using PBKDF2
    const key = crypto.pbkdf2Sync(
      encryptionKey,
      salt,
      100000, // iterations (must match encryption)
      KEY_LENGTH,
      "sha512"
    );

    // Create decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    // Decrypt the text
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
    throw new Error("Decryption failed: Unknown error");
  }
}

