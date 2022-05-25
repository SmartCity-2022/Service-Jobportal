let amqp = require('amqplib');
const config = require('../config')

const connection = amqp.connect(config.rabbitmq_url, (error0, connection) => {
  if (error0) throw error0;

  return connection;
});

function getConnection() {
  return connection
}

async function listen(queueName, routingKey, callback) {
  try {
    const connection = await getConnection()
    const channel = await connection.createChannel()

    await channel.assertExchange(config.rabbitmq_exchange, "topic", {durable: true})

    const queue = await channel.assertQueue("jobs", {durable: true, exclusive: true})
    await channel.bindQueue(queue.queue, config.rabbitmq_exchange, routingKey)

    await channel.consume(queue.queue, (message) => {
      console.log("[RabbitMQ] consumed '" + message.content.toString() + "' from '" + message.fields.routingKey + "'")
      callback(message.content.toString())
      channel.ack(message)
    })
  }
  catch(error) {
    console.log(error)
  }
}

async function publish(routingKey, payload) {
  try {
    const connection = await getConnection()
    const channel = await connection.createChannel()
  
    await channel.assertExchange(config.rabbitmq_exchange, "topic", {durable: true})
    
    channel.publish(config.rabbitmq_exchange, routingKey, Buffer.from(payload))
    console.log("[RabbitMQ] published '" + payload + "' at '" + routingKey + "'")
  }
  catch(error) {
    console.log(error)
  }
}

module.exports = {getConnection, listen, publish}