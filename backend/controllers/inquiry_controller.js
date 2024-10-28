import amqp from "amqplib";

 
export const submitInquiry = async (req, res) => {
  const { studentId, title, message } = req.body;

  if (!studentId || !title || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
   
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "inquiryQueue";
    const inquiry = { studentId, title, message, timestamp: new Date() };

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(inquiry)));

    console.log("Inquiry sent to queue:", inquiry);
    res.status(200).json({ message: "Inquiry successfully submitted." });

    
    setTimeout(() => connection.close(), 500);
  } catch (error) {
    console.error("Error processing inquiry:", error);
    res.status(500).json({ error: "Failed to process inquiry" });
  }
};

export const getInquiries = async (req, res) => {
  try {
    
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "inquiryQueue";
    await channel.assertQueue(queue, { durable: false });

    const inquiries = [];

    let message;
    while ((message = await channel.get(queue, { noAck: true }))) {
      const inquiry = JSON.parse(message.content.toString());
      inquiries.push(inquiry);
    }

    
    setTimeout(() => connection.close(), 6000);

    
    res.status(200).json({ notifications: inquiries });
  } catch (error) {
    console.error("Error fetching inquiries from RabbitMQ:", error);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
};
