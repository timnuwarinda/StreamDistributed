package com.stream.streaming.model;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
 
public class Streaming{
    @Id
    private ObjectId id;
    private String broadcasterId;
    private String title;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date time;
    private String streamKey;
	public ObjectId getId() {
		return id;
	}
	public void setId(ObjectId id) {
		this.id = id;
	}
	public String getBroadcasterId() {
		return broadcasterId;
	}
	public void setBroadcasterId(String broadcasterId) {
		this.broadcasterId = broadcasterId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	 
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getStreamKey() {
		return streamKey;
	}
	public void setStreamKey(String streamKey) {
		this.streamKey = streamKey;
	}
    
    
}
