document.getElementById("confirmBtn").addEventListener("click", function() {
    let orderCode = prompt("أدخل رقم الطلب:");
    if (orderCode) {
        let phoneNumber = "+964706947015";  // رقم الواتساب
        let message = `مرحبا، أريد تأكيد الطلب برقم: ${orderCode}`;
        let whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappLink;
    }
});