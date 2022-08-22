# qrcontact

[qrcontact.danawoodman.com](https://qrcontact.danawoodman.com)

> Generate a vCard QR code that anyone can scan to add your contact details to their contacts list!

How it works:

1. Enter your contact info (as much or as little as you want)
2. Download the QR code that is automatically created
3. Share the QR code with someone who wants your contact info (print on your business card, make a sticker you put anywhere, tattoo it, whatever you want!)
4. Someone scans this QR code on their phone and then can quickly add you to their contacts list!

Features:

- Add as many contact details as you want!
- Upload a photo to be added (coming soon!)
- Works offline!
- Caches your details in localstorage so even if you leave the page you can come back and edit your info.

## Development

Built with SvelteKit.

```shell
npm install
npm run dev
```

## References

- [vCard](https://en.wikipedia.org/wiki/VCard) - The format for generating vCards
- [node-qrcode](https://github.com/soldair/node-qrcode) - The library used to generate QR codes
- [bitly's vcard creator](https://www.qr-code-generator.com/solutions/vcard-qr-code/) - Way more robust version of this app 😅
