package com.stream.streaming.service;

import com.stream.streaming.NotificationMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {
    @Autowired
    private KafkaTemplate<String,NotificationMessage> kafkaTemplate;

    public void publishNotificationMessage(NotificationMessage message){
        kafkaTemplate.send("email-topic",message);
    }

}
