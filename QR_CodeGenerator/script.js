function generateCode(){
    const url = document.getElementById('qrInput');
    const qrImage = document.getElementById('qrImage');
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url.value)}`;
    qrImage.src = qrCode;;
}