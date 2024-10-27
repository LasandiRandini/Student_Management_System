import amqp from "amqplib";

 let inquiries = []; 
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


// let notifications = []; 

// export const initNotificationListener = async () => {
//   try {
//     const connection = await amqp.connect("amqp://localhost");
//     const channel = await connection.createChannel();

//     const queue = "inquiryQueue";

//     await channel.assertQueue(queue, { durable: false });

//     console.log("Waiting for inquiries...");

//     channel.consume(queue, (msg) => {
//       if (msg !== null) {
//         const inquiry = JSON.parse(msg.content.toString());
//         notifications.push(inquiry);
//         console.log("New inquiry added to notifications:", inquiry);

//         // Acknowledge message
//         channel.ack(msg);
//       }
//     });
//   } catch (error) {
//     console.error("Error setting up notification listener:", error);
//   }
// };

// // Endpoint to retrieve notifications
// export const getNotifications = (req, res) => {
//   res.status(200).json({ notifications });
// };

// Controller to get all inquiries (notifications)
export const getInquiries = (req, res) => {
    try {
      // Return all inquiries stored in memory
      res.status(200).json(inquiries);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  };