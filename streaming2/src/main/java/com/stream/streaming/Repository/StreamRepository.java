package com.stream.streaming.Repository;

import com.stream.streaming.model.Streaming;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StreamRepository extends MongoRepository<Streaming,String> {

	Streaming findByStreamKey(String streamKey);
}
