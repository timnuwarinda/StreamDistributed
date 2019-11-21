const { Kafka } = require('kafkajs')
const {notifySubscriber} = require("./AccountService")
 
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['127.0.0.1:9092']
})

const consumer = kafka.consumer({ groupId: 'email-group' });

const run = async ()=>{
await consumer.connect();
await consumer.subscribe({ topic:'email-topic', fromBeginning:false});
await consumer.run({
    eachMessage:({ topic, partition, message }) => {
        let emailObject = JSON.parse(message.value.toString());
        notifySubscriber(emailObject);
        console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}
module.exports= run;