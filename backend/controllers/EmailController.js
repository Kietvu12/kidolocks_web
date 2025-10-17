// Simple fake email sender - no external services, no env vars
// This endpoint only validates and logs the email payload, then returns success

exports.sendEmail = async (req, res) => {
  try {
    const {
      to,
      subject,
      body,
      from,
      businessName,
      deviceCount,
      years,
    } = req.body || {};

    // Basic validation (fixed rules as requested)
    if (!to || !subject || !body) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu trường bắt buộc: to, subject, body',
      });
    }

    // Simulate sending email (fake)
    const simulatedMessageId = `fake-${Date.now()}`;
    // Log to server console for inspection
    console.log('===== FAKE EMAIL SENT =====');
    console.log('To       :', to);
    console.log('Subject  :', subject);
    console.log('From     :', from || 'anonymous');
    console.log('Business :', businessName || 'N/A');
    console.log('Devices  :', deviceCount || 'N/A');
    console.log('Years    :', years || 'N/A');
    console.log('Body     :\n' + body);
    console.log('MessageID:', simulatedMessageId);
    console.log('===========================');

    // Tiny artificial delay for UX
    await new Promise((r) => setTimeout(r, 300));

    return res.status(200).json({
      success: true,
      message: 'Email đã được gửi (giả lập) thành công.',
      messageId: simulatedMessageId,
    });
  } catch (error) {
    console.error('sendEmail error:', error);
    return res.status(500).json({ success: false, message: 'Lỗi gửi email giả lập' });
  }
};


