let amqp = require('amqplib');
const config = require('../config')

const connection = amqp.connect(config.rabbitmq_url, (error0, connection) => {
  if (error0) throw error0;

  return connection;
});

function getConnection() {
  return connection
}

async function receive() {

  try {
    const connection = await getConnection()
    const channel = await connection.createChannel()
    const queue = await channel.assertQueue("jobs", {
      durable: true,
      exclusive: true
    })
  
    await channel.bindQueue(
      queue.queue,
      config.rabbitmq_exchange,
      "service.jobportal.job_published"
    )
    
    await channel.consume(queue.queue, (msg) => {
      string = msg.content.toString()
      j = JSON.parse(string)
      console.log(j)
      
      channel.ack(msg)
    })
  }
  catch(error) {
    console.log(error)
  }
}
module.exports = {getConnection, receive}
