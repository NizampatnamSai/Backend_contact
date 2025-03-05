const express = require("express");
const forge = require("node-forge");

const app = express();
const port = 3000;

app.use(express.json());

// Backend's Private Key (used for matching)
// const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
// MIIEowIBAAKCAQEAsBt3SWUS6gfh6/GAjC1h58ICbI2ZJDNsrpEGI3omQ2tijc3E
// wIw4rPdBkglxL9fH/uPpCeu+Q2cOBX0ARTetwqHp9ka70/wbAMSKo1rGwrAa1U51
// Dbu5Vtm9C4DFVtBoocWULcdoCIrWYcm5UHJ1zsMK4yDLwwYQDd+MKJEjxANGdZiK
// gF2aJVtOLuh+z9Qbna7qVUZqexKuSCcXqJJgzGTkNBuuYgaZaOQnWkGNhGoU6Nti
// GtdbiMeiAh1ddSfQkQUye9lDywC4xHsiweWqV8/DbqQE9zlZVXg/nJIcJ2/xTcM6
// txG4KFQQX54d5B5AGDGaAkMZMtfY1+zCXhRD7wIDAQABAoIBABxfSHAYKxxuSa0o
// GuQ6mYfrn1Va2L3W1R8ouTr0/n4lKlsbOCQnUyg2q6c6AzTIiG2dzVkuVFhqnX0v
// 3t/H8SQmztlBGxiziKwufgGEafpKwf/0pHIieOEvsj/Mrr5mVD0f5lgbxLx/lbtq
// cwMtdaJqlPHzwjA45VQ+3Eda3s7Azd5O+xrsG3SBIX+S3iDzQ89L69vGVz3r8LVe
// 8qaXazbz8DycP6lcInN09se8evyJHHt9lWFab9HX4THrR1Uf+PbAUP0xwIowcRbr
// cbtHFFg+xV4qevoZYC58Qi43ltjf4JR4Jbd1WaPun2UuvCEZ0Gu9/oHbqQU+3DUX
// LaMdeR0CgYEA3EP+T7mfXyYF8x1wd49kDwNYvaSAx5eH0ZV9q1oFHmc6wKfXRZ3b
// Bt+ENq0P/n2YgdP5K2TWqZQ/BM3qNCuGGaZq7lsHruMwngvGicjNSWjO6+VXa+nB
// MdkHekCmmPrxwMyL/IOCtmfbStZeX3vDnp+YIK6hcwfcu5vxGSlz/lsCgYEAzK2A
// o+JwV/TVN1x6CSvqiHYerAmE6VpkKZxBPPELwTdfYNDoWmwXBDkozJ46Qe+/D/g2
// GG3sl1OSlx+Bsx2YA5arMi+dbFHBc/+G3b21pYFTBUP75Fu9FBSlOQx+/5q+3c5J
// s6I6Lia8BY/jo2bXDEK6LPGTvCMOL0lbf9XC7P0CgYEA1VXZk3gyfuKB8rU5v+MW
// w1+3bH5O6IHAX2LNw8+9k3PiOMSXQOsiP2bvVFGMYy1cL6qR89CIBNj7rHiP9RWO
// nXtMqC1spJuQ9BJtqffdtNMZTurjIDbYEqKklmjVsueijNzQXLM3P9oZUEOORibG
// EfV7T3Q0FQixZtgjzP4URW8CgYA2j3GhPjVwXOWRcmddloVYhxQ6C/eQNPZKWUrS
// sfbONLKKHmYx5GpmR85mbS9ecEhgO2xAKt1MoYyMGGv8kUD6g+ly4Vp3i3ukLlOH
// PJD1Y3n8B1lYUFQgzDgW8wvPmzKR8fGXnwEfWFf6q5ak8j8VF5yFaohVOIsJc+ae
// Nx9VCQKBgDW5pZ7j4TevftxAma6cjO2JQ0Qb/rF7TzMRxC9dB+DNAQJmYpApfIJO
// 14HWJdr8tVgP7cv3hkvl1v6yjdhg1MAibgUfa93el/5H0RZ326jB0gM6lFpknmvm
// QAOwBUeaygo0xoAeAU0Y+22JjHlZ4mp2Fod3zm7SagPOTwzSJnFz
// -----END RSA PRIVATE KEY-----`;

app.post("/verify-key", (req, res) => {
  // const { base64PublicKey } = req.body;
  const base64PublicKey = req.headers["encrypted-public-key"];

  if (!base64PublicKey) {
    return res
      .status(400)
      .json({ error: "Base64 encoded public key is required" });
  }

  try {
    // Decode Base64 to PEM
    const decodedPublicKeyPem = Buffer.from(base64PublicKey, "base64").toString(
      "utf-8"
    );

    // Convert to Forge public key
    const publicKey = forge.pki.publicKeyFromPem(decodedPublicKeyPem);
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    // Extract and compare key components
    if (
      publicKey.n.compareTo(privateKey.n) === 0 &&
      publicKey.e.compareTo(privateKey.e) === 0
    ) {
      return res.json({
        success: true,
        message: "✅ Public Key Matches Private Key!",
      });
    } else {
      return res.json({
        success: false,
        message: "❌ Public Key Does Not Match!",
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Invalid Public Key", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
