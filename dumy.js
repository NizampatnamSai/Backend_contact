const forge = require("node-forge");

const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAsBt3SWUS6gfh6/GAjC1h58ICbI2ZJDNsrpEGI3omQ2tijc3E
wIw4rPdBkglxL9fH/uPpCeu+Q2cOBX0ARTetwqHp9ka70/wbAMSKo1rGwrAa1U51
Dbu5Vtm9C4DFVtBoocWULcdoCIrWYcm5UHJ1zsMK4yDLwwYQDd+MKJEjxANGdZiK
gF2aJVtOLuh+z9Qbna7qVUZqexKuSCcXqJJgzGTkNBuuYgaZaOQnWkGNhGoU6Nti
GtdbiMeiAh1ddSfQkQUye9lDywC4xHsiweWqV8/DbqQE9zlZVXg/nJIcJ2/xTcM6
txG4KFQQX54d5B5AGDGaAkMZMtfY1+zCXhRD7wIDAQABAoIBABxfSHAYKxxuSa0o
GuQ6mYfrn1Va2L3W1R8ouTr0/n4lKlsbOCQnUyg2q6c6AzTIiG2dzVkuVFhqnX0v
3t/H8SQmztlBGxiziKwufgGEafpKwf/0pHIieOEvsj/Mrr5mVD0f5lgbxLx/lbtq
cwMtdaJqlPHzwjA45VQ+3Eda3s7Azd5O+xrsG3SBIX+S3iDzQ89L69vGVz3r8LVe
8qaXazbz8DycP6lcInN09se8evyJHHt9lWFab9HX4THrR1Uf+PbAUP0xwIowcRbr
cbtHFFg+xV4qevoZYC58Qi43ltjf4JR4Jbd1WaPun2UuvCEZ0Gu9/oHbqQU+3DUX
LaMdeR0CgYEA3EP+T7mfXyYF8x1wd49kDwNYvaSAx5eH0ZV9q1oFHmc6wKfXRZ3b
Bt+ENq0P/n2YgdP5K2TWqZQ/BM3qNCuGGaZq7lsHruMwngvGicjNSWjO6+VXa+nB
MdkHekCmmPrxwMyL/IOCtmfbStZeX3vDnp+YIK6hcwfcu5vxGSlz/lsCgYEAzK2A
o+JwV/TVN1x6CSvqiHYerAmE6VpkKZxBPPELwTdfYNDoWmwXBDkozJ46Qe+/D/g2
GG3sl1OSlx+Bsx2YA5arMi+dbFHBc/+G3b21pYFTBUP75Fu9FBSlOQx+/5q+3c5J
s6I6Lia8BY/jo2bXDEK6LPGTvCMOL0lbf9XC7P0CgYEA1VXZk3gyfuKB8rU5v+MW
w1+3bH5O6IHAX2LNw8+9k3PiOMSXQOsiP2bvVFGMYy1cL6qR89CIBNj7rHiP9RWO
nXtMqC1spJuQ9BJtqffdtNMZTurjIDbYEqKklmjVsueijNzQXLM3P9oZUEOORibG
EfV7T3Q0FQixZtgjzP4URW8CgYA2j3GhPjVwXOWRcmddloVYhxQ6C/eQNPZKWUrS
sfbONLKKHmYx5GpmR85mbS9ecEhgO2xAKt1MoYyMGGv8kUD6g+ly4Vp3i3ukLlOH
PJD1Y3n8B1lYUFQgzDgW8wvPmzKR8fGXnwEfWFf6q5ak8j8VF5yFaohVOIsJc+ae
Nx9VCQKBgDW5pZ7j4TevftxAma6cjO2JQ0Qb/rF7TzMRxC9dB+DNAQJmYpApfIJO
14HWJdr8tVgP7cv3hkvl1v6yjdhg1MAibgUfa93el/5H0RZ326jB0gM6lFpknmvm
QAOwBUeaygo0xoAeAU0Y+22JjHlZ4mp2Fod3zm7SagPOTwzSJnFz
-----END RSA PRIVATE KEY-----`;

/**
 * Decrypts an encrypted message using the RSA private key.
 * @param {string} encryptedMessage - Base64 encoded encrypted message.
 * @returns {string|null} - Decrypted message or null if decryption fails.
 */
function decryptMessage(encryptedMessage) {
  try {
    if (!encryptedMessage) {
      throw new Error("No encrypted message provided.");
    }

    console.log("📩 Received Encrypted Message:", encryptedMessage);

    // Load the private key
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    // Decode Base64 & decrypt
    const decryptedBytes = privateKey.decrypt(
      forge.util.decode64(encryptedMessage),
      "RSAES-PKCS1-V1_5"
    );
    const decryptedMessage = forge.util.decodeUtf8(decryptedBytes);

    console.log("✅ Decrypted Message:", decryptedMessage);
    return decryptedMessage;
  } catch (error) {
    console.error("❌ Decryption Failed:", error.message);
    return null;
  }
}

// Example Usage
const testEncryptedMessage =
  "diJoHUGoQaRhuXJWCVR8bhfKCxzg9Yzm+VSG8vugXzBSY0cSotWimWtHswkmbVljbUnGecF23MW1SGlylo1Voqf9YegJM+Q2TseozEh5lJgOQyJ3KY/tZwG6j60o+YNLFPocQz/ie5EwPnU+0PCS/sbOVxY+Zqs6uKJbp/MFjcKTIs7QJrph3iWuhZnRCidPgo1MIeEuKQ97aKBr8bipqaWqtV55mq6XzRDZpBEXLdR8IAxiWOIBc8QwnZ40jK8vyGq8AyHSvL6f4IfvyGFeCAPqayZzhAXUInH/R1Pj68Mq9Ijunh+MrFYq3WiBDflxZb9LmiS6Gnz7hl3zmNiHBQ=="; // Replace with actual encrypted message
const result = decryptMessage(testEncryptedMessage);
console.log("🔓 Final Output:", result);
