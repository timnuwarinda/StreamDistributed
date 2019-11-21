package com.stream.streaming.service;

import com.stream.streaming.model.Streaming;
import org.springframework.stereotype.Service;

import java.util.List;


public interface StreamingService {
    void addStreaming(Streaming streaming);
   // Streaming getStreaming(String title);
    void deleteStreaming(Streaming streaming);
     List<Streaming> getAllStreaming();
}
