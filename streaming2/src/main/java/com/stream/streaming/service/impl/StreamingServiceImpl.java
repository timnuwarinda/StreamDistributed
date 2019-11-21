package com.stream.streaming.service.impl;

import com.stream.streaming.Repository.StreamRepository;
import com.stream.streaming.model.Streaming;
import com.stream.streaming.service.StreamingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class StreamingServiceImpl implements StreamingService {

    @Autowired
    StreamRepository streamRepository;

    @Override
    public void addStreaming(Streaming streaming) {
        streamRepository.save(streaming);
    }

    /**
    @Override
    public Streaming getStreaming(String title) {
        return (Streaming) streamRepository.findAll();
    }
*/
    @Override
    public List<Streaming> getAllStreaming() {
        return streamRepository.findAll();
    }

    @Override
    public void deleteStreaming(Streaming streaming) {
        streamRepository.delete(streaming);
    }

	@Override
	public Streaming getStreaming(String key) {
		return  streamRepository.findByStreamKey(key);
	}




}
